import json
import os
import math

"""
DATA AUDITOR & STATISTICS CALCULATOR
Strict recalculation script for AB de Villiers career records.
Canonical Career Benchmarks (Official ICC / ESPNcricinfo / Wisden):
- Test:
  Matches: 114
  Innings: 191
  Runs: 8,765
  Not Outs: 18
  Highest Score: 278* (vs Pakistan, Abu Dhabi, 2010)
  Batting Average: 8765 / (191 - 18) = 8765 / 173 = 50.6647... -> 50.66
  Hundreds: 22
  Fifties: 46
  Balls Faced recorded: 16,077 (in tracked records)
  Test Career Strike Rate: 54.51
  Catches (Test): 222 (including wicketkeeping)
  Stumpings (Test): 5
  Wickets (Test bowling): 2

- ODI:
  Matches: 228
  Innings: 218
  Runs: 9,577
  Not Outs: 39
  Highest Score: 176 (vs Bangladesh, Paarl, 2017)
  Batting Average: 9577 / (218 - 39) = 9577 / 179 = 53.5027... -> 53.50
  Balls Faced: 9,473
  Batting Strike Rate: (9577 / 9473) * 100 = 101.0978... -> 101.09
  Hundreds: 25
  Fifties: 53
  Catches (ODI): 176
  Stumpings (ODI): 5
  Wickets (ODI bowling): 7

- T20I:
  Matches: 78
  Innings: 75
  Runs: 1,672
  Not Outs: 11
  Highest Score: 79*
  Batting Average: 1672 / (75 - 11) = 1672 / 64 = 26.125 -> 26.12
  Balls Faced: 1,237
  Batting Strike Rate: (1672 / 1237) * 100 = 135.165... -> 135.16
  Hundreds: 0
  Fifties: 10
  Catches (T20I): 65
  Stumpings (T20I): 7

- IPL (Indian Premier League - Delhi Daredevils & Royal Challengers Bangalore):
  Matches: 184
  Innings: 170
  Runs: 5,162
  Not Outs: 40
  Highest Score: 133* (vs Mumbai Indians, Wankhede, 2015)
  Batting Average: 5162 / (170 - 40) = 5162 / 130 = 39.7076... -> 39.70
  Balls Faced: 3,408
  Batting Strike Rate: (5162 / 3408) * 100 = 151.467... -> 151.46
  Hundreds: 3
  Fifties: 40
  Catches (IPL): 118
  Stumpings (IPL): 8
"""

def calculate_stats(innings_list):
    total_matches = len(set(i.get('match_id', i.get('match_no')) for i in innings_list))
    innings_count = 0
    runs = 0
    balls = 0
    not_outs = 0
    fours = 0
    sixes = 0
    hundreds = 0
    fifties = 0
    ducks = 0
    highest_score = 0
    highest_score_str = "0"
    
    for inn in innings_list:
        if inn.get('did_not_bat', False):
            continue
        innings_count += 1
        r = inn.get('runs', 0)
        b = inn.get('balls', 0)
        is_not_out = inn.get('not_out', False)
        
        runs += r
        balls += b
        fours += inn.get('fours', 0)
        sixes += inn.get('sixes', 0)
        
        if is_not_out:
            not_outs += 1
        elif r == 0:
            ducks += 1
            
        if r >= 100:
            hundreds += 1
        elif r >= 50:
            fifties += 1
            
        if r > highest_score:
            highest_score = r
            highest_score_str = f"{r}*" if is_not_out else str(r)
        elif r == highest_score and is_not_out and not highest_score_str.endswith('*'):
            highest_score_str = f"{r}*"
            
    dismissals = innings_count - not_outs
    avg = round(runs / dismissals, 2) if dismissals > 0 else None
    sr = round((runs / balls) * 100, 2) if balls > 0 else None
    
    return {
        "matches": total_matches,
        "innings": innings_count,
        "runs": runs,
        "balls": balls,
        "not_outs": not_outs,
        "average": avg,
        "strike_rate": sr,
        "highest_score": highest_score_str,
        "hundreds": hundreds,
        "fifties": fifties,
        "ducks": ducks,
        "fours": fours,
        "sixes": sixes
    }

print("Stats engine loaded successfully.")
