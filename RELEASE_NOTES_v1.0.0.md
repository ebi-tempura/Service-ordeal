# Service Ordeal v1.0.0 — Release Notes

**Release date:** August 11, 2026  
**Status:** Final learning-project release

## Overview

Service Ordeal v1.0.0 is the first completed version of a terminal-based Python simulation built to practice fundamental Python programming, debugging, program structure, random events, and Git/GitHub workflows.

The player starts with a **$1,500 debt** and repeatedly works selected shifts until accumulated earnings reach the target. Earnings are affected by randomly selected services, service duration, rest periods, half-pay events, daily fees, and punishment events.

## Included in v1.0.0

### Three shift options

| Shift | Nominal duration | Daily fee | Forced extra-shift fee |
| --- | ---: | ---: | ---: |
| 1 | 60 minutes | $120 | $90 |
| 2 | 120 minutes | $240 | $180 |
| 3 | 180 minutes | $360 | $210 |

The shifts create different daily workload and progression profiles.

### Service generation

Each service is generated from one of three randomly selected packages:

- Package A — 10-minute services
- Package B — 15-minute services
- Package C — 20-minute services

Service earnings are also selected randomly from the values associated with each package.

### Rest mechanic

Services can be followed by an additional five-minute rest period. Rest time contributes to total recorded working time.

### Half-pay mechanic

Individual services can receive a `0.5` pay multiplier, reducing the earnings from that service by half.

### Punishment system

At the end of each workday, the game determines how many punishment rolls occur:

- 30% — two rolls
- 40% — one roll
- 30% — no rolls

Individual punishment rolls can result in:

- Half of current daily earnings being stolen
- A robbery that reduces current daily earnings to zero
- A forced extra shift
- No monetary punishment

### Forced extra shifts

A forced extra shift runs another service loop based on the selected shift duration. The player can generate additional earnings but must also pay the shift-specific extra fee.

### Negative-day handling

If the player's earnings after punishment are insufficient to cover the daily fee, the simulation reports the situation through `punishment_belowZero()`.

No additional monetary punishment is applied in v1.0.0. This design decision prevents a bad day from automatically generating another financial penalty and reduces the possibility of a self-reinforcing debt trap.

## Architecture

The final version separates the program into two principal Python files.

### `Service Ordeal.py`

Responsible for:

- Initial debt
- Shift selection
- Daily game loop
- Shift/service loop
- Daily earnings
- Fees
- Total progression toward the debt target

### `Functions.py`

Contains:

- `package_select()`
- `rest_period()`
- `pay_half()`
- `punishment_selector()`
- `punishment()`
- `punishment_belowZero()`

This separation was introduced as part of practicing modular Python development.

## Balance testing

Before closing v1.0.0, repeated randomized simulations were used to examine the economy across all three shifts.

Testing focused on:

- Days required to reach the $1,500 target
- Total services performed
- Robbery frequency
- Negative-earning days
- Punishment frequency
- Effects of longer shifts
- Effects of alternative daily and extra-shift fees

The tests showed that the different shifts produce substantially different progression profiles and that random punishments can create considerable variation between individual playthroughs.

Higher experimental fee configurations were also evaluated. Those configurations could make some shifts take hundreds or thousands of simulated days to complete, demonstrating a debt-trap effect. Those experimental fees were **not adopted** into the final v1.0.0 code.

## Known v1 behavior

The shift loop includes a time-tolerance implementation that can allow recorded working time to extend beyond the nominal shift duration. This behavior was identified during testing.

Changing the timing logic also changes the number of services that can be completed and therefore changes the entire game economy. Because the existing configuration remained playable, this behavior was preserved for the completed learning-project release instead of performing a larger rebalance immediately before project close.

## What was learned

The project provided practical experience with:

- Python syntax and control flow
- Nested `while` loops
- Functions and parameters
- Multiple function return values
- Tuple unpacking
- Lists and indexing
- Randomized program behavior
- Accumulating state across iterations
- Importing functions between modules
- Debugging `TypeError`, `NameError`, and `IndentationError` issues
- Understanding positional arguments
- Testing probabilistic behavior through repeated runs
- Balancing a simple simulation based on observed results
- Git commits and GitHub repositories

## Final status

v1.0.0 marks the planned end of the Service Ordeal project.

Possible future work such as a Tkinter interface, object-oriented refactoring, automated statistical testing, or additional gameplay mechanics is intentionally left outside this release. The repository remains as a record of the completed Python learning exercise.
