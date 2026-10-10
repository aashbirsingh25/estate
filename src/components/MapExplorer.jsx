import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { properties, money, moneyShort } from "../data/properties";

// MapExplorer: the signature interactive element. A stylized city map with a
// price pin for every listing, two-way linked to a side list — hovering a pin
// highlights its card and vice-versa, and clicking selects a property that
// stays open in the detail panel. Filtering by neighborhood dims the rest.
// Self-contained (inline SVG + CSS), so there's no map API key or network map
// tiles — it builds and runs fully offline.

const cities = ["All", "Downtown", "Westfield", "Riverside", "Lakeview"];

function MapExplorer() {
  const [city, setCity] = useState("All");
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const visible = useMemo(
    () => properties.filter((p) => city === "All" || p.city === city),
    [city]
  );

  const active = properties.find((p) => p.id === selected) || null;

  function isDimmed(p) {
    return city !== "All" && p.city !== city;
  }

  return (
    <section id="map" className="mapx">
      <div className="container">
        <Reveal>
          <span className="eyebrow" style={{ textAlign: "center", display: "block" }}>
            Explore the Map
          </span>
          <h2 className="section-title">Find homes <em>by neighborhood</em></h2>
          <p className="section-subtitle">
            Hover a pin to preview, click to pin it open. Filter by area to focus the map.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mapx-filters">
            {cities.map((c) => (
              <button
                key={c}
                className={city === c ? "active" : ""}
                onClick={() => setCity(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mapx-grid">
            {/* ---- Map panel ---- */}
            <div className="mapx-map">
              <svg
                className="mapx-canvas"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                {/* water body (Lakeview corner) */}
                <path d="M0 70 Q 22 60 30 78 Q 38 96 0 100 Z" className="mx-water" />
                {/* river winding through */}
                <path
                  d="M70 0 Q 64 30 78 48 Q 90 64 72 100"
                  className="mx-river"
                  fill="none"
                />
                {/* park blocks */}
                <rect x="40" y="18" width="16" height="12" rx="2" className="mx-park" />
                <rect x="12" y="54" width="14" height="10" rx="2" className="mx-park" />
                {/* road grid */}
                {[20, 40, 60, 80].map((v) => (
                  <line key={"h" + v} x1="0" y1={v} x2="100" y2={v} className="mx-road" />
                ))}
                {[20, 40, 60, 80].map((v) => (
                  <line key={"v" + v} x1={v} y1="0" x2={v} y2="100" className="mx-road" />
                ))}
              </svg>

              {/* pins */}
              {properties.map((p) => {
                const on = hovered === p.id || selected === p.id;
                return (
                  <button
                    key={p.id}
                    className={`mx-pin ${on ? "on" : ""} ${isDimmed(p) ? "dim" : ""}`}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    onMouseEnter={() => setHovered(p.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected(p.id === selected ? null : p.id)}
                    aria-label={`${p.title}, ${moneyShort(p.price)}`}
                  >
                    <span className="mx-pin-price">{moneyShort(p.price)}</span>
                    <span className="mx-pin-dot" />
                  </button>
                );
              })}

              {/* floating detail card for the selected property */}
              <AnimatePresence>
                {active && (
                  <motion.div
                    className="mx-detail"
                    key={active.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className="mx-detail-img"
                      style={{ backgroundImage: `url(${active.img})` }}
                    />
                    <div className="mx-detail-body">
                      <h4>{active.title}</h4>
                      <div className="mx-detail-meta">
                        {active.beds} bd · {active.baths} ba · {active.area.toLocaleString()} sqft
                      </div>
                      <div className="mx-detail-price">{money(active.price)}</div>
                    </div>
                    <button className="mx-detail-close" onClick={() => setSelected(null)}>
                      ×
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ---- Linked list ---- */}
            <div className="mapx-list">
              <div className="mapx-list-head">
                {visible.length} {visible.length === 1 ? "home" : "homes"}
                {city !== "All" ? ` in ${city}` : ""}
              </div>
              <AnimatePresence mode="popLayout">
                {visible.map((p) => (
                  <motion.button
                    layout
                    key={p.id}
                    className={`mapx-row ${
                      hovered === p.id || selected === p.id ? "on" : ""
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onMouseEnter={() => setHovered(p.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected(p.id === selected ? null : p.id)}
                  >
                    <span
                      className="mapx-row-img"
                      style={{ backgroundImage: `url(${p.img})` }}
                    />
                    <span className="mapx-row-info">
                      <span className="mapx-row-title">{p.title}</span>
                      <span className="mapx-row-meta">
                        {p.beds} bd · {p.baths} ba · {p.city}
                      </span>
                    </span>
                    <span className="mapx-row-price">{moneyShort(p.price)}</span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default MapExplorer;
