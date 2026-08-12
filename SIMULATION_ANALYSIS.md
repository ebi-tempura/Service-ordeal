# Service Ordeal — Simulation Analysis

**Version analyzed:** v1.0.0 mechanics  
**Analysis date:** August 12, 2026  
**Method:** 90 randomized playthroughs — 30 simulations for each shift

## Purpose

This report documents a repeated-run analysis of the completed Service Ordeal simulation. The objective was to examine how the game's random mechanics affect progression, workload, robberies, punishment exposure, negative days, and the time required to reach the $1,500 debt target.

The analysis uses the final v1 economy:

| Shift | Nominal time | Daily fee | Extra-shift fee |
| --- | ---: | ---: | ---: |
| Shift 1 | 60 min | $120 | $90 |
| Shift 2 | 120 min | $240 | $180 |
| Shift 3 | 180 min | $360 | $210 |

The punishment system uses a 30% probability of two punishment rolls, 40% probability of one punishment roll, and 30% probability of no punishment roll.

## Executive summary

All 90 simulated playthroughs eventually reached the $1,500 target. The three shifts produced clearly different risk/reward profiles.

| Statistic | Shift 1 | Shift 2 | Shift 3 |
| --- | ---: | ---: | ---: |
| Runs completed | 30/30 | 30/30 | 30/30 |
| Average days | 36.33 | 15.40 | 10.17 |
| Median days | 34.5 | 13 | 9 |
| Standard deviation | 9.28 | 6.89 | 4.65 |
| Fastest | 18 | 7 | 4 |
| Slowest | 70 | 35 | 26 |
| 25th percentile | 32 | 11.25 | 7 |
| 75th percentile | 40.5 | 17.75 | 13.5 |
| Approx. 95% CI for mean days | 32.9–39.8 | 12.8–18.0 | 8.4–11.9 |

Shift 1 behaves as the hard/ordeal route. Shift 2 is the balanced middle option. Shift 3 is the high-intensity route that normally clears the debt fastest.

## Completion-time distributions

### Shift 1

```text
32, 49, 29, 48, 18, 30, 33, 35, 49, 26,
32, 39, 35, 42, 42, 36, 70, 34, 33, 32,
31, 41, 32, 38, 32, 35, 36, 33, 41, 27
```

Mean: **36.33 days**. The majority of runs cluster around the low-to-high 30s, but the 70-day run demonstrates substantial tail risk from repeated bad outcomes.

### Shift 2

```text
12, 9, 15, 20, 13, 7, 13, 11, 8, 11,
9, 13, 18, 27, 10, 12, 35, 12, 33, 20,
17, 12, 15, 24, 15, 13, 13, 21, 9, 15
```

Mean: **15.40 days**. This shift remains close to the intended 15–20-day middle-ground experience.

### Shift 3

```text
9, 8, 7, 15, 14, 9, 7, 9, 12, 7,
5, 15, 12, 5, 26, 5, 15, 10, 12, 9,
14, 7, 4, 6, 8, 16, 10, 15, 7, 7
```

Mean: **10.17 days**. Most games finish in roughly one to two weeks, although unlucky punishment sequences can extend the ordeal considerably.

## Services performed

Service counts include completed services during forced extra shifts.

| Statistic | Shift 1 | Shift 2 | Shift 3 |
| --- | ---: | ---: | ---: |
| Average services/game | 122.0 | 110.5 | 107.6 |
| Median | 118 | 99 | 91 |
| Standard deviation | 26.9 | 45.7 | 47.7 |
| Minimum | 68 | 59 | 58 |
| Maximum | 222 | 239 | 284 |
| Total services across 30 games | 3,660 | 3,315 | 3,227 |
| Average services/day | 3.36 | 7.18 | 10.58 |

A counterintuitive result is that the shortest daily shift produces the highest average lifetime service count. Shift 1 performs fewer services per day, but the player remains in the simulation for many more days and therefore repeatedly pays fees and faces punishment exposure.

Shift 3 has the greatest daily workload but the lowest average total service count because the debt is usually cleared much sooner.

## Robberies

| Statistic | Shift 1 | Shift 2 | Shift 3 |
| --- | ---: | ---: | ---: |
| Total robberies | 118 | 50 | 36 |
| Average robberies/game | 3.93 | 1.67 | 1.20 |
| Median | 4 | 1 | 1 |
| Minimum | 0 | 0 | 0 |
| Maximum | 11 | 7 | 7 |

Across all 90 playthroughs, **204 robberies** occurred.

The robbery probability is not inherently higher for Shift 1. Instead, Shift 1 lasts longer and therefore generates more punishment opportunities over the lifetime of a playthrough.

Robberies per 100 days worked were approximately:

- Shift 1: 10.83
- Shift 2: 10.82
- Shift 3: 11.80

The similarity of these rates supports the interpretation that the difference in robberies per playthrough is primarily an exposure effect.

## Other punishment events

### Half-earnings theft

Average occurrences per playthrough:

- Shift 1: 3.97
- Shift 2: 1.90
- Shift 3: 1.13

Totals across 30 runs:

- Shift 1: 119
- Shift 2: 57
- Shift 3: 34

Total across all shifts: **210 events**.

### Forced extra shifts

Average forced extra shifts per playthrough:

- Shift 1: 3.67
- Shift 2: 1.80
- Shift 3: 0.77

Totals:

- Shift 1: 110
- Shift 2: 54
- Shift 3: 23

Total across all shifts: **187 forced extra shifts**.

## Negative financial days

A negative day occurs when earnings after punishment and the daily fee result in a negative daily contribution.

| Statistic | Shift 1 | Shift 2 | Shift 3 |
| --- | ---: | ---: | ---: |
| Average negative days/game | 8.27 | 3.20 | 1.97 |
| Total negative days | 248 | 96 | 59 |
| Percentage of working days | 22.8% | 20.8% | 19.3% |

Approximately one fifth of working days end negatively across the three strategies. This supports the v1 design decision not to impose another monetary penalty through `punishment_belowZero()`: a negative day already reduces progression, and an additional penalty could strengthen a self-reinforcing debt cycle.

## Earnings

Approximate average regular-service gross earnings per day:

- Shift 1: $182.32
- Shift 2: $387.31
- Shift 3: $594.52

Approximate average earnings after punishment:

- Shift 1: $165.06
- Shift 2: $360.72
- Shift 3: $558.80

Approximate net after the normal daily fee:

- Shift 1: $45.06/day
- Shift 2: $120.72/day
- Shift 3: $198.80/day

These margins explain the broad completion-time hierarchy. Random punishments, negative days, extra shifts, and final-target overshoot account for the difference between a simple debt/net-income calculation and observed completion times.

## Half-pay validation

The code gives a service a half-pay multiplier when a random integer from 0–9 is below 2, corresponding to a theoretical 20% probability.

Observed rates were:

- Shift 1: 19.29%
- Shift 2: 19.61%
- Shift 3: 19.99%

The observed values are close to the expected 20%, indicating that the random half-pay mechanism behaves as intended over a large number of services.

## Punishment-frequency validation

The theoretical top-level punishment distribution is 30% twice, 40% once, and 30% none.

Observed values were:

| Shift | Twice | Once | None |
| --- | ---: | ---: | ---: |
| Shift 1 | 31.9% | 40.0% | 28.1% |
| Shift 2 | 33.8% | 36.4% | 29.9% |
| Shift 3 | 31.1% | 41.3% | 27.5% |

The observed frequencies are reasonably close to the theoretical probabilities for samples of this size.

## Relationship between punishment and duration

Observed correlation between robbery count and total days required:

- Shift 1: 0.74
- Shift 2: 0.90
- Shift 3: 0.93

Observed correlation between negative days and total duration:

- Shift 1: 0.90
- Shift 2: 0.97
- Shift 3: 0.98

These results indicate that long playthroughs are strongly associated with cumulative bad financial outcomes. Service selection alone is not the primary source of extreme duration; repeated punishment exposure and negative days have a much stronger relationship with the length of the ordeal.

Correlation is descriptive here and should not be interpreted as a formal causal estimate.

## Shift-time behavior

The v1 timing implementation retains a known tolerance behavior.

Average recorded regular-shift times were approximately:

- Shift 1: 66.5 minutes for a nominal 60-minute shift
- Shift 2: 126.9 minutes for a nominal 120-minute shift
- Shift 3: 186.7 minutes for a nominal 180-minute shift

Maximum observed recorded times were:

- Shift 1: 80 minutes
- Shift 2: 140 minutes
- Shift 3: 200 minutes

This behavior was deliberately left unchanged at project close because correcting the timing logic would also change the number of completed services and therefore require another economy rebalance.

## Combined 90-run totals

Across all simulations:

| Metric | Total |
| --- | ---: |
| Playthroughs | 90 |
| Workdays | 1,857 |
| Services | 10,202 |
| Robberies | 204 |
| Half-earnings thefts | 210 |
| Forced extra shifts | 187 |
| Negative days | 403 |
| Completed debt objectives | 90/90 |

## Interpretation of the three shifts

### Shift 1 — The ordeal

Typical result: approximately **36 days, 122 services, 4 robberies, 4 half-earnings thefts, 4 forced extra shifts, and 8 negative days**.

The daily workload is lowest, but the player remains exposed to fees and random punishment for much longer. This creates the largest cumulative ordeal and substantial tail risk.

### Shift 2 — Balanced route

Typical result: approximately **15 days, 111 services, 1–2 robberies, 2 half-earnings thefts, 2 forced extra shifts, and 3 negative days**.

This is the middle-ground strategy and remains close to a 15–20-day target.

### Shift 3 — High-intensity escape route

Typical result: approximately **10 days, 108 services, 1 robbery, 1 half-earnings theft, fewer than one forced extra shift on average, and 2 negative days**.

The player accepts a much heavier daily workload but usually minimizes total exposure to the punishment system.

## Why this is a Monte Carlo simulation

Monte Carlo simulation is a method for studying a system by repeatedly running it with randomly sampled inputs or events and analyzing the resulting distribution of outcomes.

Service Ordeal naturally fits this approach because a playthrough contains several random mechanisms, including package selection, service selection, rest periods, half-pay rolls, punishment frequency, and punishment type. A single run cannot describe the game's expected behavior because a lucky or unlucky sequence can strongly change the result.

Instead, the simulation is repeated many times under the same rules. Each run produces observations such as days to clear the debt, services performed, robberies, and negative days. The collection of runs can then be summarized using means, medians, percentiles, standard deviations, ranges, event rates, and correlations.

The 90-run experiment is therefore a small Monte Carlo experiment: the code's random number generator samples possible game histories, and repeated playthroughs approximate the distribution of outcomes created by the game's probabilistic rules.

It is not an exhaustive calculation of every possible game path, and 30 runs per shift are not enough to determine the exact underlying distribution. A much larger experiment — for example 10,000 or 100,000 runs per shift — would produce more stable estimates, especially for rare extreme outcomes. For the purposes of evaluating a small learning project, however, the 90-run analysis is sufficient to reveal the major balance and risk patterns.

## Conclusion

The final v1 economy produces three meaningfully different strategies. Shorter daily shifts reduce immediate workload but increase lifetime exposure to fees and punishment. Longer shifts increase daily workload but usually reduce the total number of days and, surprisingly, the average total number of services required to clear the debt.

The strongest driver of unusually long playthroughs is cumulative financial adversity: robberies and negative days are strongly associated with increased completion time. Despite this volatility, all 90 runs completed successfully under the final v1 fee structure, supporting the decision to preserve the existing economy at project close.
