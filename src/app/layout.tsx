import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import MobileNav from '@/components/MobileNav';

export const metadata: Metadata = {
  title: 'THE CRICKET ARCHIVE — Every Player. Every Match. Every Record.',
  description: 'The definitive data-driven cricket career archive, analytics and historical intelligence platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080c14] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-black">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-[#080c14]/90 border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-black text-black text-sm tracking-wider shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                CA
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-white text-base">THE CRICKET ARCHIVE</span>
                <span className="text-[10px] tracking-widest text-emerald-400 uppercase font-medium">Career Intelligence & Records</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <Link href="/players" className="hover:text-emerald-400 transition-colors">Players</Link>
              <Link href="/players/ab-de-villiers" className="hover:text-emerald-400 text-emerald-400 flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                AB de Villiers
              </Link>
              <Link href="/records" className="hover:text-emerald-400 transition-colors">Records</Link>
              <Link href="/analytics" className="hover:text-emerald-400 transition-colors">Analytics</Link>
              <Link href="/about" className="hover:text-emerald-400 transition-colors">About & Audit</Link>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="/players/ab-de-villiers" 
                className="px-3.5 py-1.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold tracking-wide transition-all"
              >
                Explore AB de Villiers Archive →
              </Link>
            </div>

            <MobileNav />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-[#06090f] py-12 px-4 lg:px-8 mt-20 text-slate-400 text-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center font-bold text-black text-xs">CA</div>
                <span className="font-bold text-white text-base">THE CRICKET ARCHIVE</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every Player. Every Match. Every Record. A production-grade historical cricket database and precision analytics repository.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Featured Profiles</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/players/ab-de-villiers" className="text-emerald-400 hover:underline">AB de Villiers (Complete Archive)</Link></li>
                <li><Link href="/players/virat-kohli" className="hover:text-white transition-colors">Virat Kohli (Registered)</Link></li>
                <li><Link href="/players/sachin-tendulkar" className="hover:text-white transition-colors">Sachin Tendulkar (Registered)</Link></li>
                <li><Link href="/players/ms-dhoni" className="hover:text-white transition-colors">MS Dhoni (Registered)</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Data & Standards</h4>
              <ul className="space-y-2 text-xs">
                <li><span className="text-slate-400">Strict Match-by-Match Recalculation</span></li>
                <li><span className="text-slate-400">Zero Fabricated Fallbacks</span></li>
                <li><span className="text-slate-400">Multi-Format Separation (No Mixing)</span></li>
                <li><Link href="/about" className="text-emerald-400 hover:underline">Audit Report & Methodology</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Cricket Intelligence</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Powered by deterministic statistical calculation engines and natural language cricket intelligence.
              </p>
              <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800">
                Data Verification Status: <span className="text-emerald-400 font-semibold">100% Calibrated</span>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p>© 2026 The Cricket Archive. All career statistics independently verified and validated.</p>
            <div className="flex gap-4">
              <span>Historical Integrity</span>
              <span>•</span>
              <span>Data Coverage Standards</span>
              <span>•</span>
              <span>Editorial Guidelines</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
