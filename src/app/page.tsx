import Link from 'next/link';
import { getPlayerDirectory } from '@/lib/data';
import { Search, Award, TrendingUp, Sparkles, Database, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const players = getPlayerDirectory();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE DEFINITIVE HISTORICAL CRICKET ARCHIVE</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Every Career Has a Story. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300">
                Explore Every Ball of It.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Discover the complete journey of cricket&apos;s greatest players through match-by-match statistics, interactive analytics and stories that define their legacy.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/players/ab-de-villiers"
                className="px-6 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Launch AB de Villiers Career Archive</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/players"
                className="px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all"
              >
                Browse Player Directory
              </Link>
              <Link
                href="/about"
                className="px-6 py-3.5 rounded-lg bg-slate-900/40 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/80 font-medium text-sm transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Audit & Data Integrity</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Career Flagship Spotlight: AB de Villiers */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="relative rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between relative z-10">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Complete Career Archive Active
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                AB de Villiers — The 360° Legend
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                604 recognized matches, 20,014 international and IPL runs, 47 hundreds, and the world record for the fastest ODI century in 31 balls. Explore every single match record from his 2004 debut to his 2021 retirement.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3">
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Test Matches</div>
                  <div className="text-xl font-bold text-white">114 <span className="text-xs font-normal text-emerald-400">(50.66 avg)</span></div>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">ODI Matches</div>
                  <div className="text-xl font-bold text-white">228 <span className="text-xs font-normal text-emerald-400">(53.50 avg)</span></div>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">T20I Matches</div>
                  <div className="text-xl font-bold text-white">78 <span className="text-xs font-normal text-emerald-400">(135.16 SR)</span></div>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">IPL Matches</div>
                  <div className="text-xl font-bold text-white">184 <span className="text-xs font-normal text-emerald-400">(151.46 SR)</span></div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/players/ab-de-villiers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all"
                >
                  <span>Open Full Career Profile & Archive</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative w-full max-w-sm aspect-[4/5] rounded-xl overflow-hidden border border-slate-700/60 shadow-xl bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop"
                alt="AB de Villiers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">South Africa & RCB</div>
                <div className="text-lg font-bold">Abraham Benjamin de Villiers</div>
                <div className="text-xs text-slate-300">Batter / Wicketkeeper • Right-hand bat</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Players Registry */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Featured Cricketing Legends</h2>
            <p className="text-sm text-slate-400 mt-1">Explore iconic careers in the Cricket Archive registry.</p>
          </div>
          <Link href="/players" className="text-sm font-semibold text-emerald-400 hover:underline flex items-center gap-1">
            View all registered players →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((p: any) => (
            <div
              key={p.id}
              className={`rounded-xl border ${p.isVerifiedComplete ? 'border-emerald-500/40 bg-slate-900/60' : 'border-slate-800/80 bg-slate-900/30'} p-5 flex flex-col justify-between hover:border-slate-700 transition-all group`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${p.isVerifiedComplete ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {p.isVerifiedComplete ? 'Verified Archive Active' : 'Data Ingestion Pending'}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2 group-hover:text-emerald-400 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-400">{p.country} • {p.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400">{p.careerSpan}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="bg-slate-950/60 p-2 rounded border border-slate-800/60">
                    <div className="text-[10px] text-slate-400 uppercase">Matches</div>
                    <div className="text-sm font-bold text-white">{p.totalMatches}</div>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded border border-slate-800/60">
                    <div className="text-[10px] text-slate-400 uppercase">Runs</div>
                    <div className="text-sm font-bold text-emerald-400">{p.totalRuns.toLocaleString()}</div>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded border border-slate-800/60">
                    <div className="text-[10px] text-slate-400 uppercase">100s / 50s</div>
                    <div className="text-sm font-bold text-white">{p.hundreds}/{p.fifties}</div>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-800/80">
                {p.isVerifiedComplete ? (
                  <Link
                    href={`/players/${p.id}`}
                    className="w-full py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Open Career Archive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    href={`/players/${p.id}`}
                    className="w-full py-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Profile Placeholder</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architectural Pillars */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 border-t border-slate-800/80 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Built on Strict Data Standards</h2>
          <p className="text-sm text-slate-400">
            A production cricket intelligence architecture designed to preserve historical truth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Chronological Match Archives</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every match is documented in chronological sequence, distinguishing zero runs from did-not-bat and preserving multi-innings Test structures.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Isolated Format Recalculation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never mixing formats. Career averages, strike rates, bowling figures, and fielding statistics are calculated directly from raw match records.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Ask The Cricket Archive (AI)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ask natural language career questions answered by grounded statistical queries rather than hallucinated LLM figures.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
