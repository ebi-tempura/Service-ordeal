export const DEBT_TARGET = 1500;
export const START_GRACE_MINUTES = 5;

export const SHIFTS = {
  shift1: { label: "Shift 1", minutes: 60, dailyFee: 120, extraFee: 90 },
  shift2: { label: "Shift 2", minutes: 120, dailyFee: 320, extraFee: 240 },
  shift3: { label: "Shift 3", minutes: 180, dailyFee: 520, extraFee: 390 },
};

const ORAL_TASKS = {
  1: "Suck slowly and sensually for 5 minutes",
  2: "Suck fast for 5 minutes",
  3: "Deepthroat slowly 10 times",
  4: "Deepthroat hard and fast 10 times",
  5: "Deepthroat 10 times and hold each one for at least 10 seconds",
  6: "Deepthroat slowly 20 times",
  7: "Deepthroat hard and fast 20 times",
  8: "Deepthroat 20 times and hold each one for at least 10 seconds",
  9: "Hold the dildo down your throat for 5 minutes, resurfacing for air as needed",
  0: "Facefuck hard and fast for 5 minutes",
};

const ANAL_TASKS = {
  1: "Fuck slow and deep for 5 minutes",
  2: "Fuck slow and deep for 5 minutes",
  3: "Fuck fast and deep for 5 minutes",
  4: "Fuck fast and deep for 5 minutes",
  5: "Fuck fast and deep for 5 minutes, fully out and back in on each stroke",
  6: "Fuck fast and deep for 5 minutes, fully out and back in on each stroke",
  7: "Fuck slow and deep for 5 minutes, pausing 5 times to suck deeply",
  8: "Fuck slow and deep for 5 minutes, pausing 5 times to suck deeply",
  9: "Fuck fast and deep for 5 minutes, fully out and back in on each stroke, pausing 5 times to deepthroat",
  0: "Fuck fast and deep for 5 minutes, fully out and back in on each stroke, pausing 5 times to deepthroat",
};

const KINKS = {
  1: "Blindfold", 2: "Body Writing", 3: "Handcuffs", 4: "Handcuffs",
  5: "Plug", 6: "Plug", 7: "Spread Ass", 8: "Strip Dance",
  9: "Strip Dance", 0: "No additional kink",
};

const CHEST_MOUTH_FACE = {
  1: "On chest", 2: "On chest", 3: "On chest", 4: "In mouth", 5: "In mouth",
  6: "In mouth", 7: "On face", 8: "On face", 9: "On face", 0: "On face",
};
const ASS_OR_IN_ASS = {
  1: "On ass and back", 2: "On ass and back", 3: "On ass and back", 4: "In ass",
  5: "In ass", 6: "In ass", 7: "In ass", 8: "In ass", 9: "In ass", 0: "In ass",
};
const CHEST_FACE = {
  1: "On chest", 2: "On chest", 3: "In mouth", 4: "In mouth", 5: "In mouth",
  6: "In mouth", 7: "On face", 8: "On face", 9: "On face", 0: "On face",
};
const ASS_FACE = {
  1: "In ass", 2: "In ass", 3: "In ass", 4: "In ass", 5: "In ass",
  6: "In ass", 7: "On face", 8: "On face", 9: "On face", 0: "On face",
};

export const CUSTOMERS = {
  1: { code: 1, name: "Oral guy", tasks: ["oral", "oral"], cumshot: CHEST_MOUTH_FACE, money: 40 },
  2: { code: 2, name: "Anal guy", tasks: ["anal", "anal"], cumshot: ASS_OR_IN_ASS, money: 60 },
  3: { code: 3, name: "Regular guy", tasks: ["oral", "anal"], cumshot: ASS_OR_IN_ASS, money: 60 },
  4: { code: 4, name: "Ass-to-mouth guy", tasks: ["anal", "oral"], cumshot: CHEST_MOUTH_FACE, money: 80 },
  5: { code: 5, name: "Oral connoisseur", tasks: ["oral", "oral", "oral"], cumshot: CHEST_FACE, money: 40 },
  6: { code: 6, name: "Anal connoisseur", tasks: ["anal", "anal", "anal"], cumshot: ASS_OR_IN_ASS, money: 60 },
  7: { code: 7, name: "Ass-to-mouth lover", tasks: ["oral", "anal", "oral"], cumshot: CHEST_FACE, money: 80 },
  8: { code: 8, name: "Man with stamina", tasks: ["oral", "anal", "anal"], cumshot: ASS_OR_IN_ASS, money: 60 },
  9: { code: 9, name: "Man with patience", tasks: ["oral", "oral", "anal"], cumshot: ASS_FACE, money: 60 },
  0: { code: 0, name: "Demanding customer", tasks: ["oral", "anal", "oral", "anal"], cumshot: ASS_FACE, money: 80 },
};

const PACKAGES = { A: [1, 2, 3, 4], B: [5, 6, 7, 8, 9], C: [0] };

export const NON_MONETARY_PUNISHMENTS = {
  1: { title: "Exhausted", instruction: "Delay changing clothes briefly only if comfortable and hygienic. Clean up immediately if there is irritation or discomfort." },
  2: { title: "Kept in discomfort", instruction: "Use removable costume accessories for no more than 30 minutes. Keep circulation unrestricted, keep a quick release available, and never sleep restrained." },
  3: { title: "Kept in discomfort", instruction: "Remain in a mildly uncomfortable but safe outfit or pose for no more than 20 minutes. Stop immediately for pain, numbness, dizziness, or distress." },
  4: { title: "Clamping", instruction: "Hold the selected pose for up to 10 minutes. Use only non-restrictive props; do not impair circulation, breathing, balance, or safe movement." },
  5: { title: "Flight risk", instruction: "Use a symbolic, immediately escapable restraint for no more than 10 minutes. Keep normal toilet access, never remain restrained alone, and never sleep restrained." },
  6: { title: "Cold shower", instruction: "Take a brief cool—not freezing—shower. Stop immediately for shivering, dizziness, numbness, breathing difficulty, or distress." },
  9: { title: "Dirty day", instruction: "Skip only optional preparation before the next shift; maintain normal hygiene and stop if there is irritation, pain, or any sign of infection." },
};

const POSITIONS = {
  1: "Humble / Punishment", 2: "Nadu / Present", 3: "Wait", 4: "Collar Me",
  5: "Wall", 6: "Stool / Obeisance", 7: "Table / She-Sleen", 8: "Floor",
};

const roll10 = (rng = Math.random) => Math.floor(rng() * 10);
const choose = (items, rng = Math.random) => items[Math.floor(rng() * items.length)];
const localDate = (value = new Date()) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function initialGame() {
  return {
    version: 1,
    configured: false,
    shiftKey: "shift1",
    scheduledStart: "19:30",
    enforceStartTime: false,
    day: 1,
    mode: "regular",
    elapsed: 0,
    dailyEarnings: 0,
    extraEarnings: 0,
    dailyExtraGross: 0,
    dailyExtraFees: 0,
    totalEarnings: 0,
    punishmentBalance: 0,
    pendingPunishments: [],
    punishmentMessages: [],
    extraPunishmentReasons: [],
    scheduleCheckedDate: null,
    lastCompletedDate: null,
    history: [],
    completedDays: [],
    currentService: null,
    releaseDay: null,
    notice: { kind: "info", text: "Choose a shift and begin a new run." },
  };
}

export function configureGame(game, shiftKey, scheduledStart, enforceStartTime = false) {
  return {
    ...initialGame(),
    configured: true,
    shiftKey,
    enforceStartTime,
    scheduledStart,
    notice: { kind: "success", text: `${SHIFTS[shiftKey].label} selected. Your run is ready.` },
  };
}

function taskFor(kind, value) {
  const lookup = kind === "oral" ? ORAL_TASKS : ANAL_TASKS;
  return { kind, roll: value, text: lookup[value] };
}

export function remainingTime(game) {
  return Math.max(0, SHIFTS[game.shiftKey].minutes - game.elapsed);
}

function schedulePenalties(game, now) {
  const today = localDate(now);
  if (game.scheduleCheckedDate === today) return { game, reasons: [] };
  const reasons = [];
  if (game.lastCompletedDate) {
    const last = new Date(`${game.lastCompletedDate}T12:00:00`);
    const yesterday = new Date(now);
    yesterday.setHours(12, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    if (last < yesterday) {
      reasons.push("Missed yesterday's shift (+2): roll 1 of 2");
      reasons.push("Missed yesterday's shift (+2): roll 2 of 2");
    }
  }
  const [hours, minutes] = game.scheduledStart.split(":").map(Number);
  const start = new Date(now);
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start.getTime() + START_GRACE_MINUTES * 60000);
  if (now < start || now > end) {
    reasons.push(`Started outside ${game.scheduledStart}–${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")} (+1)`);
  }
  return {
    game: {
      ...game,
      scheduleCheckedDate: today,
      extraPunishmentReasons: [...game.extraPunishmentReasons, ...reasons],
    },
    reasons,
  };
}

export function rollCustomer(game, rng = Math.random, now = new Date()) {
  if (!["regular", "extra"].includes(game.mode)) return game;
  if (game.mode === "regular" && game.enforceStartTime) {
    const today = localDate(now);
    if (game.lastCompletedDate === today) {
      return {
        ...game,
        notice: { kind: "danger", text: "SHIFT LOCKED · You already completed today's regular shift. Return tomorrow, or turn Time Lock off for testing." },
      };
    }
    const [hours, minutes] = game.scheduledStart.split(":").map(Number);
    const start = new Date(now);
    start.setHours(hours, minutes, 0, 0);
    if (now < start) {
      return {
        ...game,
        notice: { kind: "danger", text: `SHIFT LOCKED · You cannot start before ${game.scheduledStart}. Turn Time Lock off only for testing.` },
      };
    }
  }
  let next = game;
  let scheduleReasons = [];
  const todayHasRegular = game.history.some((item) => item.day === game.day && item.phase === "regular");
  if (game.mode === "regular" && !todayHasRegular) {
    ({ game: next, reasons: scheduleReasons } = schedulePenalties(game, now));
  }
  const remaining = remainingTime(next);
  const eligibleCustomers = Object.values(CUSTOMERS)
    .filter((customer) => customer.tasks.length * 5 <= remaining);
  if (!eligibleCustomers.length) {
    return { ...next, notice: { kind: "info", text: "Shift complete. Resolve the day to continue." } };
  }
  const customer = choose(eligibleCustomers, rng);
  const packageName = Object.entries(PACKAGES).find(([, codes]) => codes.includes(customer.code))?.[0];
  const rolls = {};
  for (const letter of "TUVWXYZ") rolls[letter] = roll10(rng);
  rolls.S = customer.code;
  const orderedRolls = { S: rolls.S, T: rolls.T, U: rolls.U, V: rolls.V, W: rolls.W, X: rolls.X, Y: rolls.Y, Z: rolls.Z };
  const size = [1, 2, 3].includes(rolls.T) ? "Small" : [4, 5, 6, 7].includes(rolls.T) ? "Medium" : "Large";
  const taskRolls = [rolls.V, rolls.W, rolls.X, rolls.Y];
  const tasks = customer.tasks.map((kind, index) => taskFor(kind, taskRolls[index]));
  const halfPay = roll10(rng) < 2;
  const money = customer.money * (halfPay ? 0.5 : 1);
  const serviceMinutes = customer.tasks.length * 5;
  const restRoll = 1 + Math.floor(rng() * 9);
  const restMinutes = restRoll >= 5 && serviceMinutes + 5 <= remaining ? 5 : 0;
  const result = {
    package: packageName,
    customerCode: customer.code,
    customer: customer.name,
    dildoSize: size,
    kink: KINKS[rolls.U],
    tasks,
    cumshot: customer.cumshot[rolls.Z],
    baseMoney: customer.money,
    money,
    halfPay,
    serviceMinutes,
    restRoll,
    restMinutes,
    totalMinutes: serviceMinutes + restMinutes,
    rolls: orderedRolls,
  };
  const record = { day: next.day, phase: next.mode, result };
  const earningsField = next.mode === "extra" ? "extraEarnings" : "dailyEarnings";
  const penaltyText = scheduleReasons.length ? ` ${scheduleReasons.length} schedule penalty roll(s) recorded.` : "";
  return {
    ...next,
    elapsed: next.elapsed + result.totalMinutes,
    [earningsField]: next[earningsField] + money,
    currentService: result,
    history: [...next.history, record],
    notice: {
      kind: halfPay ? "special" : "success",
      text: `${result.customer} completed · +$${money} · ${result.totalMinutes} min · ${remaining - result.totalMinutes} min left.${penaltyText}`,
    },
  };
}

function punishmentRolls(rng) {
  const top = roll10(rng);
  const count = top < 3 ? 2 : top < 7 ? 1 : 0;
  return Array.from({ length: count }, () => roll10(rng));
}

function resolvePosition(rng) {
  return 1 + Math.floor(rng() * 8);
}

function processPunishments(game, rng) {
  let balance = game.punishmentBalance;
  const pending = [...game.pendingPunishments];
  const messages = [...game.punishmentMessages];
  while (pending.length) {
    const roll = pending.shift();
    if (roll === 7) {
      balance *= 0.5;
      messages.push("Bad part of town: half of current earnings were stolen.");
    } else if (roll === 8) {
      balance = 0;
      messages.push("Robbery: all current earnings were lost.");
    } else if (roll === 0) {
      return {
        ...game,
        mode: "extra",
        elapsed: 0,
        extraEarnings: 0,
        punishmentBalance: balance,
        pendingPunishments: pending,
        punishmentMessages: messages,
        currentService: null,
        notice: { kind: "danger", text: "Extra-shift punishment assigned. Complete another full shift." },
      };
    } else {
      const punishment = NON_MONETARY_PUNISHMENTS[roll];
      let text = `Roll ${roll} · ${punishment.title}: ${punishment.instruction}`;
      if (roll === 4) {
        const position = resolvePosition(rng);
        text = `Roll 4 · ${punishment.title} · Position ${position}: ${POSITIONS[position]}. ${punishment.instruction}`;
      }
      messages.push(text);
    }
  }
  return completeDay({
    ...game,
    mode: "resolving",
    punishmentBalance: balance,
    pendingPunishments: [],
    punishmentMessages: messages,
  }, rng);
}

export function resolveDay(game, rng = Math.random, now = new Date()) {
  if (game.mode === "dayComplete") {
    return { ...game, mode: "regular", currentService: null, notice: { kind: "info", text: `Day ${game.day} ready.` } };
  }
  if (game.mode === "releaseReady") {
    return { ...game, mode: "release", notice: { kind: "special", text: "Release day started." } };
  }
  if (game.mode === "regular") {
    if (remainingTime(game) >= 10) return { ...game, notice: { kind: "info", text: "There is still time for another customer." } };
    const shift = SHIFTS[game.shiftKey];
    const reasons = [...game.extraPunishmentReasons];
    if (game.dailyEarnings < shift.dailyFee) {
      reasons.push(`Did not earn the $${shift.dailyFee} daily fee (+1)`);
    }
    const normal = punishmentRolls(rng);
    const extra = reasons.map(() => roll10(rng));
    return processPunishments({
      ...game,
      punishmentBalance: game.dailyEarnings,
      pendingPunishments: [...normal, ...extra],
      punishmentMessages: [
        `${normal.length} normal + ${extra.length} extra = ${normal.length + extra.length} punishment roll(s).`,
        ...reasons.map((reason) => `Extra punishment reason: ${reason}`),
      ],
      extraPunishmentReasons: reasons,
      notice: { kind: "danger", text: "Resolving end-of-day punishments…" },
    }, rng);
  }
  if (game.mode === "extra") {
    if (remainingTime(game) >= 10) return { ...game, notice: { kind: "info", text: "There is still time in the extra shift." } };
    const fee = SHIFTS[game.shiftKey].extraFee;
    return processPunishments({
      ...game,
      mode: "resolving",
      punishmentBalance: game.punishmentBalance + game.extraEarnings - fee,
      dailyExtraGross: game.dailyExtraGross + game.extraEarnings,
      dailyExtraFees: game.dailyExtraFees + fee,
      punishmentMessages: [...game.punishmentMessages, `Extra shift earned $${game.extraEarnings}; $${fee} fee deducted.`],
      extraEarnings: 0,
      elapsed: 0,
    }, rng);
  }
  return game;
}

function releaseRoll(rng) {
  const rolls = {};
  for (const letter of "RSTUVWXYZ") rolls[letter] = roll10(rng);
  const kinds = ["oral", "anal", "anal", "oral", "oral", "anal", "anal", "oral"];
  return {
    customer: "Pimp's associate",
    dildoSize: "Large",
    kink: "None",
    rolls,
    tasks: kinds.map((kind, index) => taskFor(kind, rolls["RSTUVWXY"[index]])),
    cumshot: CHEST_MOUTH_FACE[rolls.Z],
  };
}

function completeDay(game, rng) {
  const shift = SHIFTS[game.shiftKey];
  const gross = game.dailyEarnings + game.dailyExtraGross;
  const net = game.punishmentBalance - shift.dailyFee;
  const totalEarnings = game.totalEarnings + net;
  const summary = {
    day: game.day,
    gross,
    regularGross: game.dailyEarnings,
    extraGross: game.dailyExtraGross,
    extraFees: game.dailyExtraFees,
    afterPunishment: game.punishmentBalance,
    dailyFee: shift.dailyFee,
    net,
    events: game.punishmentMessages.length ? game.punishmentMessages : ["No punishment today."],
    completedDate: localDate(),
  };
  const debtPaid = totalEarnings >= DEBT_TARGET;
  return {
    ...game,
    day: game.day + 1,
    mode: debtPaid ? "releaseReady" : "dayComplete",
    elapsed: 0,
    dailyEarnings: 0,
    extraEarnings: 0,
    dailyExtraGross: 0,
    dailyExtraFees: 0,
    totalEarnings,
    punishmentBalance: 0,
    pendingPunishments: [],
    punishmentMessages: [],
    extraPunishmentReasons: [],
    scheduleCheckedDate: null,
    lastCompletedDate: localDate(),
    completedDays: [...game.completedDays, summary],
    currentService: null,
    releaseDay: debtPaid ? releaseRoll(rng) : game.releaseDay,
    notice: {
      kind: debtPaid ? "success" : net >= 0 ? "success" : "danger",
      text: debtPaid ? "Debt paid. Review the final day before release day." : `Day ${summary.day} complete · Gross $${gross} · Net $${net}`,
    },
  };
}

export function financialStats(game) {
  const totalServices = game.history.length;
  const taskMinutes = game.history.reduce((sum, item) => sum + item.result.serviceMinutes, 0);
  const restMinutes = game.history.reduce((sum, item) => sum + item.result.restMinutes, 0);
  const halfPay = game.history.filter((item) => item.result.halfPay).length;
  const totalGross = game.completedDays.reduce((sum, day) => sum + day.gross, 0);
  const dailyFees = game.completedDays.reduce((sum, day) => sum + day.dailyFee, 0);
  const extraFees = game.completedDays.reduce((sum, day) => sum + day.extraFees, 0);
  const punishmentLoss = game.completedDays.reduce(
    (sum, day) => sum + Math.max(0, day.gross - day.extraFees - day.afterPunishment), 0,
  );
  const events = game.completedDays.flatMap((day) => day.events);
  const count = (prefix) => events.filter((event) => event.startsWith(prefix)).length;
  return {
    totalServices, taskMinutes, restMinutes, halfPay,
    fullPay: totalServices - halfPay, totalGross, dailyFees, extraFees, punishmentLoss,
    halfLosses: count("Bad part of town"), robberies: count("Robbery"),
    extraShifts: count("Extra shift earned"), nonMonetary: count("Roll "),
  };
}

export function validateSave(value) {
  return Boolean(value && value.version === 1 && SHIFTS[value.shiftKey] && Array.isArray(value.history) && Array.isArray(value.completedDays));
}
