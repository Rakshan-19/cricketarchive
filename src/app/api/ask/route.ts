import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { playerId, question } = await request.json();
    const q = (question || '').toLowerCase();

    const summaryPath = path.join(process.cwd(), 'src/data/ab_de_villiers_summary.json');
    const matchesPath = path.join(process.cwd(), 'src/data/ab_de_villiers_matches.json');
    const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
    const matches = JSON.parse(fs.readFileSync(matchesPath, 'utf8'));

    let answer = '';
    let stats: any = null;

    if (q.includes('fastest') || q.includes('31') || q.includes('149')) {
      answer = `AB de Villiers holds the world record for the fastest century in ODI history, achieved in just 31 balls against the West Indies on 18 January 2015 at the New Wanderers Stadium, Johannesburg.\n\nIn that historic innings, he scored 149 runs off 44 balls with 9 fours and 16 sixes at a blistering strike rate of 338.63. He also broke the world record for the fastest fifty (16 balls) in the same match.`;
      stats = {
        Runs: 149,
        Balls: 44,
        Fours: 9,
        Sixes: 16,
        "Strike Rate": "338.63",
        Opponent: "West Indies",
        Date: "18 Jan 2015"
      };
    } else if (q.includes('test') && (q.includes('highest') || q.includes('278') || q.includes('score'))) {
      const test = summary.formats.Test;
      answer = `AB de Villiers' highest score in Test cricket is 278 not out against Pakistan at the Sheikh Zayed Stadium in Abu Dhabi in November 2010.\n\nHe batted for 627 minutes (over ten hours), facing 418 balls with 23 fours and 6 sixes, setting what was then South Africa's highest individual Test score.`;
      stats = {
        "Highest Score": "278*",
        Format: "Test",
        Opponent: "Pakistan",
        Venue: "Abu Dhabi",
        Average: test.average,
        Centuries: test.hundreds
      };
    } else if (q.includes('odi') && (q.includes('highest') || q.includes('176') || q.includes('score'))) {
      const odi = summary.formats.ODI;
      answer = `AB de Villiers' highest score in ODI cricket is 176 off 104 balls against Bangladesh at Boland Park, Paarl on 18 October 2017.\n\nHis overall ODI career record comprises 9,577 runs in 228 matches at an average of 53.50 and strike rate of 101.09 with 25 centuries and 53 fifties.`;
      stats = {
        "Highest Score": "176",
        Average: odi.average,
        "Strike Rate": odi.strikeRate,
        Runs: odi.runs,
        Centuries: odi.hundreds,
        Fifties: odi.fifties
      };
    } else if (q.includes('test')) {
      const test = summary.formats.Test;
      answer = `In Test cricket, AB de Villiers played 114 matches across an illustrious 14-year career (2004–2018). He scored 8,765 runs in 191 innings at an average of 50.66 with 22 centuries and 46 fifties. He took 222 catches and affected 5 stumpings.`;
      stats = {
        Matches: test.matches,
        Innings: test.innings,
        Runs: test.runs,
        Average: test.average,
        Centuries: test.hundreds,
        Fifties: test.fifties
      };
    } else if (q.includes('ipl')) {
      const ipl = summary.formats.IPL;
      answer = `In the Indian Premier League (IPL), AB de Villiers scored 5,162 runs in 184 matches (170 innings) for Delhi Daredevils and Royal Challengers Bangalore at an average of 39.70 and an explosive strike rate of 151.46. He struck 3 centuries, 40 fifties, and smashed 251 sixes.`;
      stats = {
        Matches: ipl.matches,
        Runs: ipl.runs,
        Average: ipl.average,
        "Strike Rate": ipl.strikeRate,
        Centuries: ipl.hundreds,
        Sixes: ipl.sixes
      };
    } else if (q.includes('average') || q.includes('career') || q.includes('overall')) {
      answer = `Across all 604 recognized career matches (Tests, ODIs, T20Is, IPL & franchise cricket), AB de Villiers scored over 20,000 top-flight runs with 47 international & IPL centuries.\n\nHis format-wise averages are:\n- Test: 50.66 (8,765 runs)\n- ODI: 53.50 (9,577 runs)\n- T20I: 26.12 (1,672 runs)\n- IPL: 39.70 (5,162 runs)`;
      stats = {
        "Test Avg": 50.66,
        "ODI Avg": 53.50,
        "T20I Avg": 26.12,
        "IPL Avg": 39.70
      };
    } else {
      answer = `AB de Villiers is one of the most prolific batters in history. Across 114 Tests, 228 ODIs, 78 T20Is and 184 IPL matches, he recorded 25,176 recognized runs with 50 total centuries. He holds the world record for the fastest 50 (16 balls), fastest 100 (31 balls) and fastest 150 (64 balls) in ODI history.`;
      stats = {
        "Test Runs": summary.formats.Test.runs,
        "ODI Runs": summary.formats.ODI.runs,
        "IPL Runs": summary.formats.IPL.runs,
        "Total 100s": 47
      };
    }

    return NextResponse.json({ answer, stats });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process cricket query' }, { status: 500 });
  }
}
