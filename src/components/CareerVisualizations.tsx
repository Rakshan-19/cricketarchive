'use client';

import React, { useState } from 'react';
import { MatchRecord } from '@/lib/data';
import { BarChart3, TrendingUp, PieChart as PieIcon, LineChart as LineIcon } from 'lucide-react';

interface Props {
  matches: MatchRecord[];
}

export default function CareerVisualizations({ matches }: Props) {
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL');

  const filteredMatches = matches.filter(
    (m) => selectedFormat === 'ALL' || m.format === selectedFormat
  );

  // 1. Runs against Opponent
  const runsByOpponent: Record<string, number> = {};
  filteredMatches.forEach((m) => {
    runsByOpponent[m.opponent] = (runsByOpponent[m.opponent] || 0) + m.runs;
    if (m.secondaryInnings) {
      runsByOpponent[m.opponent] += m.secondaryInnings.runs;
    }
  });

  const topOpponents = Object.entries(runsByOpponent)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7);

  const maxOppRuns = topOpponents.length > 0 ? topOpponents[0][1] : 1;

  // 2. Yearly Career Progression
  const runsByYear: Record<string, number> = {};
  filteredMatches.forEach((m) => {
    const year = m.date.slice(0, 4);
    runsByYear[year] = (runsByYear[year] || 0) + m.runs;
    if (m.secondaryInnings) {
      runsByYear[year] += m.secondaryInnings.runs;
    }
  });

  const sortedYears = Object.entries(runsByYear).sort((a, b) => a[0].localeCompare(b[0]));
  const maxYearRuns = Math.max(...Object.values(runsByYear), 1);

  // 3. Innings Score Distribution
  let dnb = 0;
  let ducks = 0;
  let under30 = 0;
  let thirties = 0;
  let fifties = 0;
  let hundreds = 0;

  filteredMatches.forEach((m) => {
    const processScore = (r: number, dnbFlag: boolean, noFlag: boolean) => {
      if (dnbFlag) dnb++;
      else if (r === 0 && !noFlag) ducks++;
      else if (r < 30) under30++;
      else if (r < 50) thirties++;
      else if (r < 100) fifties++;
      else hundreds++;
    };

    processScore(m.runs, !!m.didNotBat, m.notOut);
    if (m.secondaryInnings) {
      processScore(m.secondaryInnings.runs, false, m.secondaryInnings.notOut);
    }
  });

  const totalInningsEvaluated = dnb + ducks + under30 + thirties + fifties + hundreds || 1;

  return (
    <div className="space-y-8">
      {/* Format Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Interactive Career Analytics & Visualizations
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Real-time visual aggregations computed directly from individual match records.
          </p>
        </div>

        <div className="flex gap-2">
          {['ALL', 'Test', 'ODI', 'T20I', 'IPL'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedFormat === fmt
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
              }`}
            >
              {fmt === 'ALL' ? 'All Formats' : fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Year-by-Year Career Run Production */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Annual Run Progression (2004–2021)
            </h4>
            <span className="text-[10px] text-slate-500 uppercase font-mono">Runs per Calendar Year</span>
          </div>

          <div className="space-y-2 pt-2">
            {sortedYears.map(([year, runs]) => {
              const pct = (runs / maxYearRuns) * 100;
              return (
                <div key={year} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">{year}</span>
                    <span className="text-white font-bold">{runs.toLocaleString()} runs</span>
                  </div>
                  <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(4, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Top Opponents Analysis */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              Runs Against Primary Opponents
            </h4>
            <span className="text-[10px] text-slate-500 uppercase font-mono">Top Rivalries</span>
          </div>

          <div className="space-y-3 pt-2">
            {topOpponents.map(([opp, runs]) => {
              const pct = (runs / maxOppRuns) * 100;
              return (
                <div key={opp} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{opp}</span>
                    <span className="text-amber-400 font-mono font-bold">{runs.toLocaleString()} runs</span>
                  </div>
                  <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(4, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 3: Score Distribution Profile */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-teal-400" />
              Innings Score Breakdown Distribution
            </h4>
            <span className="text-[10px] text-slate-500 uppercase font-mono">Conversion Spectrum</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2 text-center">
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-medium">Centuries (100+)</div>
              <div className="text-xl font-extrabold text-amber-400 mt-1">{hundreds}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {((hundreds / totalInningsEvaluated) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-medium">Fifties (50–99)</div>
              <div className="text-xl font-extrabold text-emerald-400 mt-1">{fifties}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {((fifties / totalInningsEvaluated) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-medium">30–49 Runs</div>
              <div className="text-xl font-extrabold text-teal-300 mt-1">{thirties}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {((thirties / totalInningsEvaluated) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-medium">1–29 Runs</div>
              <div className="text-xl font-extrabold text-slate-300 mt-1">{under30}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {((under30 / totalInningsEvaluated) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-medium">Ducks (0 out)</div>
              <div className="text-xl font-extrabold text-red-400 mt-1">{ducks}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {((ducks / totalInningsEvaluated) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-medium">Did Not Bat (DNB)</div>
              <div className="text-xl font-extrabold text-slate-400 mt-1">{dnb}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {((dnb / totalInningsEvaluated) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
