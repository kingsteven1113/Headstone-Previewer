import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { canGenerateQuotes, canUseAdvancedPreviewer, getAdvancedPreviewerMessage, getQuoteAccessMessage, getUsageSummary } from '../../utils/accessRules';
import { formatDesignStyleLabel } from '../../utils/designStyles';
import { getSavedProjects, deleteProject, updateProject } from '../../utils/savedProjects';
import { apiClient } from '../../utils/apiClient';

function formatDisplayDate(dateString) {
  if (!dateString) {
    return 'Not set';
  }

  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) {
    return 'Not set';
  }

  return parsed.toLocaleDateString();
}

function formatMoney(cents, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: String(currency || 'usd').toUpperCase(),
  }).format((Number(cents) || 0) / 100);
}

function Dashboard() {
  const { user, plan, subscriptionStatus, refreshAuthUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [isLoadingQuoteRequests, setIsLoadingQuoteRequests] = useState(false);
  const [quoteRequestError, setQuoteRequestError] = useState('');
  const [selectedQuoteRequestId, setSelectedQuoteRequestId] = useState('');
  const [messagesByQuoteRequestId, setMessagesByQuoteRequestId] = useState({});
  const [offersByQuoteRequestId, setOffersByQuoteRequestId] = useState({});
  const [messageDraftByQuoteRequestId, setMessageDraftByQuoteRequestId] = useState({});
  const [loadingMessagesForQuoteRequestId, setLoadingMessagesForQuoteRequestId] = useState('');
  const [loadingOffersForQuoteRequestId, setLoadingOffersForQuoteRequestId] = useState('');
  const [sendingMessageForQuoteRequestId, setSendingMessageForQuoteRequestId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [billingPlans, setBillingPlans] = useState([]);
  const [billingSubscription, setBillingSubscription] = useState(null);
  const [billingConfig, setBillingConfig] = useState({
    checkoutConfigured: false,
    webhookConfigured: false,
    fullyConfigured: false,
  });
  const [billingError, setBillingError] = useState('');
  const [billingNotice, setBillingNotice] = useState('');
  const [isBillingLoading, setIsBillingLoading] = useState(false);
  const [isRedirectingBilling, setIsRedirectingBilling] = useState(false);
  const handledBillingSuccessRef = useRef(false);
  const navigate = useNavigate();

  const planCopy = {
    trial: ['3 saved designs', 'Basic preview access', 'Upgrade path into paid workflow'],
    free: ['3 saved designs', 'Basic preview access', 'Upgrade path into paid workflow'],
    professional: ['Unlimited design sessions', 'Saved projects', 'Quote generation'],
    studio: ['Advanced design-style controls', 'Richer preview workflow', 'Quote generation'],
    enterprise: ['Multi-user workspace', 'Branded client experience', 'Priority onboarding'],
  };

  const usageSummary = getUsageSummary({ plan, projectCount: projects.length });
  const quoteAccessEnabled = canGenerateQuotes({ isAuthenticated: true, plan });
  const advancedPreviewEnabled = canUseAdvancedPreviewer({ isAuthenticated: true, plan });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const loadedProjects = await getSavedProjects();
        setProjects(loadedProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects([]);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const loadBilling = async () => {
      try {
        setBillingError('');
        setIsBillingLoading(true);
        const [plansResponse, subscriptionResponse] = await Promise.all([
          apiClient.getBillingPlans(),
          apiClient.getBillingSubscription(),
        ]);
        setBillingPlans(plansResponse.plans || []);
        setBillingConfig({
          checkoutConfigured: Boolean(plansResponse.checkoutConfigured),
          webhookConfigured: Boolean(plansResponse.webhookConfigured),
          fullyConfigured: Boolean(plansResponse.fullyConfigured),
        });
        setBillingSubscription(subscriptionResponse.subscription || null);
      } catch (error) {
        console.error('Failed to load billing details:', error);
        setBillingError(error.message || 'Unable to load billing details.');
      } finally {
        setIsBillingLoading(false);
      }
    };

    loadBilling();
  }, []);

  useEffect(() => {
    const loadQuoteRequests = async () => {
      try {
        setQuoteRequestError('');
        setIsLoadingQuoteRequests(true);
        const data = await apiClient.getMyQuoteRequests();
        setQuoteRequests(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load quote requests:', error);
        setQuoteRequestError(error.message || 'Unable to load routed quote requests.');
      } finally {
        setIsLoadingQuoteRequests(false);
      }
    };

    loadQuoteRequests();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (handledBillingSuccessRef.current) {
      return;
    }

    const query = new URLSearchParams(window.location.search);
    if (query.get('billing') === 'success') {
      handledBillingSuccessRef.current = true;
      const sessionId = query.get('session_id');
      const hasResolvedSessionId = Boolean(
        sessionId &&
        sessionId !== '{CHECKOUT_SESSION_ID}' &&
        sessionId.startsWith('cs_')
      );

      const finalizeCheckout = async () => {
        try {
          if (hasResolvedSessionId) {
            const completion = await apiClient.completeCheckoutSession(sessionId);
            setBillingSubscription(completion.subscription || null);
            setBillingNotice('Subscription updated successfully.');
          } else {
            const data = await apiClient.getBillingSubscription();
            setBillingSubscription(data.subscription || null);
            setBillingNotice('Subscription refresh is in progress. If plan details are unchanged, refresh again in a few seconds.');
          }
          await refreshAuthUser();
        } catch (error) {
          console.error('Failed to refresh billing after checkout:', error);
          setBillingError(error.message || 'Unable to finalize checkout.');
        }
      };

      finalizeCheckout();

      query.delete('billing');
      query.delete('session_id');
      const nextQuery = query.toString();
      const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}${window.location.hash || ''}`;
      window.history.replaceState({}, '', nextUrl);
    }
  }, [refreshAuthUser]);

  const checkoutTargets = billingPlans.filter((tier) => tier.checkoutEnabled);
  const hasCheckoutTargets = checkoutTargets.length > 0;

  const handleUpgrade = async (planName) => {
    try {
      setBillingError('');
      setBillingNotice('');
      setIsRedirectingBilling(true);
      const session = await apiClient.createCheckoutSession(planName);
      if (session?.url) {
        window.location.assign(session.url);
        return;
      }

      if (session?.subscription) {
        setBillingSubscription(session.subscription);
      }

      await refreshAuthUser();
      setBillingNotice(session?.message || 'Subscription updated successfully.');
    } catch (error) {
      console.error('Failed to start checkout:', error);
      setBillingError(error.message || 'Unable to start checkout.');
    } finally {
      setIsRedirectingBilling(false);
    }
  };

  const handleManageBilling = async () => {
    try {
      setBillingError('');
      setIsRedirectingBilling(true);
      const session = await apiClient.createPortalSession();
      if (session?.url) {
        window.location.assign(session.url);
        return;
      }
      setBillingError('Billing portal did not return a redirect URL.');
    } catch (error) {
      console.error('Failed to open billing portal:', error);
      setBillingError(error.message || 'Unable to open billing portal.');
    } finally {
      setIsRedirectingBilling(false);
    }
  };

  const handleLoadProject = (project) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('headstone-previewer-pending-project', JSON.stringify(project));
    }
    navigate('/preview');
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this design? This action cannot be undone.')) {
      try {
        await deleteProject(projectId);
        const updatedProjects = await getSavedProjects();
        setProjects(updatedProjects);
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const handleStartRename = (project) => {
    setEditingId(project.id);
    setEditingName(project.title);
  };

  const handleSaveRename = async (projectId) => {
    if (!editingName.trim()) {
      return;
    }
    try {
      await updateProject(projectId, { title: editingName.trim() });
      const updatedProjects = await getSavedProjects();
      setProjects(updatedProjects);
      setEditingId(null);
      setEditingName('');
    } catch (error) {
      console.error('Failed to rename project:', error);
    }
  };

  const handleCancelRename = () => {
    setEditingId(null);
    setEditingName('');
  };

  const openQuoteRequestChat = async (quoteRequestId) => {
    setSelectedQuoteRequestId(quoteRequestId);

    if (messagesByQuoteRequestId[quoteRequestId]) {
      return;
    }

    try {
      setLoadingMessagesForQuoteRequestId(quoteRequestId);
      const messages = await apiClient.getQuoteRequestMessages(quoteRequestId);
      setMessagesByQuoteRequestId((currentState) => ({
        ...currentState,
        [quoteRequestId]: Array.isArray(messages) ? messages : [],
      }));
    } catch (error) {
      console.error('Failed to load quote request chat:', error);
      setQuoteRequestError(error.message || 'Unable to load quote request chat.');
    } finally {
      setLoadingMessagesForQuoteRequestId('');
    }
  };

  const sendQuoteRequestMessage = async (quoteRequestId) => {
    const draft = String(messageDraftByQuoteRequestId[quoteRequestId] || '').trim();
    if (!draft) {
      return;
    }

    try {
      setSendingMessageForQuoteRequestId(quoteRequestId);
      const createdMessage = await apiClient.sendQuoteRequestMessage(quoteRequestId, draft);
      setMessagesByQuoteRequestId((currentState) => ({
        ...currentState,
        [quoteRequestId]: [...(currentState[quoteRequestId] || []), createdMessage],
      }));
      setMessageDraftByQuoteRequestId((currentState) => ({
        ...currentState,
        [quoteRequestId]: '',
      }));
    } catch (error) {
      console.error('Failed to send quote request message:', error);
      setQuoteRequestError(error.message || 'Unable to send message right now.');
    } finally {
      setSendingMessageForQuoteRequestId('');
    }
  };

  const openQuoteRequestOffers = async (quoteRequestId) => {
    setSelectedQuoteRequestId(quoteRequestId);

    if (offersByQuoteRequestId[quoteRequestId]) {
      return;
    }

    try {
      setLoadingOffersForQuoteRequestId(quoteRequestId);
      const offers = await apiClient.getQuoteRequestOffers(quoteRequestId);
      setOffersByQuoteRequestId((currentState) => ({
        ...currentState,
        [quoteRequestId]: Array.isArray(offers) ? offers : [],
      }));
    } catch (error) {
      console.error('Failed to load official quote offers:', error);
      setQuoteRequestError(error.message || 'Unable to load official quote offers.');
    } finally {
      setLoadingOffersForQuoteRequestId('');
    }
  };

  const selectedQuoteRequest = quoteRequests.find((request) => request.id === selectedQuoteRequestId) || null;
  const selectedQuoteRequestMessages = selectedQuoteRequest ? (messagesByQuoteRequestId[selectedQuoteRequest.id] || []) : [];
  const selectedQuoteRequestOffers = selectedQuoteRequest ? (offersByQuoteRequestId[selectedQuoteRequest.id] || []) : [];
  const currentSelectedQuoteOffer = selectedQuoteRequestOffers.find((offer) => offer.isCurrent) || selectedQuoteRequest?.currentOffer || null;

  return (
    <section className="dashboard-card">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Account dashboard</p>
          <h2>Welcome back, {user?.name || 'team member'}.</h2>
        </div>
        <div className="plan-pill-group">
          <span className="plan-pill">{plan === 'trial' ? 'Trial plan' : `${plan} plan`}</span>
          <span className="status-pill">{subscriptionStatus}</span>
        </div>
      </div>

      <div className="status-banner">
        <strong>Usage:</strong> {usageSummary.usageLabel}
        {usageSummary.isUnlimited ? ' with unlimited retention on your current plan.' : ` with ${usageSummary.remainingProjects} save${usageSummary.remainingProjects === 1 ? '' : 's'} remaining before upgrade is required.`}
      </div>

      <div className="dashboard-grid">
        <article className="panel">
          <h3>Current access</h3>
          <ul className="feature-list">
            {planCopy[plan]?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="panel-note">{getQuoteAccessMessage({ isAuthenticated: true, plan })}</p>
          <p className="panel-note">{getAdvancedPreviewerMessage({ isAuthenticated: true, plan })}</p>
        </article>
        <article className="panel">
          <h3>Saved projects</h3>
          <p className="panel-note">{usageSummary.isUnlimited ? 'Your current plan keeps all saved designs.' : `Trial accounts can keep up to ${usageSummary.projectLimit} saved designs.`}</p>
          {projects.length > 0 ? (
            <ul className="saved-project-list">
              {projects.map((project) => (
                <li key={project.id}>
                  <div className="project-item-content">
                    {editingId === project.id ? (
                      <div className="project-rename-input">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveRename(project.id);
                            } else if (e.key === 'Escape') {
                              handleCancelRename();
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        <strong>{project.title}</strong>
                        <span>{project.type || 'Custom design'}{project.designStyle ? ` • ${formatDesignStyleLabel(project.designStyle)}` : ''}</span>
                      </>
                    )}
                  </div>
                  <div className="project-item-actions">
                    {editingId === project.id ? (
                      <>
                        <button className="secondary-link project-action-button" type="button" onClick={() => handleSaveRename(project.id)}>
                          Save
                        </button>
                        <button className="secondary-link project-action-button" type="button" onClick={handleCancelRename}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="secondary-link project-load-button" type="button" onClick={() => handleLoadProject(project)}>
                          Load
                        </button>
                        <button className="secondary-link project-rename-button" type="button" onClick={() => handleStartRename(project)}>
                          Edit
                        </button>
                        <button className="secondary-link project-delete-button" type="button" onClick={() => handleDeleteProject(project.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No projects saved yet. Save a design from the previewer to build your first proposal.</p>
          )}
        </article>
        <article className="panel">
          <h3>Advanced preview</h3>
          <p>{advancedPreviewEnabled ? 'Your account can use the extra design-style layer in the previewer for more premium memorial concepts.' : 'Your current plan keeps the simpler preview flow. Studio unlocks the more complex previewer before Enterprise.'}</p>
          {!advancedPreviewEnabled ? <Link className="secondary-link" to="/pricing">Upgrade for advanced preview</Link> : <Link className="secondary-link" to="/preview">Open advanced previewer</Link>}
          <p className="panel-note">{quoteAccessEnabled ? 'Quote generation is also enabled on this account.' : 'Quote generation remains locked until you move above Trial.'}</p>
        </article>
        <article className="panel">
          <h3>Dealer quote routing</h3>
          {isLoadingQuoteRequests ? <p>Loading routed requests...</p> : null}
          {!isLoadingQuoteRequests && quoteRequests.length === 0 ? (
            <p>No quote requests sent yet. Submit one from the quote request page to route designs directly to a dealer.</p>
          ) : null}
          {!isLoadingQuoteRequests && quoteRequests.length > 0 ? (
            <ul className="feature-list">
              {quoteRequests.slice(0, 5).map((request) => (
                <li key={request.id}>
                  {request.design?.title || 'Untitled design'} {'->'} {request.dealer?.businessName || request.dealer?.name || 'Dealer'} ({request.status})
                  <button
                    className="secondary-link project-action-button"
                    type="button"
                    onClick={() => openQuoteRequestChat(request.id)}
                    disabled={loadingMessagesForQuoteRequestId === request.id}
                  >
                    {loadingMessagesForQuoteRequestId === request.id ? 'Loading chat...' : 'Open chat'}
                  </button>
                  <button
                    className="secondary-link project-action-button"
                    type="button"
                    onClick={() => openQuoteRequestOffers(request.id)}
                    disabled={loadingOffersForQuoteRequestId === request.id}
                  >
                    {loadingOffersForQuoteRequestId === request.id ? 'Loading quote...' : 'View official quote'}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {quoteRequestError ? <p className="panel-note billing-error">{quoteRequestError}</p> : null}
          {currentSelectedQuoteOffer ? (
            <article className="quote-offer-card current">
              <div className="quote-offer-header">
                <h4>{currentSelectedQuoteOffer.title}</h4>
                <span>Official quote</span>
              </div>
              <p className="quote-offer-amount">{formatMoney(currentSelectedQuoteOffer.amountCents, currentSelectedQuoteOffer.currency)}</p>
              <p className="panel-note">Lead time: {currentSelectedQuoteOffer.leadTimeDays ?? 'Not specified'} day(s)</p>
              <p className="panel-note">Valid until: {currentSelectedQuoteOffer.validUntil ? formatDisplayDate(currentSelectedQuoteOffer.validUntil) : 'Not specified'}</p>
              {currentSelectedQuoteOffer.scopeSummary ? <p className="panel-note">Scope: {currentSelectedQuoteOffer.scopeSummary}</p> : null}
              {currentSelectedQuoteOffer.terms ? <p className="panel-note">Terms: {currentSelectedQuoteOffer.terms}</p> : null}
            </article>
          ) : null}
          {selectedQuoteRequestOffers.length > 1 ? (
            <details className="quote-offer-history">
              <summary>View previous quote revisions</summary>
              <ul className="feature-list">
                {selectedQuoteRequestOffers.filter((offer) => !offer.isCurrent).map((offer) => (
                  <li key={offer.id}>
                    {offer.title} - {formatMoney(offer.amountCents, offer.currency)} ({offer.status})
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
          {selectedQuoteRequest ? (
            <div>
              <p className="panel-note">Chat with {selectedQuoteRequest.dealer?.businessName || selectedQuoteRequest.dealer?.name || 'dealer'}:</p>
              {selectedQuoteRequestMessages.length === 0 ? <p>No messages yet.</p> : null}
              {selectedQuoteRequestMessages.length > 0 ? (
                <ul className="feature-list">
                  {selectedQuoteRequestMessages.map((message) => (
                    <li key={message.id}>
                      <strong>{message.sender?.name || message.sender?.email || 'Unknown'}:</strong> {message.body}
                    </li>
                  ))}
                </ul>
              ) : null}
              <label>
                Send message
                <textarea
                  rows={3}
                  value={messageDraftByQuoteRequestId[selectedQuoteRequest.id] || ''}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    setMessageDraftByQuoteRequestId((currentState) => ({
                      ...currentState,
                      [selectedQuoteRequest.id]: nextValue,
                    }));
                  }}
                  placeholder="Ask follow-up questions or share updates"
                />
              </label>
              <button
                className="secondary-link project-action-button"
                type="button"
                onClick={() => sendQuoteRequestMessage(selectedQuoteRequest.id)}
                disabled={sendingMessageForQuoteRequestId === selectedQuoteRequest.id}
              >
                {sendingMessageForQuoteRequestId === selectedQuoteRequest.id ? 'Sending...' : 'Send message'}
              </button>
            </div>
          ) : null}
          <Link className="secondary-link" to="/quote-request">Open quote request routing</Link>
        </article>
        <article className="panel">
          <h3>Billing</h3>
          {isBillingLoading ? <p>Loading billing details...</p> : null}
          {!isBillingLoading ? (
            <>
              <p className="panel-note">Current plan: <strong>{billingSubscription?.planName || plan}</strong></p>
              <p className="panel-note">Subscription status: <strong>{(billingSubscription?.status || subscriptionStatus || 'trial').toLowerCase()}</strong></p>
              <p className="panel-note">Renews on: <strong>{formatDisplayDate(billingSubscription?.currentPeriodEnd)}</strong></p>
              {!billingConfig.checkoutConfigured ? (
                <p className="panel-note billing-error">
                  Billing checkout is not configured yet. Add STRIPE_SECRET_KEY in backend/.env and restart the backend.
                </p>
              ) : null}
              {billingConfig.checkoutConfigured && !hasCheckoutTargets ? (
                <p className="panel-note billing-error">
                  No paid tiers are currently enabled. Add STRIPE_PRICE_PROFESSIONAL_MONTHLY and STRIPE_PRICE_STUDIO_MONTHLY in backend/.env and restart the backend.
                </p>
              ) : null}
              {billingConfig.checkoutConfigured && !billingConfig.webhookConfigured ? (
                <p className="panel-note billing-error">
                  Webhook sync is not configured yet. Add STRIPE_WEBHOOK_SECRET to backend/.env while running stripe listen.
                </p>
              ) : null}

              {billingError ? <p className="panel-note billing-error">{billingError}</p> : null}
              {billingNotice ? <p className="panel-note">{billingNotice}</p> : null}

              <div className="billing-actions">
                {checkoutTargets.map((tier) => (
                  <button
                    key={tier.planName}
                    className="secondary-link billing-action-button"
                    type="button"
                    onClick={() => handleUpgrade(tier.planName)}
                    disabled={isRedirectingBilling || tier.planName === (billingSubscription?.planName || plan)}
                  >
                    {tier.planName === (billingSubscription?.planName || plan) ? `${tier.label} active` : `Upgrade to ${tier.label}`}
                  </button>
                ))}

                <button
                  className="secondary-link billing-action-button"
                  type="button"
                  onClick={handleManageBilling}
                  disabled={isRedirectingBilling}
                >
                  Manage billing
                </button>
              </div>
            </>
          ) : null}
        </article>
      </div>

      <div className="dashboard-actions">
        <Link className="dashboard-primary-link" to="/dealer-quotes">Open dealer quote center</Link>
        <Link className="secondary-link" to="/pricing">View pricing</Link>
        <Link className="secondary-link" to="/preview">Back to previewer</Link>
      </div>
    </section>
  );
}

export default Dashboard;
