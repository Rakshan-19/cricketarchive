import Link from 'next/link';
import { Award, Zap, Trophy, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import { getPlayerMilestones } from '@/lib/data';

export const metadata = {
  title: 'Historical Records & Milestones — The Cricket Archive',
  description: 'World records, fastest centuries, and all-time batting milestones.',
};

export default function RecordsPage() {
  const milestones = getPlayerMilestones('ab-de-villiers');

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>ALL-TIME CRICKETING BENCHMARKS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">World Records & Iconic Feats</h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Verified historical batting records that rewritten cricket history.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {milestones.map((m) => (
          <div
            key={m.id}
            className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div className="relative aspect-video w-full bg-slate-950">
              <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-amber-500 text-black text-[10px] font-black uppercase">
                {m.format} Record
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-white text-base leading-snug">{m.title}</h3>
                <p className="text-xs text-slate-400 font-mono">{m.match} • {m.date}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{m.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 grid grid-cols-4 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Runs</span>
                  <span className="font-bold text-white">{m.runs}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Balls</span>
                  <span className="font-bold text-white">{m.balls}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">4s / 6s</span>
                  <span className="font-bold text-white">{m.fours}/{m.sixes}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">SR</span>
                  <span className="font-bold text-emerald-400">{m.strikeRate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
