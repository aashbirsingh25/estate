import { useState, useEffect } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="logo"><span className="logo-mark">◆</span> Haven</div>
        <ul className="nav-links">
          <li><a href="#finder">AI Finder</a></li>
          <li><a href="#map">Map</a></li>
          <li><a href="#listings">Listings</a></li>
          <li><a href="#mortgage">Mortgage</a></li>
          <li><a href="#agents">Agents</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#finder" className="btn btn-ghost">Find a Home</a>
      </div>
    </nav>
  );
}

export default Navbar;
