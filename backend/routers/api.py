from secrets import token_urlsafe
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import and_, or_
from sqlalchemy.orm import Session

from database import get_db
from models import Match, Message, PitchDeck, Subscription, User
from routers.auth import get_current_user

router = APIRouter(prefix="/api", tags=["api"])


class ProfileUpdate(BaseModel):
    name: str = Field(min_length=2)
    headline: str
    skills: list[str]
    interests: list[str]
    experience: str
    location: str
    looking_for: str


class SwipeRequest(BaseModel):
    target_user_id: int
    liked: bool


class PitchDeckCreate(BaseModel):
    title: str
    live_url: str


class SubscriptionUpdate(BaseModel):
    tier: str = Field(pattern="^(free|premium)$")


class MessageCreate(BaseModel):
    body: str = Field(min_length=1, max_length=2000)


def user_payload(user: User):
    return {
        "id": user.id,
        "name": user.name,
        "headline": user.headline,
        "skills": [s for s in user.skills.split(",") if s],
        "interests": [i for i in user.interests.split(",") if i],
        "experience": user.experience,
        "location": user.location,
        "looking_for": user.looking_for,
        "verified": user.verified,
    }


@router.get("/profiles")
def list_profiles(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    users = db.query(User).filter(User.id != current_user.id).limit(25).all()
    return [user_payload(user) | {"compatibility": 80 + (user.id % 17)} for user in users]


@router.put("/profile")
def update_profile(payload: ProfileUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    current_user.name = payload.name
    current_user.headline = payload.headline
    current_user.skills = ",".join(payload.skills)
    current_user.interests = ",".join(payload.interests)
    current_user.experience = payload.experience
    current_user.location = payload.location
    current_user.looking_for = payload.looking_for
    db.commit()
    db.refresh(current_user)
    return user_payload(current_user)


@router.post("/swipes")
def swipe(payload: SwipeRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    target = db.get(User, payload.target_user_id)
    if not target or target.id == current_user.id:
        raise HTTPException(status_code=404, detail="Candidate not found")
    status = "liked" if payload.liked else "passed"
    existing = db.query(Match).filter(and_(Match.user_id == current_user.id, Match.target_user_id == target.id)).first()
    if existing:
        existing.status = status
        match = existing
    else:
        match = Match(user_id=current_user.id, target_user_id=target.id, status=status, score=88)
        db.add(match)
    reverse_like = db.query(Match).filter(and_(Match.user_id == target.id, Match.target_user_id == current_user.id, Match.status == "liked")).first()
    if payload.liked and reverse_like:
        match.status = "matched"
        reverse_like.status = "matched"
    db.commit()
    db.refresh(match)
    return {"id": match.id, "status": match.status, "score": match.score}


@router.get("/matches")
def list_matches(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    matches = db.query(Match).filter(or_(Match.user_id == current_user.id, Match.target_user_id == current_user.id), Match.status == "matched").all()
    results = []
    for match in matches:
        other_id = match.target_user_id if match.user_id == current_user.id else match.user_id
        other = db.get(User, other_id)
        if other:
            results.append({"match_id": match.id, "score": match.score, "user": user_payload(other)})
    return results


@router.post("/pitch-decks")
def create_pitch_deck(payload: PitchDeckCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    deck = PitchDeck(owner_id=current_user.id, title=payload.title, live_url=payload.live_url, access_token=token_urlsafe(24))
    db.add(deck)
    db.commit()
    db.refresh(deck)
    return {"id": deck.id, "title": deck.title, "share_url": f"/decks/{deck.access_token}", "is_active": deck.is_active}


@router.get("/pitch-decks")
def list_pitch_decks(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    decks = db.query(PitchDeck).filter(PitchDeck.owner_id == current_user.id).all()
    return [{"id": deck.id, "title": deck.title, "live_url": deck.live_url, "share_url": f"/decks/{deck.access_token}", "is_active": deck.is_active} for deck in decks]


@router.get("/pitch-decks/share/{access_token}")
def view_shared_deck(access_token: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    deck = db.query(PitchDeck).filter(PitchDeck.access_token == access_token, PitchDeck.is_active == True).first()
    if not deck:
        raise HTTPException(status_code=404, detail="Pitch deck not found")
    matched = db.query(Match).filter(or_(and_(Match.user_id == current_user.id, Match.target_user_id == deck.owner_id), and_(Match.user_id == deck.owner_id, Match.target_user_id == current_user.id)), Match.status == "matched").first()
    if not matched and deck.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Deck access requires an authenticated match")
    return {"title": deck.title, "live_url": deck.live_url}


@router.get("/pitch-template")
def pitch_template():
    return {
        "filename": "cofoundmatch-pitch-template.pdf",
        "sections": ["Problem", "Customer insight", "Market", "Solution", "Traction", "Team", "Co-founder ask"],
        "download_url": "/static/cofoundmatch-pitch-template.pdf"
    }


@router.put("/subscription")
def update_subscription(payload: SubscriptionUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    subscription = db.query(Subscription).filter(Subscription.user_id == current_user.id).first()
    if not subscription:
        subscription = Subscription(user_id=current_user.id)
        db.add(subscription)
    subscription.tier = payload.tier
    subscription.coaching_access = payload.tier == "premium"
    subscription.verified_profile = payload.tier == "premium"
    current_user.verified = payload.tier == "premium"
    db.commit()
    return {"tier": subscription.tier, "coaching_access": subscription.coaching_access, "verified_profile": subscription.verified_profile}


@router.get("/matches/{match_id}/messages")
def list_messages(match_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    match = db.get(Match, match_id)
    if not match or current_user.id not in {match.user_id, match.target_user_id}:
        raise HTTPException(status_code=404, detail="Match not found")
    messages = db.query(Message).filter(Message.match_id == match_id).order_by(Message.created_at.asc()).all()
    return [{"id": message.id, "sender_id": message.sender_id, "body": message.body, "created_at": message.created_at.isoformat()} for message in messages]


@router.post("/matches/{match_id}/messages")
def send_message(match_id: int, payload: MessageCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    match = db.get(Match, match_id)
    if not match or match.status != "matched" or current_user.id not in {match.user_id, match.target_user_id}:
        raise HTTPException(status_code=404, detail="Match not found")
    message = Message(match_id=match_id, sender_id=current_user.id, body=payload.body)
    db.add(message)
    db.commit()
    db.refresh(message)
    return {"id": message.id, "sender_id": message.sender_id, "body": message.body, "created_at": message.created_at.isoformat()}
