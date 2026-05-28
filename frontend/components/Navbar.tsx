import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-black tracking-tight text-slate-950">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-blue-200">
            <Sparkles size={18} />
          </span>
          CoFoundMatch
        </Link>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link href="/#pricing" className="hidden text-slate-600 hover:text-slate-950 sm:inline">Pricing</Link>
          <Link href="/#template" className="hidden text-slate-600 hover:text-slate-950 sm:inline">Deck template</Link>
          <SignedOut>
            <Link href="/sign-in" className="text-slate-600 hover:text-slate-950">Log in</Link>
            <Link href="/sign-up" className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-slate-800">Join free</Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="rounded-full bg-brand px-4 py-2 text-white hover:bg-blue-700">Dashboard</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
