import { notFound } from 'next/navigation';
import { getPlayerSummary, getPlayerMatches, getPlayerMilestones, getPlayerBio, getPlayerDirectory } from '@/lib/data';
import PlayerClient from './PlayerClient';

export async function generateStaticParams() {
  const players = getPlayerDirectory();
  return players.map((p: any) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id === 'ab-de-villiers') {
    return {
      title: 'AB de Villiers — Complete Match-by-Match Career Archive | The Cricket Archive',
      description: 'Explore the complete career of Abraham Benjamin de Villiers across 604 matches, 20,014 runs, 47 hundreds, and precision statistics.',
    };
  }
  const players = getPlayerDirectory();
  const player = players.find((p: any) => p.id === id);
  return {
    title: `${player ? player.name : 'Player'} — The Cricket Archive`,
    description: `Career statistics and archival record for ${player ? player.name : 'player'}.`,
  };
}

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id !== 'ab-de-villiers') {
    // Registered player placeholder
    const players = getPlayerDirectory();
    const player = players.find((p: any) => p.id === id);
    if (!player) notFound();

    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          🏏
        </div>
        <h1 className="text-3xl font-bold text-white">{player.name}</h1>
        <p className="text-sm text-slate-400">{player.fullName} • {player.country} • {player.role}</p>
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 text-sm text-slate-300 max-w-lg mx-auto">
          <p className="font-semibold text-emerald-400 mb-2">Profile Registered</p>
          <p className="text-xs text-slate-400">
            Historical match scorecards and ball-by-ball datasets for {player.name} are currently undergoing chronological verification and ingestion according to our data standards.
          </p>
        </div>
      </div>
    );
  }

  const summary = getPlayerSummary(id);
  const matches = getPlayerMatches(id);
  const milestones = getPlayerMilestones(id);
  const bio = getPlayerBio(id);

  return (
    <PlayerClient
      summary={summary}
      matches={matches}
      milestones={milestones}
      bio={bio}
    />
  );
}
