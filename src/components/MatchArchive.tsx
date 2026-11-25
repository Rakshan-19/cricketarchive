'use client';

import React, { useState } from 'react';
import { MatchRecord } from '@/lib/data';
import { Search, Filter, Calendar, Award, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

interface Props {
  matches: MatchRecord[];
}

export default function MatchArchive({ matches }: Props) {
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL');
  const [selectedOpponent, setSelectedOpponent] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'runs-desc' | 'sr-desc'>('date-asc');
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;

  // Unique opponents list
  const opponents = Array.from(new Set(matches.map((m) => m.opponent))).sort();

  // Filter matches
  const filtered = matches.filter((m) => {
    const matchesFormat = selectedFormat === 'ALL' || m.format === selectedFormat;
    const matchesOpp = selectedOpponent === 'ALL' || m.opponent === selectedOpponent;
    const matchesSearch =
      m.tournament.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.opponent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.matchId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFormat && matchesOpp && matchesSearch;
  });

  // Sort matches
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date-asc') return a.matchNumber - b.matchNumber;
    if (sortBy === 'date-desc') return b.matchNumber - a.matchNumber;
    if (sortBy === 'runs-desc') return b.runs - a.runs;
    if (sortBy === 'sr-desc') return b.strikeRate - a.strikeRate;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginatedMatches = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Chronological Match-by-Match Career Archive
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {sorted.length} of {matches.length} matches
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Every professional match recorded with individual innings statistics, balls faced, dismissal analysis and venue details.
          </p>
        </div>
      </div>

      {/* Control Bar: Filters, Sorting, Search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search venue, tournament, ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <select
            value={selectedFormat}
            onChange={(e) => {
              setSelectedFormat(e.target.value);
              setPage(1);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">Format: All Formats</option>
            <option value="Test">Test Matches (114)</option>
            <option value="ODI">One Day Internationals (228)</option>
            <option value="T20I">T20 Internationals (78)</option>
            <option value="IPL">Indian Premier League (184)</option>
          </select>
        </div>

        <div>
          <select
            value={selectedOpponent}
            onChange={(e) => {
              setSelectedOpponent(e.target.value);
              setPage(1);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">Opponent: All Opponents</option>
            {opponents.map((opp) => (
              <option key={opp} value={opp}>{opp}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="date-asc">Chronological (Debut → Final)</option>
            <option value="date-desc">Chronological (Final → Debut)</option>
            <option value="runs-desc">Highest Runs First</option>
            <option value="sr-desc">Highest Strike Rate First</option>
          </select>
        </div>
      </div>

      {/* Match Cards List */}
      <div className="space-y-3">
        {paginatedMatches.map((m) => (
          <div
            key={m.matchId}
            className="rounded-xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/70 p-4 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/60 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  MATCH #{String(m.matchNumber).padStart(3, '0')}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  m.format === 'Test' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  m.format === 'ODI' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  m.format === 'T20I' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {m.format}
                </span>
                <span className="text-sm font-bold text-white">
                  {m.team} vs {m.opponent}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {m.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {m.venue}
                </span>
              </div>
            </div>

            {/* Innings Performance Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 py-3 items-center">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Runs</div>
                <div className="text-lg font-extrabold text-white flex items-center gap-1">
                  {m.didNotBat ? (
                    <span className="text-slate-500 text-sm font-normal">DNB</span>
                  ) : (
                    <>
                      <span className={m.runs >= 100 ? 'text-amber-400' : m.runs >= 50 ? 'text-emerald-400' : 'text-white'}>
                        {m.runs}{m.notOut ? '*' : ''}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Balls Faced</div>
                <div className="text-sm font-bold text-slate-300">
                  {m.didNotBat ? '-' : m.balls}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Strike Rate</div>
                <div className="text-sm font-bold text-slate-300">
                  {m.didNotBat ? '-' : m.strikeRate.toFixed(2)}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Boundaries (4s / 6s)</div>
                <div className="text-sm font-bold text-slate-300">
                  {m.didNotBat ? '-' : `${m.fours} / ${m.sixes}`}
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Dismissal</div>
                <div className="text-xs text-slate-300 font-mono truncate">
                  {m.dismissal}
                </div>
              </div>
            </div>

            {/* If Test Match has Secondary Innings */}
            {m.secondaryInnings && (
              <div className="mt-2 pt-2 border-t border-slate-800/40 bg-slate-950/40 p-2.5 rounded-lg grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">2nd Innings: </span>
                  <span className="font-bold text-white">{m.secondaryInnings.runs}{m.secondaryInnings.notOut ? '*' : ''}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Balls: </span>
                  <span className="font-semibold text-slate-300">{m.secondaryInnings.balls}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">SR: </span>
                  <span className="font-semibold text-slate-300">{m.secondaryInnings.strikeRate}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Dismissal: </span>
                  <span className="font-mono text-slate-300">{m.secondaryInnings.dismissal}</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/40">
              <div>Tournament: <span className="text-slate-300">{m.tournament}</span></div>
              <div className="flex items-center gap-3">
                {m.bowlingFigures !== '-' && <span>Bowling: <span className="text-emerald-400">{m.bowlingFigures}</span></span>}
                {m.catches > 0 && <span>Catches: <span className="text-slate-200">{m.catches}</span></span>}
                {m.stumpings > 0 && <span>Stumpings: <span className="text-slate-200">{m.stumpings}</span></span>}
                <span className="font-semibold text-emerald-400">{m.result}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs">
          <div className="text-slate-400">
            Showing Page <span className="text-white font-bold">{page}</span> of <span className="text-white font-bold">{totalPages}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-200 border border-slate-800"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-200 border border-slate-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
