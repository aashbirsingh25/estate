import { useState, useRef, useEffect } from "react";
import { House } from "lucide-react";
import Reveal from "./Reveal";
import { findHomes } from "../data/finder";
import { money } from "../data/properties";

// Finder: the AI property finder. You type what you want in plain English,
// it parses it (via findHomes), replies, and shows matching property cards
// right inside the chat.
function Finder() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Tell me what you're after in your own words — e.g. \"2 bedroom under $400k downtown\" — and I'll pull up matching listings." },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  function send(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const { matches, summary } = findHomes(trimmed);
    setMessages((m) => [
      ...m,
      { from: "user", text: trimmed },
      { from: "bot", text: summary, results: matches.slice(0, 4) },
    ]);
    setInput("");
  }

  const chips = ["2 bed under $400k", "Villa in Lakeview", "Affordable studio", "4 bedroom house"];

  return (
    <section id="finder" className="finder">
      <div className="container">
        <Reveal>
          <span className="eyebrow">AI Finder</span>
          <h2 className="section-title">Just tell us what you <em>want</em></h2>
          <p className="section-subtitle">
            No endless scrolling. Describe your ideal home and let the AI do the searching.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="finder-box">
            <div className="finder-head">
              <div className="finder-avatar">
                <House size={24} strokeWidth={2} />
              </div>
              <div>
                <div className="fh-name">Property Finder</div>
              </div>
            </div>

            <div className="finder-body" ref={bodyRef}>
              {messages.map((m, i) => (
                <div key={i}>
                  <div className={`fmsg ${m.from}`}>
                    <div className="bubble">{m.text}</div>
                  </div>
                  {m.results && m.results.length > 0 && (
                    <div className="fresults">
                      {m.results.map((p) => (
                        <div className="fcard" key={p.id}>
                          <div className="fcard-img" style={{ backgroundImage: `url(${p.img})` }} />
                          <div className="fcard-body">
                            <h4>{p.title}</h4>
                            <div className="fc-meta">{p.beds} bd · {p.baths} ba · {p.city}</div>
                            <div className="fc-price">{money(p.price)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="finder-chips">
              {chips.map((c, i) => <button key={i} onClick={() => send(c)}>{c}</button>)}
            </div>

            <form className="finder-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Describe your ideal home..." />
              <button type="submit" aria-label="Search">➤</button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Finder;
