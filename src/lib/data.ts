import fs from 'fs';
import path from 'path';

export interface MatchRecord {
  matchNumber: number;
  matchId: string;
  date: string;
  format: 'Test' | 'ODI' | 'T20I' | 'IPL';
  tournament: string;
  opponent: string;
  team: string;
  venue: string;
  country: string;
  battingPosition: number | string;
  inningsNumber: number;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  dismissal: string;
  notOut: boolean;
  didNotBat?: boolean;
  bowlingFigures: string;
  catches: number;
  stumpings: number;
  result: string;
  secondaryInnings?: {
    inningsNumber: number;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
    dismissal: string;
    notOut: boolean;
  };
}

export interface FormatSummary {
  matches: number;
  innings: number;
  runs: number;
  ballsFaced: number;
  notOuts: number;
  highestScore: string;
  highestScoreRaw: number;
  average: number;
  strikeRate: number;
  hundreds: number;
  fifties: number;
  ducks: number;
  fours: number;
  sixes: number;
  bowling: {
    innings: number;
    overs: number;
    runsConceded: number;
    wickets: number;
    bestBowling: string;
    average: number | null;
    economy: number | null;
  };
  fielding: {
    catches: number;
    stumpings: number;
  };
}

export interface PlayerSummary {
  player: {
    id: string;
    name: string;
    fullName: string;
    country: string;
    dateOfBirth: string;
    birthPlace: string;
    role: string;
    battingStyle: string;
    bowlingStyle: string;
    teams: string[];
    careerSpan: string;
  };
  formats: Record<string, FormatSummary>;
  careerTotals: {
    allRecognizedMatches: number;
    totalRuns: number;
    totalHundreds: number;
    totalFifties: number;
    totalCatches: number;
    totalStumpings: number;
  };
}

export interface Milestone {
  id: string;
  title: string;
  match: string;
  date: string;
  venue: string;
  format: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  description: string;
  image: string;
}

export interface BiographyChapter {
  id: string;
  title: string;
  content: string;
  image: string;
  caption: string;
}

export function getPlayerDirectory() {
  const filePath = path.join(process.cwd(), 'src/data/players_directory.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function getPlayerSummary(playerId: string): PlayerSummary {
  const filePath = path.join(process.cwd(), 'src/data/ab_de_villiers_summary.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function getPlayerMatches(playerId: string): MatchRecord[] {
  const filePath = path.join(process.cwd(), 'src/data/ab_de_villiers_matches.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function getPlayerMilestones(playerId: string): Milestone[] {
  const filePath = path.join(process.cwd(), 'src/data/ab_de_villiers_milestones.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function getPlayerBio(playerId: string) {
  const filePath = path.join(process.cwd(), 'src/data/ab_de_villiers_bio.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
