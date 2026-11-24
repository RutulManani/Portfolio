import Threads from '../components/Threads/Threads';
import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="lp-wrap hero-inner">
        <p className="hero-kicker">
          <span className="hero-pulse" aria-hidden="true" />
          Rutul, Product designer in Canada
        </p>
        <h1 className="hero-title">
          I solve <em>user and business</em> problems through design.
        </h1>
        <p className="hero-sub">
          Focused on <strong>AI-driven applications</strong> and <strong>B2B SaaS</strong>, with a track
          record across <strong>insurtech, HR tech and early-stage startups</strong>.
        </p>
      </div>
      <Threads />
    </section>
  );
}
