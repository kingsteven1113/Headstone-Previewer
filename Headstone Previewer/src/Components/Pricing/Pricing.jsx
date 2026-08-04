import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Pricing() {
  const { plan, selectPlan, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const tiers = [
    {
      key: 'trial',
      name: 'Trial',
      price: 'Free',
      description: 'Perfect for testing the concept with a funeral home team.',
      features: ['Limited preview sessions', 'Basic templates', 'No saved projects'],
    },
    {
      key: 'professional',
      name: 'Professional',
      price: '$49/mo',
      description: 'A serious plan for daily memorial design workflows.',
      features: ['Unlimited designs', 'Saved projects', 'Quote generation'],
    },
    {
      key: 'studio',
      name: 'Studio',
      price: '$79/mo',
      description: 'Built for teams that want the advanced preview workflow and richer design control.',
      features: ['Advanced previewer', 'Design-style controls', 'Quote generation'],
    },
    {
      key: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      description: 'Built for multi-location funeral homes that need team controls.',
      features: ['Multi-user teams', 'Branded experience', 'Priority support'],
    },
  ];

  return (
    <section className="pricing-card">
      <div className="pricing-intro">
        <p className="eyebrow">Subscription ready</p>
        <h2>Turn this previewer into a paid funeral-home product</h2>
        <p>This page now acts like the plan selection surface you would eventually connect to Stripe.</p>
      </div>

      <div className="pricing-grid">
        {tiers.map((tier) => (
          <article key={tier.key} className={`pricing-tier${tier.key === 'professional' ? ' featured' : ''}`}>
            <h3>{tier.name}</h3>
            <p className="price">{tier.price}</p>
            <p className="tier-description">{tier.description}</p>
            <ul>
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              className="plan-action"
              type="button"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/signup');
                  return;
                }

                selectPlan(tier.key);
              }}
            >
              {plan === tier.key ? 'Current plan' : isAuthenticated ? `Choose ${tier.name}` : `Start ${tier.name}`}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
