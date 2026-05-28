import Navbar from '@/components/Navbar';
import { currentUser } from '@clerk/nextjs/server';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-bold text-brand">Founder workspace</p>
            <h1 className="text-2xl font-black text-slate-950">{user?.firstName ? `${user.firstName}'s matches` : 'Your matches'}</h1>
          </div>
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">Premium trial active</div>
        </div>
      </div>
      {children}
    </div>
  );
}
