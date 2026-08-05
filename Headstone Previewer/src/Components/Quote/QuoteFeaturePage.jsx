import { Link } from 'react-router-dom';

function QuoteFeaturePage() {
  return (
    <section className="quote-feature-card">
      <p className="eyebrow">Professional quote tools</p>
      <h2>Turn design previews into client-ready memorial proposals.</h2>
      <p>
        The Quote Builder helps your team generate polished proposal summaries with pricing, design details,
        and easy print/share workflows.
      </p>

      <div className="quote-feature-grid">
        <article className="quote-feature-panel">
          <h3>What you unlock</h3>
          <ul className="feature-list">
            <li>Proposal-ready memorial summaries</li>
            <li>Structured pricing breakout for families</li>
            <li>Clipboard and print-ready exports</li>
            <li>Saved-project to quote workflow</li>
          </ul>
        </article>

        <article className="quote-feature-panel">
          <h3>Who gets access</h3>
          <p>Quote Builder is available on Professional, Studio, and Enterprise tiers.</p>
          <p className="panel-note">Upgrade your account to unlock the full quote workflow.</p>
          <div className="quote-feature-actions">
            <Link className="nav-cta" to="/pricing">Upgrade to Professional</Link>
            <Link className="secondary-link quote-feature-secondary" to="/signup">Create account</Link>
          </div>
        </article>
      </div>
    </section>
  );
}

export default QuoteFeaturePage;
