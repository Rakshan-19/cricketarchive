'use client';

import React, { useState } from 'react';
import { PlayerSummary, MatchRecord, Milestone } from '@/lib/data';
import MatchArchive from '@/components/MatchArchive';
import CareerVisualizations from '@/components/CareerVisualizations';
import AskCricketArchive from '@/components/AskCricketArchive';
import { 
  Award, Calendar, MapPin, ShieldCheck, CheckCircle2, 
  Flame, BookOpen, BarChart3, Database, MessageSquare, ExternalLink
} from 'lucide-react';

interface Props {
  summary: PlayerSummary;
  matches: MatchRecord[];
  milestones: Milestone[];
  bio: any;
}

export default function PlayerClient({ summary, matches, milestones, bio }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'matches' | 'analytics' | 'bio' | 'ask'>('overview');
  const [selectedFormat, setSelectedFormat] = useState<'Test' | 'ODI' | 'T20I' | 'IPL'>('Test');

  const p = summary.player;
  const currentFormatStats = summary.formats[selectedFormat];

  return (
    <div className="space-y-12 pb-20">
      {/* Player Header / Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-[#080c14] border-b border-slate-800/80 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-slate-900 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop"
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-emerald-500 text-black text-[9px] font-black uppercase">
                  Verified
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                    {p.country}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Career: {p.careerSpan}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  {p.name}
                </h1>
                <p className="text-sm text-slate-300 font-medium">
                  {p.fullName}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>Role: <strong className="text-white">{p.role}</strong></span>
                  <span>•</span>
                  <span>Batting: <strong className="text-white">{p.battingStyle}</strong></span>
                  <span>•</span>
                  <span>Born: <strong className="text-white">{p.dateOfBirth}</strong></span>
                </div>
              </div>
            </div>

            {/* Career Grand Totals Badge */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl grid grid-cols-3 gap-4 text-center shrink-0 w-full lg:w-auto">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-medium">All Matches</div>
                <div className="text-2xl font-black text-white">{summary.careerTotals.allRecognizedMatches}</div>
              </div>
              <div className="border-x border-slate-800 px-4">
                <div className="text-[10px] text-slate-400 uppercase font-medium">Total Runs</div>
                <div className="text-2xl font-black text-emerald-400">{summary.careerTotals.totalRuns.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-medium">100s / 50s</div>
                <div className="text-2xl font-black text-white">{summary.careerTotals.totalHundreds} / {summary.careerTotals.totalFifties}</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto gap-2 border-t border-slate-800/80 mt-10 pt-4 scrollbar-none">
            {[
              { id: 'overview', label: 'Career Overview', icon: Award },
              { id: 'stats', label: 'Format Statistics', icon: Database },
              { id: 'matches', label: 'Match-by-Match Archive', icon: Calendar },
              { id: 'analytics', label: 'Interactive Analytics', icon: BarChart3 },
              { id: 'bio', label: 'Biography & Legacy', icon: BookOpen },
              { id: 'ask', label: 'Ask The Archive (AI)', icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/40 hover:bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Format Summary Cards */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>Format-by-Format Performance Matrix</span>
                <span className="text-xs font-normal text-emerald-400">Strictly unmixed calculations</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(['Test', 'ODI', 'T20I', 'IPL'] as const).map((fmt) => {
                  const data = summary.formats[fmt];
                  return (
                    <div
                      key={fmt}
                      className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-4 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-white uppercase tracking-wider">{fmt}</span>
                        <span className="text-xs font-mono text-emerald-400 font-bold">{data.matches} Matches</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400">Runs:</span>
                          <div className="text-lg font-black text-white">{data.runs.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-slate-400">Average:</span>
                          <div className="text-lg font-black text-emerald-400">{data.average.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-slate-400">Strike Rate:</span>
                          <div className="font-bold text-slate-200">{data.strikeRate.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-slate-400">Highest Score:</span>
                          <div className="font-bold text-amber-400">{data.highestScore}</div>
                        </div>
                        <div>
                          <span className="text-slate-400">100s / 50s:</span>
                          <div className="font-bold text-slate-200">{data.hundreds} / {data.fifties}</div>
                        </div>
                        <div>
                          <span className="text-slate-400">Catches:</span>
                          <div className="font-bold text-slate-200">{data.fielding.catches}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Iconic Career Milestones Showcase */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Memorable Career Moments & World Records</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {milestones.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all"
                  >
                    <div className="relative aspect-video w-full bg-slate-950">
                      <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-emerald-500/90 text-black text-[10px] font-black uppercase">
                        {m.format}
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
          </div>
        )}

        {/* TAB 2: DETAILED FORMAT STATISTICS */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div className="flex gap-2 border-b border-slate-800 pb-4">
              {(['Test', 'ODI', 'T20I', 'IPL'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${
                    selectedFormat === fmt
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {fmt} Cricket
                </button>
              ))}
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {selectedFormat} Cricket Complete Statistical Ledger
              </h3>

              {/* Batting Metrics Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Matches</div>
                  <div className="text-xl font-bold text-white mt-1">{currentFormatStats.matches}</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Innings</div>
                  <div className="text-xl font-bold text-white mt-1">{currentFormatStats.innings}</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Runs</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">{currentFormatStats.runs.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Balls Faced</div>
                  <div className="text-xl font-bold text-white mt-1">{currentFormatStats.ballsFaced.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Batting Average</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">{currentFormatStats.average.toFixed(2)}</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Strike Rate</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">{currentFormatStats.strikeRate.toFixed(2)}</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Highest Score</div>
                  <div className="text-xl font-bold text-amber-400 mt-1">{currentFormatStats.highestScore}</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Centuries (100)</div>
                  <div className="text-xl font-bold text-white mt-1">{currentFormatStats.hundreds}</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Fifties (50)</div>
                  <div className="text-xl font-bold text-white mt-1">{currentFormatStats.fifties}</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Fours</div>
                  <div className="text-xl font-bold text-white mt-1">{currentFormatStats.fours}</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Sixes</div>
                  <div className="text-xl font-bold text-white mt-1">{currentFormatStats.sixes}</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Catches / Stumpings</div>
                  <div className="text-xl font-bold text-white mt-1">{currentFormatStats.fielding.catches} / {currentFormatStats.fielding.stumpings}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMPLETE MATCH ARCHIVE */}
        {activeTab === 'matches' && (
          <MatchArchive matches={matches} />
        )}

        {/* TAB 4: INTERACTIVE ANALYTICS */}
        {activeTab === 'analytics' && (
          <CareerVisualizations matches={matches} />
        )}

        {/* TAB 5: BIOGRAPHY & LEGACY */}
        {activeTab === 'bio' && (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">{bio.title}</h2>
              <p className="text-base text-slate-300 leading-relaxed font-serif italic border-l-2 border-emerald-500 pl-4 py-1">
                {bio.lead}
              </p>
            </div>

            <div className="space-y-12">
              {bio.chapters.map((ch: any) => (
                <div key={ch.id} className="space-y-4 border-b border-slate-800 pb-10">
                  <h3 className="text-xl font-bold text-white tracking-tight">{ch.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">{ch.content}</p>

                  {ch.image && (
                    <div className="rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 my-4">
                      <div className="aspect-[16/9] w-full">
                        <img src={ch.image} alt={ch.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3 bg-slate-950/80 text-xs text-slate-400 italic">
                        {ch.caption}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: ASK THE CRICKET ARCHIVE (AI) */}
        {activeTab === 'ask' && (
          <AskCricketArchive playerId={p.id} playerName={p.name} />
        )}
      </div>
    </div>
  );
}
