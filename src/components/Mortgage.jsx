import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

// Mortgage: a live payment calculator. Drag the sliders and the monthly
// payment, total interest, and the principal-vs-interest breakdown bar all
// recompute in real time. Pure client-side math — standard amortization
// formula, no backend.

const fmt = (n) =>
  "$" + Math.round(n).toLocaleString(undefined, { maximumFractionDigits: 0 });

function Slider({ label, value, min, max, step, onChange, display }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mg-slider">
      <div className="mg-slider-top">
        <span>{label}</span>
        <strong>{display}</strong>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--pct": `${pct}%` }}
      />
    </div>
  );
}

function Mortgage() {
  const [price, setPrice] = useState(450000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const { monthly, principal, totalInterest, totalPaid } = useMemo(() => {
    const down = price * (downPct / 100);
    const loan = price - down;
    const r = rate / 100 / 12;
    const n = years * 12;
    const m = r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
    const paid = m * n;
    return {
      monthly: m,
      principal: loan,
      totalInterest: paid - loan,
      totalPaid: paid,
    };
  }, [price, downPct, rate, years]);

  const principalShare =
    totalPaid > 0 ? (principal / totalPaid) * 100 : 0;

  return (
    <section id="mortgage" className="mortgage">
      <div className="container">
        <Reveal>
          <span className="eyebrow" style={{ textAlign: "center", display: "block" }}>
            Plan Your Budget
          </span>
          <h2 className="section-title">Mortgage <em>calculator</em></h2>
          <p className="section-subtitle">
            Move the sliders to see your estimated monthly payment update instantly.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mg-grid">
            {/* controls */}
            <div className="mg-controls">
              <Slider
                label="Home price"
                value={price}
                min={100000}
                max={2000000}
                step={5000}
                onChange={setPrice}
                display={fmt(price)}
              />
              <Slider
                label="Down payment"
                value={downPct}
                min={0}
                max={50}
                step={1}
                onChange={setDownPct}
                display={`${downPct}% · ${fmt(price * (downPct / 100))}`}
              />
              <Slider
                label="Interest rate"
                value={rate}
                min={1}
                max={12}
                step={0.1}
                onChange={setRate}
                display={`${rate.toFixed(1)}%`}
              />
              <Slider
                label="Loan term"
                value={years}
                min={5}
                max={30}
                step={5}
                onChange={setYears}
                display={`${years} years`}
              />
            </div>

            {/* result */}
            <div className="mg-result">
              <div className="mg-monthly-label">Estimated monthly payment</div>
              <motion.div
                className="mg-monthly"
                key={Math.round(monthly)}
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {fmt(monthly)}
                <span>/mo</span>
              </motion.div>

              <div className="mg-bar">
                <motion.div
                  className="mg-bar-principal"
                  animate={{ width: `${principalShare}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <div className="mg-legend">
                <span>
                  <i className="dot principal" /> Principal {fmt(principal)}
                </span>
                <span>
                  <i className="dot interest" /> Interest {fmt(totalInterest)}
                </span>
              </div>

              <div className="mg-totals">
                <div>
                  <span>Loan amount</span>
                  <strong>{fmt(principal)}</strong>
                </div>
                <div>
                  <span>Total interest</span>
                  <strong>{fmt(totalInterest)}</strong>
                </div>
                <div>
                  <span>Total paid</span>
                  <strong>{fmt(totalPaid)}</strong>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Mortgage;
