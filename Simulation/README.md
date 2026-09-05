# Service Ordeal

A small terminal-based Python simulation developed as a learning project.

The player begins with a **$1,500 debt** and selects one of three work shifts. During each day, randomly selected service packages generate earnings and consume time. Random rest periods, reduced-pay events, daily fees, and punishment events affect how quickly the player can clear the debt.

The project was built primarily as a practical Python exercise: developing the program incrementally, debugging it, separating reusable functions, working with random events and state, and using Git/GitHub for version control.

## Project status

**Version:** 1.0.0  
**Status:** Completed / archived as a learning project  
**Development period:** August 7–11, 2026

## How the simulation works

The program starts with:

- Debt target: **$1,500**
- Three selectable shifts
- Random service packages and service values
- Random rest periods
- A chance of receiving half pay for a service
- Daily operating fees
- Random punishment events

The game continues day by day until total accumulated earnings reach the debt target.

## Shifts

| Shift | Nominal time | Daily fee | Extra-shift fee |
| --- | ---: | ---: | ---: |
| Shift 1 | 60 min | $120 | $90 |
| Shift 2 | 120 min | $240 | $180 |
| Shift 3 | 180 min | $360 | $210 |

These values describe the completed v1.0.0 code in the repository.

## Service packages

`package_select()` randomly selects one of three packages.

| Package | Possible service earnings | Service time |
| --- | --- | ---: |
| Package A | $40, $60, $60, $80 | 10 min |
| Package B | $40, $60, $80, $60, $60 | 15 min |
| Package C | $80 | 20 min |

A service can also receive a `0.5` pay multiplier. In v1.0.0 this occurs when the random half-pay roll is below 2 on a 0–9 roll.

## Rest periods

After a service is selected, `rest_period()` determines whether an additional five-minute rest period is added.

The service time and rest time contribute to the recorded shift time.

## Punishment system

At the end of a working day, the simulation determines whether the player receives punishment events.

Current top-level probabilities are:

- **30%** — two punishment rolls
- **40%** — one punishment roll
- **30%** — no punishment roll

A punishment roll can result in several outcomes, including:

- Half of the current daily earnings being stolen
- Being robbed and losing the current daily earnings
- Being required to work an additional shift
- No monetary punishment

A forced extra shift generates additional services and earnings, but also carries an extra-shift fee.

If daily earnings after punishment do not cover the daily fee, the program displays an additional warning through `punishment_belowZero()`. In v1.0.0 this does **not** impose another monetary penalty, avoiding an additional debt spiral.

## Project structure

```text
Service-ordeal/
├── Service Ordeal.py       # Main simulation/game loop
├── Functions.py            # Service, rest, pay and punishment functions
├── test_functions.py       # Small function tests
├── README.md
├── CHANGELOG.md
└── RELEASE_NOTES_v1.0.0.md
```

`Service Ordeal.py` controls shift selection, daily progression, earnings, fees, and the main debt loop.

`Functions.py` contains the reusable simulation functions:

- `package_select()`
- `rest_period()`
- `pay_half()`
- `punishment_selector()`
- `punishment()`
- `punishment_belowZero()`

## Running the project

Python 3 is required. The project uses only the Python standard library.

Clone the repository and enter its directory, then run:

```bash
python3 "Service Ordeal.py"
```

When prompted, enter:

```text
1
2
or
3
```

to choose a shift.

## Example gameplay flow

```text
Debt = 1500
Enter the shift you are going to work: 1
The shift chosen is of 1 hour(s)
Shift time: 60 minutes
Daily fee: 120 dollars
Extra fee: 90 dollars
```

The simulation then generates services until the working period ends, calculates daily earnings, applies punishment events and fees, updates total earnings, and begins the next day. This continues until the $1,500 target is reached.

## Python concepts practiced

This project was intentionally kept relatively small so it could be used to practice core Python concepts rather than relying on frameworks or external packages.

Concepts practiced include:

- Functions and function arguments
- Multiple return values and tuples
- Lists and indexing
- `while` loops
- `if` / `elif` / `else` logic
- Random number generation and `random.choice()`
- Accumulators and program state
- Nested loops
- Importing functions from another Python file
- String formatting and terminal output
- Debugging tracebacks
- Basic testing
- Git commits and GitHub version control

## Design notes

The three shifts intentionally create different risk/reward profiles. Short shifts expose the player to less work during a single day but can require substantially more days to clear the debt. Longer shifts provide more earning opportunities per day and therefore can reduce total days spent in the simulation.

The project also contains some intentionally preserved v1 behavior around shift-time tolerance. Further refactoring or economic balancing could change the simulation substantially, so the completed version has been frozen as the learning-project baseline rather than continuously optimized.

## Limitations

This is a learning simulation rather than a production application. In particular:

- Gameplay is terminal-based.
- Randomness makes individual playthroughs highly variable.
- Game balance was tested empirically rather than through a formal probability model.
- Shift-time handling includes v1-specific tolerance behavior.
- There is no persistent save system.
- There is no graphical interface.

## Future possibilities

The project is considered complete, but possible extensions would include:

- Tkinter graphical interface
- Automated simulation/statistics mode
- Persistent game saves
- More service and punishment events
- Configurable difficulty
- Unit-test expansion
- Refactoring game state into classes

These are intentionally outside the scope of v1.0.0.

## Purpose

Service Ordeal was created as a hands-on Python exercise. The primary objective was not to produce a commercial game, but to independently work through program structure, debugging, random simulation, state management, and iterative balancing in a complete small project.
