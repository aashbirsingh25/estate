function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="logo"><span className="logo-mark">◆</span> Haven</div>
            <p>Helping people find the place they'll call home — faster, with a little help from AI.</p>
          </div>
          <div>
            <h4>Office</h4>
            <a href="#">88 Market Street, Downtown</a>
            <a href="tel:5550000000">(555) 000-0000</a>
            <a href="mailto:hello@havenhomes.com">hello@havenhomes.com</a>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="#finder">AI Finder</a>
            <a href="#listings">Listings</a>
            <a href="#agents">Agents</a>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} Haven Homes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
