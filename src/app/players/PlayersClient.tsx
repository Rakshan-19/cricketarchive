'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  fullName: string;
  country: string;
  dateOfBirth: string;
  role: string;
  battingStyle: string;
  careerSpan: string;
  totalMatches: number;
  totalRuns: number;
  hundreds: number;
  fifties: number;
  isVerifiedComplete: boolean;
}

export default function PlayersClient({ players }: { players: Player[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('ALL');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredPlayers = players.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = countryFilter === 'ALL' || p.country === countryFilter;
    const matchesRole = roleFilter === 'ALL' || p.role.toLowerCase().includes(roleFilter.toLowerCase());
    return matchesSearch && matchesCountry && matchesRole;
  });

  const countries = ['ALL', 'South Africa', 'India', 'West Indies'];
  const roles = ['ALL', 'Batter', 'Wicketkeeper', 'All-rounder'];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Player Directory & Registry</h1>
        <p className="text-sm text-slate-400 mt-2">
          Discover comprehensive match-by-match archives and player registries across international and franchise cricket.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by player name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            {countries.map((c) => (
              <option key={c} value={c}>Country: {c}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            {roles.map((r) => (
              <option key={r} value={r}>Playing Role: {r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Player Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((p) => (
          <div
            key={p.id}
            className={`rounded-xl border ${
              p.isVerifiedComplete ? 'border-emerald-500/40 bg-slate-900/60' : 'border-slate-800/80 bg-slate-900/30'
            } p-6 flex flex-col justify-between`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider inline-flex items-center gap-1 ${
                      p.isVerifiedComplete
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {p.isVerifiedComplete ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Archive
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        Data Pending
                      </>
                    )}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">{p.name}</h3>
                  <p className="text-xs text-slate-400">{p.fullName}</p>
                </div>
                <span className="text-xs font-mono text-slate-400">{p.careerSpan}</span>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <div>Country: <span className="text-white font-medium">{p.country}</span></div>
                <div>Role: <span className="text-white font-medium">{p.role}</span></div>
                <div>Batting: <span className="text-white font-medium">{p.battingStyle}</span></div>
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

            <div className="pt-6 mt-4 border-t border-slate-800/80">
              <Link
                href={`/players/${p.id}`}
                className={`w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  p.isVerifiedComplete
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {p.isVerifiedComplete ? 'Open Complete Career Archive →' : 'View Profile Details'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
