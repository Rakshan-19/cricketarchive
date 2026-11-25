import json
import math

"""
DATA AUDITOR - INDEPENDENT STATISTICAL RE-CALCULATOR
This script verifies the integrity, chronology, and calculation consistency
of AB de Villiers' career records against canonical cricket records.
"""

def run_audit():
    print("="*60)
    print("CRICKET ARCHIVE DATA INTEGRITY & STATISTICAL RE-CALCULATION AUDIT")
    print("="*60)

    # 1. Load matches
    with open('src/data/ab_de_villiers_matches.json', 'r') as f:
        matches = json.load(f)

    with open('src/data/ab_de_villiers_summary.json', 'r') as f:
        summary = json.load(f)

    # 2. Chronological check
    dates = [m['date'] for m in matches]
    is_chronological = dates == sorted(dates)
    print(f"Chronological Sorting Integrity: {'PASSED [OK]' if is_chronological else 'FAILED'}")

    # 3. Duplicate Match ID Check
    match_ids = [m['matchId'] for m in matches]
    has_duplicates = len(match_ids) != len(set(match_ids))
    print(f"Unique Match Records Check: {'PASSED [OK]' if not has_duplicates else 'FAILED (Duplicates detected)'}")

    # 4. Format-by-Format Recalculation
    formats = ['Test', 'ODI', 'T20I', 'IPL']
    audit_results = {}

    for fmt in formats:
        fmt_matches = [m for m in matches if m['format'] == fmt]
        total_matches = len(fmt_matches)
        
        # Calculate innings, runs, dismissals, boundaries, 100s, 50s
        innings_count = 0
        runs = 0
        balls = 0
        fours = 0
        sixes = 0
        not_outs = 0
        hundreds = 0
        fifties = 0
        ducks = 0
        catches = 0
        stumpings = 0
        highest_score = 0
        
        for m in fmt_matches:
            catches += m.get('catches', 0)
            stumpings += m.get('stumpings', 0)
            
            # Count primary innings
            if not m.get('didNotBat', False) and m.get('dismissal') != 'did not bat':
                innings_count += 1
                r = m['runs']
                b = m['balls']
                f4 = m['fours']
                s6 = m['sixes']
                no = m['notOut']
                
                runs += r
                balls += b
                fours += f4
                sixes += s6
                
                if no:
                    not_outs += 1
                elif r == 0:
                    ducks += 1
                    
                if r >= 100:
                    hundreds += 1
                elif r >= 50:
                    fifties += 1
                    
                if r > highest_score:
                    highest_score = r

            # In Tests, count secondary innings if present
            if fmt == 'Test' and m.get('secondaryInnings'):
                sec = m['secondaryInnings']
                innings_count += 1
                r = sec['runs']
                b = sec['balls']
                f4 = sec.get('fours', 0)
                s6 = sec.get('sixes', 0)
                no = sec.get('notOut', False)
                
                runs += r
                balls += b
                fours += f4
                sixes += s6
                
                if no:
                    not_outs += 1
                elif r == 0:
                    ducks += 1
                    
                if r >= 100:
                    hundreds += 1
                elif r >= 50:
                    fifties += 1
                    
                if r > highest_score:
                    highest_score = r
                
        dismissals = innings_count - not_outs
        calc_avg = round(runs / dismissals, 2) if dismissals > 0 else 0.0
        calc_sr = round((runs / balls) * 100, 2) if balls > 0 else 0.0
        
        canon = summary['formats'][fmt]
        
        audit_results[fmt] = {
            "recalculated": {
                "matches": total_matches,
                "innings": innings_count,
                "runs": runs,
                "balls": balls,
                "notOuts": not_outs,
                "average": calc_avg,
                "strikeRate": calc_sr,
                "hundreds": hundreds,
                "fifties": fifties,
                "highestScore": highest_score
            },
            "canonical": {
                "matches": canon['matches'],
                "innings": canon['innings'],
                "runs": canon['runs'],
                "notOuts": canon['notOuts'],
                "average": canon['average'],
                "hundreds": canon['hundreds'],
                "fifties": canon['fifties'],
                "highestScore": canon['highestScoreRaw']
            }
        }

    print("\nFORMAT RECALCULATION & COMPARISON SUMMARY:")
    print("-" * 75)
    print(f"{'Format':<8} | {'Matches':<8} | {'Runs (Recalc/Canon)':<22} | {'Avg':<12} | {'100s/50s':<10}")
    print("-" * 75)
    for fmt, data in audit_results.items():
        re = data['recalculated']
        ca = data['canonical']
        runs_comp = f"{re['runs']} / {ca['runs']}"
        avg_comp = f"{re['average']} / {ca['average']}"
        hs_comp = f"{re['hundreds']}h {re['fifties']}f"
        print(f"{fmt:<8} | {re['matches']:<8} | {runs_comp:<22} | {avg_comp:<12} | {hs_comp:<10}")
    print("-" * 75)

    # Save verification audit artifact
    with open('src/data/audit_report.json', 'w') as f:
        json.dump(audit_results, f, indent=2)

    print("\nData audit report generated: src/data/audit_report.json")

if __name__ == "__main__":
    run_audit()
