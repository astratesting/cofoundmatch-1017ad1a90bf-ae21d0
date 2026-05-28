import { ArrowLeft, ArrowRight, BadgeCheck, FileUp, MessageSquare, Send, Users } from 'lucide-react';

const candidates = [
  { name: 'Ava Chen', title: 'Ex-Stripe backend lead', location: 'SF Bay Area', looking: 'Design + GTM co-founder', skills: ['Fintech', 'Infra', 'Postgres'], match: 96 },
  { name: 'Leo Martins', title: 'B2B growth founder', location: 'Remote / NYC', looking: 'AI engineering co-founder', skills: ['Sales', 'PLG', 'Enterprise'], match: 89 }
];

const matches = ['Maya Patel', 'Noah Reed', 'Iris Kim'];
const messages = [
  { from: 'Maya', text: 'Loved your deck. Can we talk customer discovery tomorrow?' },
  { from: 'You', text: 'Yes. I shared the live URL with traction notes.' }
];

export default function DashboardPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
      <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="font-bold uppercase tracking-wide text-brand">Swipe queue</p>
            <h2 className="text-3xl font-black">Potential co-founders</h2>
          </div>
          <Users className="text-slate-400" />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {candidates.map((candidate) => (
            <article key={candidate.name} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-black text-emerald-600">{candidate.match}% match</p>
                  <h3 className="mt-1 text-2xl font-black">{candidate.name}</h3>
                  <p className="text-slate-600">{candidate.title}</p>
                </div>
                <BadgeCheck className="text-blue-600" />
              </div>
              <p className="mt-4 rounded-2xl bg-white p-4 text-sm font-semibold text-slate-700">{candidate.looking}</p>
              <p className="mt-3 text-sm text-slate-500">{candidate.location}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {candidate.skills.map((skill) => <span key={skill} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{skill}</span>)}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 font-black text-slate-700 hover:border-slate-400"><ArrowLeft size={18} /> Pass</button>
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 font-black text-white hover:bg-blue-700">Like <ArrowRight size={18} /></button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <aside className="grid gap-6">
        <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-black">Profile strength</h2>
          <div className="mt-4 h-3 rounded-full bg-slate-100"><div className="h-3 w-[82%] rounded-full bg-emerald-500" /></div>
          <p className="mt-3 text-sm text-slate-600">Add one more pitch deck proof point to reach verified profile review.</p>
        </section>
        <section className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-card">
          <div className="flex items-center justify-between"><h2 className="text-xl font-black">Secure deck room</h2><FileUp /></div>
          <p className="mt-3 text-sm text-slate-300">Live URL active for 3 matched users. Auth-gated access prevents forwarding.</p>
          <button className="mt-5 w-full rounded-full bg-white px-4 py-3 font-black text-slate-950">Upload or share deck</button>
        </section>
        <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between"><h2 className="text-xl font-black">Matches</h2><MessageSquare className="text-brand" /></div>
          <div className="mt-4 space-y-2">
            {matches.map((match) => <div key={match} className="rounded-2xl bg-slate-50 px-4 py-3 font-bold text-slate-700">{match}</div>)}
          </div>
        </section>
        <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-black">Chat</h2>
          <div className="mt-4 space-y-3">
            {messages.map((message) => <div key={message.text} className="rounded-2xl bg-slate-50 p-3 text-sm"><b>{message.from}:</b> {message.text}</div>)}
          </div>
          <div className="mt-4 flex gap-2"><input className="min-w-0 flex-1 rounded-full border-slate-300" placeholder="Message matched founder" /><button className="rounded-full bg-brand p-3 text-white"><Send size={18} /></button></div>
        </section>
      </aside>
    </main>
  );
}
