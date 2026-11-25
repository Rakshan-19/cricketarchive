import { getPlayerDirectory } from '@/lib/data';
import PlayersClient from './PlayersClient';

export const metadata = {
  title: 'Players Directory — The Cricket Archive',
  description: 'Search and explore player profiles, careers and match archives.',
};

export default function PlayersPage() {
  const players = getPlayerDirectory();
  return <PlayersClient players={players} />;
}
