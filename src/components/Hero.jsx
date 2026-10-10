import { motion } from "framer-motion";

function Hero() {
  return (
    <header className="hero">
      <motion.div className="hero-bg"
        initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 6, ease: "easeOut" }} />
      <div className="hero-overlay" />
      <div className="hero-content">
        <motion.span className="eyebrow"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          Find Your Place
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.22,1,0.36,1] }}>
          Your dream home, <em>found faster</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }}>
          Browse handpicked listings — or just tell our AI what you're looking
          for, and let it find your perfect match.
        </motion.p>
        <motion.div className="hero-cta"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.1 }}>
          <a href="#finder" className="btn btn-sand">Try the AI Finder</a>
          <a href="#listings" className="btn">Browse Listings</a>
        </motion.div>
      </div>
    </header>
  );
}

export default Hero;
