import { useEffect, useMemo, useRef, useState } from "react";
import {
  DEBT_TARGET,
  SHIFTS,
  configureGame,
  financialStats,
  initialGame,
  remainingTime,
  resolveDay,
  rollCustomer,
  validateSave,
} from "./game.js";

const SAVE_KEY = "service-roulette-react-save-v1";

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);
}

function loadAutosave() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SAVE_KEY));
    return validateSave(parsed) ? parsed : initialGame();
  } catch {
    return initialGame();
  }
}

function Progress({ label, value, detail, tone = "pink" }) {
  return (
    <div className="progress-group">
      <div className="progress-copy"><span>{label}</span><strong>{detail}</strong></div>
      <div className="progress-track"><span className={`progress-fill ${tone}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>
    </div>
  );
}

function Setup({ onStart }) {
  const [shiftKey, setShiftKey] = useState("shift1");
  const [start, setStart] = useState("19:30");
  const [timeLock, setTimeLock] = useState(false);
  return (
    <main className="setup-shell">
      <section className="setup-panel">
        <div className="eyebrow">NEW RUN</div>
        <h1>Choose your shift</h1>
        <p>Your selection fixes the time limit and fees for the entire run.</p>
        <div className="shift-grid">
          {Object.entries(SHIFTS).map(([key, shift]) => (
            <button key={key} className={`shift-choice ${shiftKey === key ? "selected" : ""}`} onClick={() => setShiftKey(key)}>
              <strong>{shift.label}</strong>
              <span>{shift.minutes} minutes</span>
              <small>Daily fee {money(shift.dailyFee)} · Extra fee {money(shift.extraFee)}</small>
            </button>
          ))}
        </div>
        <label className="time-field">
          <span>Planned daily start</span>
          <input type="time" value={start} onChange={(event) => setStart(event.target.value)} />
          <small>You have a five-minute grace period.</small>
        </label>
        <label className="mini-toggle setup-toggle"><input type="checkbox" checked={timeLock} onChange={(event) => setTimeLock(event.target.checked)} /><span className="toggle-track"><i /></span><b>Time Lock</b><small>Block early and same-day regular shifts</small></label>
        <button className="primary-action" onClick={() => onStart(shiftKey, start, timeLock)}>START THE RUN →</button>
      </section>
    </main>
  );
}

function StatCard({ label, value, tone }) {
  return <div className="stat-card"><span>{label}</span><strong className={tone || ""}>{value}</strong></div>;
}

function Notification({ notice }) {
  return <div className={`notification ${notice.kind}`} role="status">{notice.text}</div>;
}

function ServiceCard({ service, mode }) {
  if (!service) {
    return (
      <div className="empty-service">
        <span className="roulette-ring">S–Z</span>
        <h2>Ready for the first customer</h2>
        <p>The game will roll every instruction automatically.</p>
      </div>
    );
  }
  return (
    <div className="service-content">
      <div className="service-heading">
        <div><span className="eyebrow">{mode === "extra" ? "EXTRA SHIFT" : `PACKAGE ${service.package}`}</span><h2>{service.customer}</h2></div>
        <div className="payment"><span>{service.halfPay ? "HALF PAY" : "FULL PAY"}</span><strong>{money(service.money)}</strong></div>
      </div>
      <div className="dice-row">{Object.entries(service.rolls).map(([key, value]) => <span key={key}>{key}<b>{value}</b></span>)}</div>
      <div className="prep-line"><span>PREPARATION</span><strong>{service.dildoSize} dildo · {service.kink}</strong></div>
      <div className="task-grid">
        {service.tasks.map((task, index) => (
          <article className="task-card" key={`${task.kind}-${index}`}>
            <span>TASK {index + 1} · {task.kind.toUpperCase()} #{task.roll}</span>
            <p>{task.text}</p>
          </article>
        ))}
      </div>
      <div className="outcome-grid">
        <div><span>FINAL OUTCOME</span><strong>{service.cumshot}</strong></div>
        <div><span>REST</span><strong>{service.restMinutes ? `5 minutes · roll ${service.restRoll}` : `No rest · roll ${service.restRoll}`}</strong></div>
      </div>
    </div>
  );
}

function History({ items }) {
  return (
    <aside className="history-panel">
      <div className="panel-title"><span>SHIFT LOG</span><strong>{items.length} customers</strong></div>
      <div className="history-list">
        {[...items].reverse().map((item, index) => (
          <div className="history-row" key={`${item.day}-${item.result.customer}-${items.length - index}`}>
            <span className="history-day">D{item.day}</span>
            <div><strong>{item.result.customer}</strong><small>{item.phase === "extra" ? "Extra shift" : "Main shift"} · {item.result.totalMinutes} min</small></div>
            <b>{money(item.result.money)}</b>
          </div>
        ))}
        {!items.length && <p className="muted">Completed customers will appear here.</p>}
      </div>
    </aside>
  );
}

function DayOverview({ game, onContinue, onReport, final }) {
  const day = game.completedDays.at(-1);
  const punishmentLoss = Math.max(0, day.gross - day.extraFees - day.afterPunishment);
  const fees = day.dailyFee + day.extraFees;
  const punishmentCount = Number(day.events[0]?.match(/= (\d+) punishment roll/)?.[1] || 0);
  const visibleEvents = day.events.filter((event) => !event.includes(" punishment roll(s)."));
  const eventClass = (event) => event.startsWith("Extra punishment reason") ? "reason" : event.startsWith("Robbery") || event.startsWith("Bad part of town") ? "monetary" : event.startsWith("Extra shift") ? "extra-shift" : "non-monetary";
  const eventLabel = (event) => event.startsWith("Extra punishment reason") ? "EXTRA TRIGGER" : event.startsWith("Robbery") || event.startsWith("Bad part of town") ? "MONETARY" : event.startsWith("Extra shift") ? "EXTRA SHIFT" : "PUNISHMENT";
  return (
    <div className="overview-screen">
      <div className="summary-tabs"><button className="active">{final ? "Final day overview" : `Day ${day.day} overview`}</button>{final && <button disabled>Release day</button>}<button className="report-link" onClick={onReport}>View full report</button></div>
      <section className="day-breakdown">
        <h2>Day {day.day} completed{final ? " — debt paid" : ""}</h2>
        <p>{final ? "The debt is paid. Review the final day before beginning the separate release-day sequence." : `Day ${game.day} has not started yet.`}</p>
        <section className="punishment-spotlight">
          <header><div><span className="eyebrow">PUNISHMENT RESULTS</span><h3>{punishmentCount ? `${punishmentCount} punishment roll${punishmentCount === 1 ? "" : "s"}` : "No punishment rolls"}</h3></div><strong>{punishmentLoss ? `−${money(punishmentLoss)} lost` : "No monetary loss"}</strong></header>
          <div className="punishment-events">{visibleEvents.length ? visibleEvents.map((event, index) => <article className={eventClass(event)} key={index}><span>{eventLabel(event)}</span><p>{event.replace("Extra punishment reason: ", "")}</p></article>) : <p className="no-punishment">No punishment outcome was applied today.</p>}</div>
        </section>
        <dl>
          <div><dt>Gross earnings</dt><dd>{money(day.gross)}</dd></div>
          <div><dt>Punishment loss</dt><dd className="red">−{money(punishmentLoss)}</dd></div>
          <div><dt>Daily and extra-shift fees</dt><dd className="red">−{money(fees)}</dd></div>
          <div><dt>Net for Day {day.day}</dt><dd className={day.net >= 0 ? "green" : "red"}>{money(day.net)}</dd></div>
        </dl>
        <button className="primary-action" onClick={onContinue}>{final ? "READY FOR RELEASE DAY →" : `START DAY ${game.day} →`}</button>
      </section>
    </div>
  );
}

function ReleaseDay({ game, onOverview, onReport }) {
  const release = game.releaseDay;
  return (
    <div className="overview-screen">
      <div className="summary-tabs"><button onClick={onOverview}>Final day overview</button><button className="active">Release day</button><button className="report-link" onClick={onReport}>View full report</button></div>
      <section className="release-panel">
        <div className="release-title"><div><span className="eyebrow">FINAL STAGE</span><h1>Pimp's associate</h1><p>Large dildo · No kink · Separate from final-day earnings</p></div><div className="release-dice">{Object.entries(release.rolls).map(([key, value]) => <span key={key}>{key}<b>{value}</b></span>)}</div></div>
        <div className="release-tasks">{release.tasks.map((task, index) => <article key={index}><span>TASK {index + 1} · {task.kind.toUpperCase()} #{task.roll}</span><p>{task.text}</p></article>)}</div>
        <div className="release-outcome"><span>FINAL OUTCOME</span><strong>{release.cumshot}</strong></div>
      </section>
    </div>
  );
}

function MoneyChart({ days }) {
  if (!days.length) return null;
  const width = 900, height = 360, left = 62, right = 838, top = 34, bottom = 298;
  let running = 0;
  const values = days.map((day) => {
    running += day.net;
    return { ...day, cumulative: running, loss: Math.max(0, day.gross - day.extraFees - day.afterPunishment), fees: day.dailyFee + day.extraFees };
  });
  const dailyMin = Math.min(0, ...values.flatMap((day) => [day.net, day.gross - day.loss - day.fees]));
  const dailyMax = Math.max(1, ...values.map((day) => day.gross));
  const dailyRange = Math.max(1, dailyMax - dailyMin);
  const cumulativeMin = Math.min(0, ...values.map((day) => day.cumulative));
  const cumulativeMax = Math.max(DEBT_TARGET, ...values.map((day) => day.cumulative), 1);
  const cumulativeRange = Math.max(1, cumulativeMax - cumulativeMin);
  const yDaily = (value) => bottom - (value - dailyMin) / dailyRange * (bottom - top);
  const yCumulative = (value) => bottom - (value - cumulativeMin) / cumulativeRange * (bottom - top);
  const dailyTicks = Array.from({ length: 4 }, (_, index) => dailyMin + dailyRange * index / 3);
  const cumulativeTicks = Array.from({ length: 4 }, (_, index) => cumulativeMin + cumulativeRange * index / 3);
  const slot = (right - left) / values.length;
  const barGap = 3;
  const barWidth = Math.min(18, Math.max(7, (slot * 0.68 - barGap * 3) / 4));
  const barOffsets = [-1.5, -.5, .5, 1.5].map((step) => step * (barWidth + barGap));
  const cumulativePoints = values.map((day, index) => `${left + slot * (index + .5)},${yCumulative(day.cumulative)}`).join(" ");
  return (
    <div className="chart-wrap">
      <div className="chart-title"><div><h2>Where the money went</h2><p>Daily waterfall · one scale · zero line always visible</p></div><div className="legend"><span className="gross">Gross</span><span className="loss">Punishment loss</span><span className="fees">Fees</span><span className="net">Daily net</span></div></div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Daily money waterfall and cumulative net earnings line">
        <text x={left} y={18} className="axis-heading">Daily money flow</text>
        {dailyTicks.map((value) => <g key={`daily-${value}`}><line x1={left} x2={right} y1={yDaily(value)} y2={yDaily(value)} className="grid-line"/><text x={left - 9} y={yDaily(value) + 5} textAnchor="end">${Math.round(value)}</text></g>)}
        <line x1={left} x2={right} y1={yDaily(0)} y2={yDaily(0)} className="zero-line" />
        {values.map((day, index) => {
          const x = left + slot * (index + .5);
          const afterLoss = day.gross - day.loss;
          const stages = [
            { label: "Gross", from: 0, to: day.gross, className: "bar-gross" },
            { label: "Punishment loss", from: day.gross, to: afterLoss, className: "bar-loss" },
            { label: "Fees", from: afterLoss, to: day.net, className: "bar-fees" },
            { label: "Daily net", from: 0, to: day.net, className: day.net < 0 ? "bar-negative" : "bar-net" },
          ];
          return <g key={day.day}>{stages.map((stage, stageIndex) => {
            const fromY = yDaily(stage.from), toY = yDaily(stage.to);
            return <rect key={stage.label} x={x + barOffsets[stageIndex] - barWidth / 2} y={Math.min(fromY, toY)} width={barWidth} height={Math.max(1, Math.abs(fromY - toY))} className={stage.className}><title>{`${stage.label}: $${Math.round(stage.to - stage.from)}`}</title></rect>;
          })}{stages.slice(0, -1).map((stage, stageIndex) => <line key={`connector-${stage.label}`} x1={x + barOffsets[stageIndex] + barWidth / 2} x2={x + barOffsets[stageIndex + 1] - barWidth / 2} y1={yDaily(stage.to)} y2={yDaily(stage.to)} className="waterfall-connector" />)}<text x={x} y={bottom + 21} textAnchor="middle">D{day.day}</text></g>;
        })}
        <text x={left} y={bottom + 47} className="waterfall-note">Gross → punishment loss → fee → net</text>
      </svg>
      <section className="cumulative-chart">
        <div className="chart-title"><div><h2>Run progress</h2><p>Cumulative net earnings across every completed day</p></div><div className="legend"><span className="cumulative">Cumulative net</span></div></div>
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Cumulative net earnings by day">
          {cumulativeTicks.map((value) => <g key={value}><line x1={left} x2={right} y1={yCumulative(value)} y2={yCumulative(value)} className="grid-line"/><text x={left - 9} y={yCumulative(value) + 5} textAnchor="end">${Math.round(value)}</text></g>)}
          <line x1={left} x2={right} y1={yCumulative(0)} y2={yCumulative(0)} className="zero-line" />
          <path d={`${cumulativePoints} L ${left + slot * (values.length - .5)},${bottom} L ${left + slot * .5},${bottom} Z`} className="cumulative-area" />
          <polyline points={cumulativePoints} className="cumulative-line" />
          {values.map((day, index) => <g key={day.day}><circle cx={left + slot * (index + .5)} cy={yCumulative(day.cumulative)} r="5" className="cumulative-dot"><title>{`Cumulative net: $${Math.round(day.cumulative)}`}</title></circle><text x={left + slot * (index + .5)} y={bottom + 21} textAnchor="middle">D{day.day}</text></g>)}
        </svg>
      </section>
    </div>
  );
}

function Report({ game, onClose }) {
  const stats = financialStats(game);
  const customerCounts = game.history.reduce((counts, item) => ({ ...counts, [item.result.customer]: (counts[item.result.customer] || 0) + 1 }), {});
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Run report">
      <div className="report-modal">
        <header><div><span className="eyebrow">FULL STATISTICS</span><h1>Run report</h1></div><button className="close-button" onClick={onClose}>Close</button></header>
        <MoneyChart days={game.completedDays} />
        <div className="report-grid">
          <section><h3>Earnings</h3><p>Total gross <b>{money(stats.totalGross)}</b></p><p>Daily fees <b>−{money(stats.dailyFees)}</b></p><p>Extra fees <b>−{money(stats.extraFees)}</b></p><p>Punishment loss <b>−{money(stats.punishmentLoss)}</b></p><p>Final net <b className="green">{money(game.totalEarnings)}</b></p></section>
          <section><h3>Services & time</h3><p>Customers <b>{stats.totalServices}</b></p><p>Full pay <b>{stats.fullPay}</b></p><p>Half pay <b>{stats.halfPay}</b></p><p>Task time <b>{stats.taskMinutes} min</b></p><p>Rest time <b>{stats.restMinutes} min</b></p></section>
          <section><h3>Punishments</h3><p>Half-loss <b>{stats.halfLosses}</b></p><p>Robberies <b>{stats.robberies}</b></p><p>Extra shifts <b>{stats.extraShifts}</b></p><p>Non-monetary <b>{stats.nonMonetary}</b></p></section>
          <section><h3>Customers</h3>{Object.entries(customerCounts).sort((a,b)=>b[1]-a[1]).map(([name,count])=><p key={name}>{name} <b>{count}</b></p>)}</section>
        </div>
        <section className="daily-results"><h3>Day-by-day results</h3>{game.completedDays.map((day)=><div key={day.day}><strong>Day {day.day}</strong><span>Gross {money(day.gross)}</span><span>Fees −{money(day.dailyFee+day.extraFees)}</span><span>Net {money(day.net)}</span></div>)}</section>
      </div>
    </div>
  );
}

export default function App() {
  const [game, setGame] = useState(loadAutosave);
  const [reportOpen, setReportOpen] = useState(false);
  const [summaryTab, setSummaryTab] = useState("overview");
  const importRef = useRef(null);
  const shift = SHIFTS[game.shiftKey];
  const timeLeft = game.configured ? remainingTime(game) : 0;
  const debtLeft = Math.max(0, DEBT_TARGET - game.totalEarnings);

  useEffect(() => { localStorage.setItem(SAVE_KEY, JSON.stringify(game)); }, [game]);
  useEffect(() => { if (game.mode === "releaseReady") setSummaryTab("overview"); if (game.mode === "release") setSummaryTab("release"); }, [game.mode]);

  const exportSave = () => {
    const blob = new Blob([JSON.stringify(game, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "service-roulette-save.json"; anchor.click(); URL.revokeObjectURL(url);
  };
  const importSave = async (event) => {
    const file = event.target.files?.[0]; if (!file) return;
    try { const parsed = JSON.parse(await file.text()); if (!validateSave(parsed)) throw new Error(); setGame(parsed); }
    catch { alert("That file is not a valid Service Roulette save."); }
    event.target.value = "";
  };
  const reset = () => { if (confirm("Start a new run? Export your current save first if you want to keep it.")) { localStorage.removeItem(SAVE_KEY); setGame(initialGame()); setReportOpen(false); } };

  if (!game.configured) return <Setup onStart={(key, start, timeLock) => setGame(configureGame(game, key, start, timeLock))} />;

  const isSummary = ["dayComplete", "releaseReady", "release"].includes(game.mode);
  const final = ["releaseReady", "release"].includes(game.mode);
  const latestDay = game.completedDays.at(-1);
  return (
    <div className="app-shell">
      <header className="app-header"><div className="brand">SERVICE <span>ROULETTE</span><small>{shift.label} · {shift.minutes} min</small></div><nav><label className="mini-toggle"><input type="checkbox" checked={Boolean(game.enforceStartTime)} onChange={(event) => setGame({ ...game, enforceStartTime: event.target.checked, notice: { kind: "info", text: `Time Lock ${event.target.checked ? "enabled" : "disabled"}.` } })} /><span className="toggle-track"><i /></span><b>Time Lock</b></label><button onClick={exportSave}>Export save</button><button onClick={() => importRef.current?.click()}>Import save</button><button onClick={reset}>New run</button><input ref={importRef} type="file" accept="application/json" hidden onChange={importSave}/></nav></header>

      {isSummary ? (
        game.mode === "release" && summaryTab === "release" ?
          <ReleaseDay game={game} onOverview={() => setSummaryTab("overview")} onReport={() => setReportOpen(true)} /> :
          <DayOverview game={game} final={final} onReport={() => setReportOpen(true)} onContinue={() => setGame(resolveDay(game))} />
      ) : (
        <main className="game-shell">
          <Notification notice={game.notice} />
          <div className="stats-row"><StatCard label="DAY" value={game.day}/><StatCard label="TIME LEFT" value={`${timeLeft} min`}/><StatCard label="DAY GROSS" value={money(game.mode === "extra" ? game.extraEarnings : game.dailyEarnings)} tone="green"/><StatCard label="RUN TOTAL" value={money(game.totalEarnings)} tone="green"/><StatCard label="DEBT LEFT" value={money(debtLeft)} tone="pink"/></div>
          <div className="progress-row"><Progress label="SHIFT PROGRESS" value={game.elapsed/shift.minutes*100} detail={`${game.elapsed} / ${shift.minutes} min`} tone="purple"/><Progress label="DEBT PROGRESS" value={game.totalEarnings/DEBT_TARGET*100} detail={`${Math.max(0, game.totalEarnings/DEBT_TARGET*100).toFixed(0)}% paid`} /></div>
          <div className="play-grid"><section className="service-panel"><ServiceCard service={game.currentService} mode={game.mode}/><div className="game-actions"><button className="primary-action" disabled={timeLeft < 10} onClick={() => setGame(rollCustomer(game))}>{game.mode === "extra" ? "ROLL EXTRA CUSTOMER" : "ROLL CUSTOMER"}</button><button className="secondary-action" disabled={timeLeft >= 10} onClick={() => setGame(resolveDay(game))}>{game.mode === "extra" ? "FINISH EXTRA SHIFT" : "RESOLVE DAY"}</button></div></section><History items={game.history}/></div>
        </main>
      )}
      {reportOpen && <Report game={game} onClose={() => setReportOpen(false)} />}
    </div>
  );
}
