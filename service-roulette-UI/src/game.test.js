import test from "node:test";
import assert from "node:assert/strict";
import {
  SHIFTS,
  START_GRACE_MINUTES,
  configureGame,
  continueJail,
  dismissJail,
  initialGame,
  remainingTime,
  resolveDay,
  rollCustomer,
  runProgress,
  validateSave,
} from "./game.js";

const sequence = (...values) => {
  let index = 0;
  return () => values[index++] ?? 0.5;
};

test("fee table and grace period match the game rules", () => {
  assert.equal(START_GRACE_MINUTES, 5);
  assert.deepEqual(SHIFTS.shift1, { label: "Shift 1", minutes: 60, dailyFee: 1200, extraFee: 900 });
  assert.deepEqual(SHIFTS.shift2, { label: "Shift 2", minutes: 120, dailyFee: 2400, extraFee: 1800 });
  assert.deepEqual(SHIFTS.shift3, { label: "Shift 3", minutes: 180, dailyFee: 3600, extraFee: 2100 });
});

test("customer rolls never exceed the selected shift", () => {
  let game = configureGame(initialGame(), "shift1", "19:30");
  game = { ...game, scheduleCheckedDate: "2026-09-04" };
  const now = new Date("2026-09-04T19:31:00");
  while (remainingTime(game) >= 10) game = rollCustomer(game, sequence(0.5), now);
  assert.ok(game.elapsed <= 60);
  assert.ok(remainingTime(game) < 10);
});

test("customer selection gives every S-roll customer one equal slot", () => {
  const codes = [];
  const now = new Date("2026-09-04T19:31:00");
  for (let index = 0; index < 10; index += 1) {
    let calls = 0;
    const rng = () => calls++ === 0 ? (index + 0.1) / 10 : 0.5;
    let game = configureGame(initialGame(), "shift3", "19:30");
    game = { ...game, scheduleCheckedDate: "2026-09-04", jailChecked: true };
    game = rollCustomer(game, rng, now);
    codes.push(game.currentService.customerCode);
  }
  assert.deepEqual([...codes].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("Time Lock blocks a regular shift before the planned start", () => {
  let game = configureGame(initialGame(), "shift1", "19:30", true);
  game = rollCustomer(game, sequence(0.2), new Date("2026-09-04T19:29:59"));
  assert.equal(game.history.length, 0);
  assert.equal(game.elapsed, 0);
  assert.match(game.notice.text, /SHIFT LOCKED/);
});

test("Time Lock preserves the five-minute grace period", () => {
  let game = configureGame(initialGame(), "shift1", "19:30", true);
  game = rollCustomer(game, sequence(0.2), new Date("2026-09-04T19:35:00"));
  assert.equal(game.history.length, 1);
  assert.equal(game.extraPunishmentReasons.length, 0);
});

test("Time Lock prevents a second completed regular shift on the same day", () => {
  let game = configureGame(initialGame(), "shift1", "19:30", true);
  game = { ...game, lastCompletedDate: "2026-09-04" };
  game = rollCustomer(game, sequence(0.2), new Date("2026-09-04T19:30:00"));
  assert.equal(game.history.length, 0);
  assert.match(game.notice.text, /already completed today's regular shift/);
});

test("Time Lock can be disabled for a same-day test run", () => {
  let game = configureGame(initialGame(), "shift1", "19:30", false);
  game = { ...game, lastCompletedDate: "2026-09-04" };
  game = rollCustomer(game, sequence(0.2), new Date("2026-09-04T19:30:00"));
  assert.equal(game.history.length, 1);
});

test("service half-pay and rest probabilities remain near their targets", () => {
  let half = 0;
  let rests = 0;
  const runs = 12000;
  const now = new Date("2026-09-04T19:31:00");
  for (let index = 0; index < runs; index += 1) {
    let game = configureGame(initialGame(), "shift3", "19:30");
    game = { ...game, scheduleCheckedDate: "2026-09-04", jailChecked: true };
    game = rollCustomer(game, Math.random, now);
    half += Number(game.currentService.halfPay);
    rests += Number(game.currentService.restMinutes === 5);
  }
  assert.ok(half / runs > 0.18 && half / runs < 0.22);
  assert.ok(rests / runs > 0.53 && rests / runs < 0.58);
});

test("anal tasks show distinct positions and oral tasks do not", () => {
  const game = configureGame(initialGame(), "shift3", "19:30");
  const tasks = rollCustomer(game, sequence(0)).currentService.tasks; // demanding customer
  const anal = tasks.filter((task) => task.kind === "anal");
  assert.equal(new Set(anal.map((task) => task.positionRoll)).size, 2);
  assert.ok(anal.every((task) => task.position && task.positionRoll >= 1 && task.positionRoll <= 20));
  assert.ok(tasks.filter((task) => task.kind === "oral").every((task) => !task.position));
});

test("daily half-loss happens before the daily fee", () => {
  let game = configureGame(initialGame(), "shift1", "19:30");
  game = {
    ...game,
    elapsed: 60,
    dailyEarnings: 4000,
    jailChecked: true,
    scheduleCheckedDate: "2026-09-04",
  };
  game = resolveDay(game, sequence(0.31, 0.71));
  assert.equal(game.completedDays[0].afterPunishment, 2000);
  assert.equal(game.completedDays[0].net, 800);
  assert.equal(game.totalEarnings, 800);
  assert.equal(game.mode, "dayComplete");
});

test("paying the debt pauses before the separate release day", () => {
  let game = configureGame(initialGame(), "shift1", "19:30");
  game = { ...game, elapsed: 60, dailyEarnings: 3000, totalEarnings: 14000, jailChecked: true };
  game = resolveDay(game, sequence(0.91));
  assert.equal(game.mode, "releaseReady");
  assert.equal(game.releaseDay.tasks.length, 8);
  assert.equal(new Set(game.releaseDay.tasks.filter((task) => task.kind === "anal").map((task) => task.positionRoll)).size, 4);
  game = resolveDay(game);
  assert.equal(game.mode, "release");
});

test("save validation accepts the current state shape", () => {
  const game = configureGame(initialGame(), "shift2", "08:00");
  assert.equal(validateSave(game), true);
  assert.equal(validateSave({ version: 1, shiftKey: "wrong", history: [], completedDays: [] }), false);
});

test("raid is checked after the shift, not while rolling customers", () => {
  let game = configureGame(initialGame(), "shift1", "19:30");
  game = rollCustomer(game, sequence(0));
  assert.equal(game.jail, null);
  game = { ...game, elapsed: 60 };
  game = resolveDay(game, sequence(0));
  assert.equal(game.jail.stage, "raid");
  assert.equal(game.history.length, 1);
  game = continueJail(game, sequence(0.51)); // roll 4
  assert.equal(game.jail.roll, 4);
  game = dismissJail(game);
  assert.equal(game.jail, null);
  game = resolveDay(game, sequence(0.91));
  assert.equal(game.mode, "dayComplete");
});

test("jail rolls 1–3 keep the player in jail until a roll of 4–6", () => {
  const base = { ...configureGame(initialGame(), "shift1", "19:30"), jail: { stage: "raid" } };
  const stuck = continueJail(base, sequence(0));
  assert.equal(stuck.jail.roll, 1);
  assert.equal(dismissJail(stuck), stuck);
  const again = continueJail(stuck, sequence(0.35)); // roll 3
  assert.equal(again.jail.roll, 3);
  const escaped = continueJail(again, sequence(0.51)); // roll 4
  assert.equal(escaped.jail.roll, 4);
  assert.equal(escaped.punishmentMessages.length, 3);
});

test("jail rerolls unaffordable payment and adds debt", () => {
  const base = { ...configureGame(initialGame(), "shift1", "19:30"), jail: { stage: "raid" } };
  const rerolled = continueJail(base, sequence(0.7, 0.9)); // 5 cannot be paid, then 6
  assert.equal(rerolled.jail.roll, 6);
  assert.equal(rerolled.addedDebt, 2500);
  const paid = continueJail({ ...base, totalEarnings: 3000 }, sequence(0.7));
  assert.equal(paid.totalEarnings, 500);
});

test("run progress records actual balance after bail and added debt", () => {
  let game = {
    ...configureGame(initialGame(), "shift1", "19:30"),
    elapsed: 60, dailyEarnings: 3000, totalEarnings: 5000,
    jailChecked: true, jail: { stage: "raid" },
  };
  game = dismissJail(continueJail(game, sequence(0.7))); // roll 5: pay bail
  assert.equal(game.totalEarnings, 2500);
  game = resolveDay(game, sequence(0.91)); // no regular punishments
  assert.equal(game.completedDays[0].runTotal, 4300);
  assert.equal(game.completedDays[0].debtRemaining, 10700);
  assert.equal(runProgress(game)[0].runTotal, game.totalEarnings);
  assert.ok(game.completedDays[0].events.some((event) => event.includes("bail")));

  const withDebt = { ...game, completedDays: [], day: 1, mode: "regular", elapsed: 60, dailyEarnings: 3000, jailChecked: true, addedDebt: 2500 };
  const next = resolveDay(withDebt, sequence(0.91));
  assert.equal(next.completedDays[0].debtTarget, 17500);
  assert.equal(next.completedDays[0].debtRemaining, 17500 - next.totalEarnings);
});

test("older saves show the real latest balance with estimated earlier days", () => {
  const game = {
    ...configureGame(initialGame(), "shift1", "19:30"),
    totalEarnings: 1800, addedDebt: 2500,
    completedDays: [{ day: 1, net: 2000 }, { day: 2, net: 2300 }],
  };
  const points = runProgress(game);
  assert.equal(points[0].runTotal, 2000);
  assert.equal(points[1].runTotal, 1800);
  assert.equal(points[1].debtRemaining, 15700);
  assert.ok(points.every((point) => point.estimated));
});
