import { getPlayerMatches } from '@/lib/data';
import CareerVisualizations from '@/components/CareerVisualizations';

export const metadata = {
  title: 'Cricket Analytics Hub — The Cricket Archive',
  description: 'Interactive analytics, career trajectories and cross-format distributions.',
};

export default function AnalyticsPage() {
  const matches = getPlayerMatches('ab-de-villiers');

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Interactive Analytics Hub</h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Granular statistical breakdowns computed directly from underlying match databases.
        </p>
      </div>

      <CareerVisualizations matches={matches} />
    </div>
  );
}
