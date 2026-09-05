# Changelog

All notable changes to **Service Ordeal** are documented here.

The project was developed as a short Python learning exercise between **August 7 and August 11, 2026**.

## [1.0.0] - 2026-08-11

### Added

- Complete terminal-based Service Ordeal simulation.
- $1,500 debt objective and multi-day progression loop.
- Three selectable work shifts with different durations and fees.
- Random package and service selection.
- Service-specific time requirements.
- Random five-minute rest periods.
- Random half-pay service mechanic.
- Daily earnings accumulation.
- Daily shift fees.
- Random punishment system supporting zero, one, or two punishment rolls per day.
- Robbery event that removes the day's current earnings.
- Event where half of the day's current earnings are stolen.
- Forced extra-shift event with additional service generation and an extra-shift fee.
- Non-monetary below-zero warning when daily earnings fail to cover the daily fee.
- Separate `Functions.py` module for reusable game logic.
- Basic function testing file.
- Git/GitHub version-control workflow.

### Changed during development

- Refactored punishment logic to return both earnings and pay multiplier values consistently.
- Corrected several function-argument ordering and missing-argument errors.
- Corrected tuple handling between function returns and the main program.
- Improved extra-shift earnings accumulation.
- Added shift-time tolerance behavior to prevent shifts from ending immediately at their nominal duration.
- Rebalanced top-level punishment frequency so days can occur without a punishment roll.
- Adjusted punishment probabilities to the final v1 structure:
  - 30% chance of two punishment rolls
  - 40% chance of one punishment roll
  - 30% chance of no punishment
- Kept the below-zero consequence non-monetary to reduce the risk of an unrecoverable debt loop.

### Tested

- Repeated simulations were performed across all three shifts to evaluate completion time, service counts, robberies, negative days, and punishment impact.
- Alternative higher fee configurations were evaluated and rejected because they could create extremely long or effectively unwinnable debt cycles.
- The final repository retains the lower v1 fee structure because it produces a playable progression across the three shifts.

### Known limitations

- Terminal interface only.
- No persistent save/load functionality.
- Shift-time tolerance logic is preserved as v1 behavior and is not intended as a precise scheduling model.
- Randomness can create large differences between playthroughs.
- `punishment_belowZero()` currently provides a warning rather than an additional financial penalty.
- The simulation has not been refactored into an object-oriented architecture.

## Development history

### 2026-08-07 — Initial development

- Began development of the Service Ordeal simulation.
- Implemented early service, earnings, shift, and punishment concepts.
- Worked through function parameters, return values, and multi-file imports.

### 2026-08-08 to 2026-08-09 — Core mechanics and debugging

- Expanded punishment logic.
- Implemented extra-shift behavior.
- Debugged tuple return values and positional-argument errors.
- Improved earnings and pay-multiplier handling.

### 2026-08-10 — Functional completion

- Resolved remaining punishment-selector argument and state issues.
- Reached a complete working version of the main simulation.
- Began considering a simple graphical interface as a possible future extension.

### 2026-08-11 — Balance testing and project close

- Added/adjusted shift overtime tolerance.
- Rebalanced punishment frequency.
- Ran repeated simulations for all three shifts.
- Analyzed completion time, services performed, robbery frequency, negative days, and alternative fee structures.
- Decided to preserve the playable v1 economy and close the project as a completed Python learning exercise.
