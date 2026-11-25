import json
import os
import math
from datetime import datetime

os.makedirs('src/data', exist_ok=True)

# 1. BIOGRAPHY
biography = {
    "playerId": "ab-de-villiers",
    "name": "AB de Villiers",
    "title": "Mr. 360: The Complete Career of Abraham Benjamin de Villiers",
    "lead": "Few cricketers in the history of the sport have reshaped the geometry of batsmanship and captivated global audiences quite like AB de Villiers. Combining classical orthodox purity with revolutionary 360-degree improvisational audacity, he mastered all three formats of international cricket while dismantling bowling attacks across the world.",
    "chapters": [
        {
            "id": "early-life",
            "title": "1. Early Life & Multi-Sport Prodigy",
            "content": "Abraham Benjamin de Villiers was born on 17 February 1984 in Warmbad (now Bela-Bela), South Africa. Raised in a sports-loving family, de Villiers attended the prestigious Afrikaanse Hoër Seunskool (Affies) in Pretoria—an institution that also nurtured his future South African teammate and lifelong friend Faf du Plessis. A prodigiously talented natural athlete, de Villiers excelled in tennis, rugby, golf, and badminton during his school years before dedicating his full focus to cricket.",
            "image": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop",
            "caption": "Early formative years at Affies, Pretoria, where de Villiers forged his foundational athletic craft."
        },
        {
            "id": "domestic-debut",
            "title": "2. Domestic Cricket & South Africa U19",
            "content": "De Villiers represented South Africa Under-19 in 2002–03 before breaking into senior domestic cricket for Northerns and later the Titans. Demonstrating remarkable composure and aggressive stroke play against seasoned fast bowlers in the SuperSport Series, his rapid rise through the domestic ranks caught the eye of national selectors by late 2004.",
            "image": "https://images.unsplash.com/photo-1531415074868-83633dd5e45c?q=80&w=800&auto=format&fit=crop",
            "caption": "Making an impression for the Titans in South African domestic cricket."
        },
        {
            "id": "test-career",
            "title": "3. International Test Debut & Orthodox Dominance",
            "content": "De Villiers made his Test debut on 16 December 2004 against England at St George's Park, Port Elizabeth, aged just 20. Initially deployed as an opening batter, he later settled into the middle order where he became an indispensable pillar of South Africa's golden era. Over 114 Test matches, de Villiers amassed 8,765 runs at an average of 50.66 with 22 centuries. His monumental unbeaten 278* against Pakistan in Abu Dhabi in 2010 stood as the highest individual score by a South African until Richard Levi and Hashim Amla.",
            "image": "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=800&auto=format&fit=crop",
            "caption": "AB de Villiers during his epic 278* against Pakistan in Abu Dhabi, 2010."
        },
        {
            "id": "odi-mastery",
            "title": "4. ODI Dominance & The Fastest Century in Cricket History",
            "content": "In One Day Internationals, de Villiers transcended conventional batting. In 228 matches, he scored 9,577 runs at an average of 53.50 and a staggering strike rate of 101.09. On 18 January 2015 at the Wanderers Stadium in Johannesburg, wearing pink, de Villiers produced arguably the most devastating batting exhibition in ODI history: scoring the fastest 50 (16 balls), the fastest 100 (31 balls), and concluding with 149 runs off just 44 balls against the West Indies.",
            "image": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop",
            "caption": "The record-shattering 31-ball century against the West Indies at the Wanderers, January 2015."
        },
        {
            "id": "mr-360-ipl",
            "title": "5. Mr. 360 & The IPL Legacy with RCB",
            "content": "After representing the Delhi Daredevils in the first three IPL editions, de Villiers joined Royal Challengers Bangalore in 2011, beginning an iconic decade-long partnership with Virat Kohli. His unique ability to reverse sweep fast bowlers over third man, sweep yorkers over deep backward square leg, and loft balls out of the M. Chinnaswamy Stadium earned him the moniker 'Mr. 360'. He finished his IPL career with 5,162 runs at an average of 39.70 and strike rate of 151.46, including 3 unforgettable centuries.",
            "image": "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=800&auto=format&fit=crop",
            "caption": "Reigning supreme in Bengaluru: AB de Villiers in his legendary RCB colors."
        },
        {
            "id": "fielding-wicketkeeping",
            "title": "6. Acrobatics, Wicketkeeping & Fielding Prowess",
            "content": "Beyond his genius with the bat, de Villiers was a world-class athlete in the field. He performed double duties as a specialist wicketkeeper in 24 Tests and over 50 ODIs, whilst routinely producing gravity-defying boundary saves, direct hits, and leaping catches that earned him 463 dismissals across all professional formats.",
            "image": "https://images.unsplash.com/photo-1531415074868-83633dd5e45c?q=80&w=800&auto=format&fit=crop",
            "caption": "Flying across the outfield: de Villiers was renowned as one of the greatest fielders of the modern era."
        },
        {
            "id": "retirement-legacy",
            "title": "7. Retirement & Eternal Legacy",
            "content": "De Villiers shocked the cricketing world in May 2018 by announcing his retirement from all international cricket, stating he was 'tired' and wished to step away while still performing at his peak. He continued playing franchise cricket until November 2021 when he announced his complete retirement from all forms of the game. Inducted into the ICC Cricket Hall of Fame in 2024, de Villiers is universally celebrated as a revolutionary architect of modern cricket.",
            "image": "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=800&auto=format&fit=crop",
            "caption": "A standing ovation: de Villiers acknowledged by teammates and fans at the conclusion of his storied career."
        }
    ]
}

# 2. CANONICAL CAREER SUMMARY & METRICS
summary = {
    "player": {
        "id": "ab-de-villiers",
        "name": "AB de Villiers",
        "fullName": "Abraham Benjamin de Villiers",
        "country": "South Africa",
        "dateOfBirth": "1984-02-17",
        "birthPlace": "Bela-Bela, Transvaal Province, South Africa",
        "role": "Batter / Wicketkeeper",
        "battingStyle": "Right-hand bat",
        "bowlingStyle": "Right-arm medium",
        "teams": [
            "South Africa", "Royal Challengers Bangalore", "Delhi Daredevils", 
            "Titans", "Northerns", "Brisbane Heat", "Lahore Qalandars", 
            "Middlesex", "Barbados Tridents", "Tshwane Spartans"
        ],
        "careerSpan": "2004 - 2021"
    },
    "formats": {
        "Test": {
            "matches": 114,
            "innings": 191,
            "runs": 8765,
            "ballsFaced": 16077,
            "notOuts": 18,
            "highestScore": "278*",
            "highestScoreRaw": 278,
            "average": 50.66,
            "strikeRate": 54.51,
            "hundreds": 22,
            "fifties": 46,
            "ducks": 8,
            "fours": 1024,
            "sixes": 64,
            "bowling": {
                "innings": 7,
                "overs": 33.1,
                "runsConceded": 104,
                "wickets": 2,
                "bestBowling": "2/49",
                "average": 52.00,
                "economy": 3.13
            },
            "fielding": {
                "catches": 222,
                "stumpings": 5
            }
        },
        "ODI": {
            "matches": 228,
            "innings": 218,
            "runs": 9577,
            "ballsFaced": 9473,
            "notOuts": 39,
            "highestScore": "176",
            "highestScoreRaw": 176,
            "average": 53.50,
            "strikeRate": 101.09,
            "hundreds": 25,
            "fifties": 53,
            "ducks": 7,
            "fours": 840,
            "sixes": 204,
            "bowling": {
                "innings": 12,
                "overs": 45.3,
                "runsConceded": 288,
                "wickets": 7,
                "bestBowling": "2/15",
                "average": 28.85,
                "economy": 6.32
            },
            "fielding": {
                "catches": 176,
                "stumpings": 5
            }
        },
        "T20I": {
            "matches": 78,
            "innings": 75,
            "runs": 1672,
            "ballsFaced": 1237,
            "notOuts": 11,
            "highestScore": "79*",
            "highestScoreRaw": 79,
            "average": 26.12,
            "strikeRate": 135.16,
            "hundreds": 0,
            "fifties": 10,
            "ducks": 5,
            "fours": 140,
            "sixes": 60,
            "bowling": {
                "innings": 0,
                "overs": 0,
                "runsConceded": 0,
                "wickets": 0,
                "bestBowling": "-",
                "average": None,
                "economy": None
            },
            "fielding": {
                "catches": 65,
                "stumpings": 7
            }
        },
        "IPL": {
            "matches": 184,
            "innings": 170,
            "runs": 5162,
            "ballsFaced": 3408,
            "notOuts": 40,
            "highestScore": "133*",
            "highestScoreRaw": 133,
            "average": 39.70,
            "strikeRate": 151.46,
            "hundreds": 3,
            "fifties": 40,
            "ducks": 10,
            "fours": 413,
            "sixes": 251,
            "bowling": {
                "innings": 0,
                "overs": 0,
                "runsConceded": 0,
                "wickets": 0,
                "bestBowling": "-",
                "average": None,
                "economy": None
            },
            "fielding": {
                "catches": 118,
                "stumpings": 8
            }
        }
    },
    "careerTotals": {
        "allRecognizedMatches": 604,
        "totalRuns": 25176,
        "totalHundreds": 50,
        "totalFifties": 149,
        "totalCatches": 581,
        "totalStumpings": 25
    }
}

# 3. MEMORABLE CAREER MOMENTS
milestones = [
    {
        "id": "fastest-hundred-2015",
        "title": "Fastest 100 in ODI History (31 balls)",
        "match": "South Africa vs West Indies, 2nd ODI",
        "date": "18 January 2015",
        "venue": "New Wanderers Stadium, Johannesburg",
        "format": "ODI",
        "runs": 149,
        "balls": 44,
        "fours": 9,
        "sixes": 16,
        "strikeRate": 338.63,
        "description": "Coming in at number three in the 39th over following a 247-run opening stand, de Villiers unleashed the most devastating display of power-hitting cricket has ever witnessed. He reached 50 off 16 balls and his century in 31 balls—both world records that remain unbroken.",
        "image": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": "world-cup-162-2015",
        "title": "Fastest 150 in ODI History (64 balls) — 162* vs WI",
        "match": "South Africa vs West Indies, ICC Cricket World Cup Pool B",
        "date": "27 February 2015",
        "venue": "Sydney Cricket Ground, Sydney",
        "format": "ODI",
        "runs": 162,
        "balls": 66,
        "fours": 17,
        "sixes": 8,
        "strikeRate": 245.45,
        "description": "Just five weeks after his Johannesburg blitz, de Villiers tore apart the West Indian bowling attack once more, this time on the world stage at the SCG. He reached 150 in just 64 balls, the fastest 150 in ODI history, leading South Africa to a commanding 257-run victory.",
        "image": "https://images.unsplash.com/photo-1531415074868-83633dd5e45c?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": "abu-dhabi-278-2010",
        "title": "Epic 278* — South Africa's Highest Test Score at the time",
        "match": "Pakistan vs South Africa, 2nd Test",
        "date": "20 November 2010",
        "venue": "Sheikh Zayed Stadium, Abu Dhabi",
        "format": "Test",
        "runs": 278,
        "balls": 418,
        "fours": 23,
        "sixes": 6,
        "strikeRate": 66.50,
        "description": "In searing desert heat against a Pakistan attack featuring Umar Gul, Saeed Ajmal, and Mohammad Hafeez, de Villiers batted for over ten hours (627 minutes) to score 278 not out, breaking Graeme Smith's record for South Africa's highest individual Test score.",
        "image": "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": "wankhede-133-ipl-2015",
        "title": "133* off 59 Balls & 215-run Partnership with Virat Kohli",
        "match": "Royal Challengers Bangalore vs Mumbai Indians, IPL",
        "date": "10 May 2015",
        "venue": "Wankhede Stadium, Mumbai",
        "format": "IPL",
        "runs": 133,
        "balls": 59,
        "fours": 19,
        "sixes": 4,
        "strikeRate": 225.42,
        "description": "At a packed Wankhede Stadium, de Villiers combined with Virat Kohli (82*) in an unbeaten 215-run stand for the second wicket. He dismantled Lasith Malinga and Harbhajan Singh with sublime 360-degree strokeplay.",
        "image": "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": "adelaide-blockathon-2012",
        "title": "The Masterclass of Defense: 33 off 220 balls to save Adelaide Test",
        "match": "Australia vs South Africa, 2nd Test",
        "date": "26 November 2012",
        "venue": "Adelaide Oval, Adelaide",
        "format": "Test",
        "runs": 33,
        "balls": 220,
        "fours": 0,
        "sixes": 0,
        "strikeRate": 15.00,
        "description": "A profound demonstration that de Villiers was not just an explosive striker. Facing a lethal Australian attack led by Peter Siddle and James Pattinson on a deteriorating day five pitch, de Villiers joined Faf du Plessis to stone-wall for 220 balls without hitting a single boundary, salvaging an unforgettable draw that preserved South Africa's world #1 Test ranking.",
        "image": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": "gujarat-lions-129-ipl-2016",
        "title": "129* off 52 balls & 229-run record stand with Kohli",
        "match": "Royal Challengers Bangalore vs Gujarat Lions, IPL",
        "date": "14 May 2016",
        "venue": "M. Chinnaswamy Stadium, Bengaluru",
        "format": "IPL",
        "runs": 129,
        "balls": 52,
        "fours": 10,
        "sixes": 12,
        "strikeRate": 248.07,
        "description": "In front of his adoring home fans in Bengaluru, de Villiers struck 12 mammoth sixes and 10 fours. Together with Virat Kohli (109 off 55), they established the highest partnership in IPL history: 229 runs for the 2nd wicket.",
        "image": "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=800&auto=format&fit=crop"
    }
]

with open('src/data/ab_de_villiers_bio.json', 'w') as f:
    json.dump(biography, f, indent=2)

with open('src/data/ab_de_villiers_summary.json', 'w') as f:
    json.dump(summary, f, indent=2)

with open('src/data/ab_de_villiers_milestones.json', 'w') as f:
    json.dump(milestones, f, indent=2)

print("Bio, summary, and milestones written successfully.")
