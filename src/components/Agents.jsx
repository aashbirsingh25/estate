import Reveal from "./Reveal";

const agents = [
  { name: "Jonathan Reed", role: "Principal Broker", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
  { name: "Priya Nair", role: "Senior Sales Associate", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
  { name: "Michael Donovan", role: "Luxury Property Specialist", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
];

function Agents() {
  return (
    <section id="agents" className="agents">
      <div className="container">
        <Reveal>
          <span className="eyebrow" style={{ textAlign: "center", display: "block" }}>Our Team</span>
          <h2 className="section-title">Meet Your <em>Agents</em></h2>
          <p className="section-subtitle">Local experts who know every street and every opportunity.</p>
        </Reveal>
        <div className="agent-grid">
          {agents.map((a, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="agent">
                <div className="agent-img" style={{ backgroundImage: `url(${a.img})` }} />
                <h3>{a.name}</h3>
                <div className="role">{a.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Agents;
