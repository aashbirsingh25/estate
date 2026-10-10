import { useState, useRef, useEffect } from "react";
import Reveal from "./Reveal";

// Stats: counts each number up from 0 when the band scrolls into view
// (IntersectionObserver + requestAnimationFrame). Numbers are expressed as a
// target value plus optional prefix/suffix so "1,200+", "98%" etc. animate.
const stats = [
  { to: 1200, suffix: "+", label: "Homes sold" },
  { to: 15, suffix: "", label: "Years in business" },
  { to: 98, suffix: "%", label: "Happy clients" },
  { to: 40, suffix: "+", label: "Expert agents" },
];

function useCountUp(target, run, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
}

function Stat({ to, suffix, label, run }) {
  const val = useCountUp(to, run);
  return (
    <div className="stat">
      <div className="num">
        {val.toLocaleString()}
        {suffix}
      </div>
      <div className="label">{label}</div>
    </div>
  );
}

function Stats() {
  const [run, setRun] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref}>
      <div className="container">
        <Reveal>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <Stat key={i} {...s} run={run} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Stats;
