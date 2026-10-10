import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { properties, money } from "../data/properties";

// Listings: the property grid with button filters (type + price band).
const types = ["All", "House", "Apartment", "Villa", "Studio"];

function Listings() {
  const [type, setType] = useState("All");

  const shown = properties.filter((p) => type === "All" || p.type === type);

  return (
    <section id="listings" className="listings">
      <div className="container">
        <Reveal>
          <span className="eyebrow" style={{ textAlign: "center", display: "block" }}>Our Listings</span>
          <h2 className="section-title">Featured <em>Properties</em></h2>
          <p className="section-subtitle">Handpicked homes across the city's best neighborhoods.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="filters">
            {types.map((t) => (
              <button key={t} className={type === t ? "active" : ""} onClick={() => setType(t)}>{t}</button>
            ))}
          </div>
        </Reveal>

        <div className="prop-grid">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                key={p.id}
                className="prop-card"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <div className="prop-img" style={{ backgroundImage: `url(${p.img})` }}>
                  <span className="prop-type">{p.type}</span>
                </div>
                <div className="prop-body">
                  <h3>{p.title}</h3>
                  <div className="prop-city">📍 {p.city}</div>
                  <div className="prop-specs">
                    <span>{p.beds} Beds</span>
                    <span>{p.baths} Baths</span>
                    <span>{p.area.toLocaleString()} sqft</span>
                  </div>
                  <div className="prop-price">{money(p.price)}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Listings;
