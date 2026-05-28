import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, FileText, MessageCircle, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const profiles = [
  { name: 'Maya', role: 'AI product founder', skills: ['Product', 'GTM', 'Healthcare'], looking: 'Technical co-founder', score: '94%' },
  { name: 'Noah', role: 'Full-stack engineer', skills: ['React', 'Python', 'Fintech'], looking: 'Commercial co-founder', score: '91%' },
  { name: 'Iris', role: 'Growth operator', skills: ['Sales', 'PLG', 'B2B SaaS'], looking: 'CTO', score: '88%' }
];

const features = [
  { icon: Zap, title: 'Swipe-based matching', text: 'Review serious founder cards with skills, location, experience, and co-founder goals.' },
  { icon: FileText, title: 'Secure pitch decks', text: 'Share live pitch deck URLs only with authenticated matched candidates.' },
  { icon: MessageCircle, title: 'Real-time chat', text: 'Move from match to diligence with focused messaging threads.' },
  { icon: BadgeCheck, title: 'Premium verification', text: 'Upgrade for verified profiles, coaching access, and stronger discovery placement.' }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      <Navbar />
      <section className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_460px] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            <Sparkles size={16} /> Built for first-time founder-market fit
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Find your co-founder before momentum dies.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            CoFoundMatch helps tech entrepreneurs swipe through curated founder profiles, match in real time, share pitch decks securely, and start focused conversations.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/sign-up" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-bold text-white shadow-xl shadow-slate-300 hover:bg-slate-800">
              Start matching free <ArrowRight size={18} />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-slate-900 hover:border-slate-400">
              View demo dashboard
            </Link>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-center">
            {['Smart filters', 'Verified profiles', 'Deck sharing'].map((item) => (
              <div key={item} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-bold text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[600px]">
          {profiles.map((profile, index) => (
            <div key={profile.name} className="card-gradient absolute left-2 right-2 rounded-[2rem] border border-white p-6 shadow-card" style={{ top: index * 70, transform: `rotate(${index === 0 ? -5 : index === 1 ? 2 : 8}deg)`, zIndex: profiles.length - index }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-brand">{profile.score} compatibility</p>
                  <h2 className="mt-2 text-3xl font-black text-slate-950">{profile.name}</h2>
                  <p className="text-slate-600">{profile.role}</p>
                </div>
                <ShieldCheck className="text-mint" />
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {profile.skills.map((skill) => <span key={skill} className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-700 shadow-sm">{skill}</span>)}
              </div>
              <div className="mt-8 rounded-3xl bg-slate-950 p-5 text-white">
                <p className="text-sm text-slate-300">Looking for</p>
                <p className="text-xl font-black">{profile.looking}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <Icon className="text-brand" />
              <h3 className="mt-4 text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 ring-1 ring-slate-200">
            <p className="font-black text-slate-500">Basic</p>
            <h3 className="mt-2 text-4xl font-black">Free</h3>
            <p className="mt-4 text-slate-600">Create profile, swipe daily, chat with matches, and download pitch template.</p>
          </div>
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-card">
            <p className="font-black text-blue-300">Premium</p>
            <h3 className="mt-2 text-4xl font-black">$29/mo</h3>
            <p className="mt-4 text-slate-300">Verified badge, coaching access, priority discovery, and unlimited deck sharing.</p>
          </div>
        </div>
      </section>
      <section id="template" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-blue-600 p-8 text-white md:p-12">
          <h2 className="text-3xl font-black">Pitch deck PDF template included.</h2>
          <p className="mt-3 max-w-2xl text-blue-100">Download a founder-ready outline covering problem, insight, market, traction, team, and co-founder ask.</p>
          <Link href="/api/pitch-template" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 font-black text-blue-700">Download template</Link>
        </div>
      </section>
    </main>
  );
}
