import { Link } from 'react-router-dom';

function Landing() {
  return (
    <section className="landing-shell">
      <div className="landing-hero">
        <p className="eyebrow">Memorial Sales Studio</p>
        <h1>Design, quote, and close memorial projects faster.</h1>
        <p>
          Headstone Previewer helps your team turn family conversations into polished visual proposals in minutes,
          with guided design choices and clear pricing tiers.
        </p>
        <div className="landing-cta-row">
          <Link className="nav-cta" to="/signup">Create account</Link>
          <Link className="secondary-link landing-secondary-cta" to="/login">Sign in</Link>
        </div>
        <p className="landing-subtle">Start with a trial account. Upgrade when you are ready for team workflows and advanced tools.</p>
      </div>

      <div className="landing-feature-grid">
        <article className="landing-feature-card">
          <h3>Faster Proposals</h3>
          <p>Build polished memorial previews with type, color, shape, and style selections in a guided workflow.</p>
        </article>
        <article className="landing-feature-card">
          <h3>Better Close Rates</h3>
          <p>Present clear visual options and tiered pricing so families can choose confidently.</p>
        </article>
        <article className="landing-feature-card">
          <h3>Team-Ready Billing</h3>
          <p>Upgrade plans with Stripe, manage subscriptions, and scale from trial to studio operations.</p>
        </article>
      </div>

      <div className="landing-proof-row">
        <div className="landing-proof-pill">Trial: 3 saved designs</div>
        <div className="landing-proof-pill">Professional: unlimited sessions</div>
        <div className="landing-proof-pill">Studio: advanced preview controls</div>
      </div>

      <div className="landing-footer-cta">
        <h2>Ready to modernize your memorial sales flow?</h2>
        <p>Bring your team into a guided workflow that is faster than manual sketches and easier to present to families.</p>
        <div className="landing-cta-row">
          <Link className="nav-cta" to="/signup">Start free trial</Link>
          <Link className="secondary-link landing-secondary-cta" to="/pricing">View pricing</Link>
        </div>
      </div>
    </section>
  );
}

export default Landing;
