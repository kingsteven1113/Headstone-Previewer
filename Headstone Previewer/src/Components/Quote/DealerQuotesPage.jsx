import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../utils/apiClient';

function formatDateTime(value) {
  if (!value) {
    return 'Not available';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Not available';
  }

  return date.toLocaleString();
}

function formatMoney(cents, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: String(currency || 'usd').toUpperCase(),
  }).format((Number(cents) || 0) / 100);
}

function formatSelectionValue(value) {
  if (!value) {
    return 'Not selected';
  }

  return String(value)
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function DealerQuotesPage() {
  const { user } = useAuth();
  const userRole = String(user?.role || '').toUpperCase();
  const isDealer = userRole === 'DEALER';

  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [expandedRequestId, setExpandedRequestId] = useState('');

  const [updatingStatusForId, setUpdatingStatusForId] = useState('');
  const [messagesByRequestId, setMessagesByRequestId] = useState({});
  const [messageDraftByRequestId, setMessageDraftByRequestId] = useState({});
  const [loadingMessagesForId, setLoadingMessagesForId] = useState('');
  const [sendingMessageForId, setSendingMessageForId] = useState('');

  const [offersByRequestId, setOffersByRequestId] = useState({});
  const [loadingOffersForId, setLoadingOffersForId] = useState('');
  const [sendingOfferForId, setSendingOfferForId] = useState('');
  const [offerFormByRequestId, setOfferFormByRequestId] = useState({});

  const loadRequests = async () => {
    try {
      setError('');
      setIsLoading(true);
      const data = isDealer
        ? await apiClient.getDealerQuoteInbox()
        : await apiClient.getMyQuoteRequests();
      setRequests(Array.isArray(data) ? data : []);
    } catch (loadError) {
      console.error('Failed to load quote workspace:', loadError);
      setError(loadError.message || 'Unable to load dealer quote workspace right now.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [isDealer]);

  const handleStatusChange = async (quoteRequestId, status) => {
    if (!isDealer) {
      return;
    }

    try {
      setNotice('');
      setUpdatingStatusForId(quoteRequestId);
      await apiClient.updateQuoteRequestStatus(quoteRequestId, status);
      await loadRequests();
      setNotice(`Request marked as ${status.toLowerCase().replace('_', ' ')}.`);
    } catch (statusError) {
      console.error('Failed to update quote request status:', statusError);
      setNotice(statusError.message || 'Unable to update request status.');
    } finally {
      setUpdatingStatusForId('');
    }
  };

  const openMessages = async (quoteRequestId) => {
    if (messagesByRequestId[quoteRequestId]) {
      return;
    }

    try {
      setLoadingMessagesForId(quoteRequestId);
      const messages = await apiClient.getQuoteRequestMessages(quoteRequestId);
      setMessagesByRequestId((currentState) => ({
        ...currentState,
        [quoteRequestId]: Array.isArray(messages) ? messages : [],
      }));
    } catch (messageError) {
      console.error('Failed to load quote messages:', messageError);
      setNotice(messageError.message || 'Unable to load messages right now.');
    } finally {
      setLoadingMessagesForId('');
    }
  };

  const sendMessage = async (quoteRequestId) => {
    const draft = String(messageDraftByRequestId[quoteRequestId] || '').trim();
    if (!draft) {
      return;
    }

    try {
      setSendingMessageForId(quoteRequestId);
      const createdMessage = await apiClient.sendQuoteRequestMessage(quoteRequestId, draft);
      setMessagesByRequestId((currentState) => ({
        ...currentState,
        [quoteRequestId]: [...(currentState[quoteRequestId] || []), createdMessage],
      }));
      setMessageDraftByRequestId((currentState) => ({
        ...currentState,
        [quoteRequestId]: '',
      }));
    } catch (sendError) {
      console.error('Failed to send message:', sendError);
      setNotice(sendError.message || 'Unable to send message right now.');
    } finally {
      setSendingMessageForId('');
    }
  };

  const openOffers = async (quoteRequestId) => {
    if (offersByRequestId[quoteRequestId]) {
      return;
    }

    try {
      setLoadingOffersForId(quoteRequestId);
      const offers = await apiClient.getQuoteRequestOffers(quoteRequestId);
      setOffersByRequestId((currentState) => ({
        ...currentState,
        [quoteRequestId]: Array.isArray(offers) ? offers : [],
      }));
    } catch (offerError) {
      console.error('Failed to load official quotes:', offerError);
      setNotice(offerError.message || 'Unable to load official quotes.');
    } finally {
      setLoadingOffersForId('');
    }
  };

  const updateOfferField = (quoteRequestId, field, value) => {
    setOfferFormByRequestId((currentState) => ({
      ...currentState,
      [quoteRequestId]: {
        ...(currentState[quoteRequestId] || {
          title: 'Official memorial quote',
          amount: '',
          leadTimeDays: '',
          validUntil: '',
          scopeSummary: '',
          terms: '',
          currency: 'usd',
        }),
        [field]: value,
      },
    }));
  };

  const sendOfficialQuote = async (quoteRequestId) => {
    if (!isDealer) {
      return;
    }

    const draft = offerFormByRequestId[quoteRequestId] || {};
    const normalizedTitle = String(draft.title || '').trim();
    const amount = Number.parseFloat(draft.amount);

    if (!normalizedTitle) {
      setNotice('Official quote title is required.');
      return;
    }

    if (!Number.isFinite(amount) || amount < 0) {
      setNotice('Official quote amount must be a valid non-negative number.');
      return;
    }

    try {
      setSendingOfferForId(quoteRequestId);
      const createdOffer = await apiClient.createQuoteRequestOffer(quoteRequestId, {
        title: normalizedTitle,
        amountCents: Math.round(amount * 100),
        currency: draft.currency || 'usd',
        leadTimeDays: draft.leadTimeDays || null,
        validUntil: draft.validUntil || null,
        scopeSummary: draft.scopeSummary || null,
        terms: draft.terms || null,
      });

      setOffersByRequestId((currentState) => ({
        ...currentState,
        [quoteRequestId]: [createdOffer, ...(currentState[quoteRequestId] || []).map((offer) => ({
          ...offer,
          isCurrent: false,
        }))],
      }));

      setNotice('Official quote sent successfully.');
      await loadRequests();
    } catch (offerError) {
      console.error('Failed to send official quote:', offerError);
      setNotice(offerError.message || 'Unable to send official quote right now.');
    } finally {
      setSendingOfferForId('');
    }
  };

  const toggleRequestDetails = async (quoteRequestId) => {
    if (expandedRequestId === quoteRequestId) {
      setExpandedRequestId('');
      return;
    }

    setExpandedRequestId(quoteRequestId);
    await Promise.all([openMessages(quoteRequestId), openOffers(quoteRequestId)]);
  };

  if (isLoading) {
    return (
      <section className="dashboard-card">
        <p className="eyebrow">Dealer quotes</p>
        <h2>Loading quote workspace...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-card">
        <p className="eyebrow">Dealer quotes</p>
        <h2>Unable to load quote workspace</h2>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="dashboard-card">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Dealer quotes</p>
          <h2>{isDealer ? 'Official quote center' : 'Official dealer quotes'}</h2>
          <p className="panel-note">
            {isDealer
              ? 'Issue polished quote cards, manage revisions, and coordinate details with funeral-home teams.'
              : 'Review official dealer quotes, compare revisions, and coordinate details before accepting.'}
          </p>
        </div>
      </div>

      {notice ? <p className="form-message">{notice}</p> : null}

      {requests.length === 0 ? (
        <p>
          {isDealer
            ? 'No routed requests yet. They will appear here when funeral homes send quote requests.'
            : 'No routed requests yet. Create one from the quote request workflow.'}
        </p>
      ) : (
        <ul className="saved-project-list">
          {requests.map((request) => {
            const isExpanded = expandedRequestId === request.id;
            const requestMessages = messagesByRequestId[request.id] || [];
            const requestOffers = offersByRequestId[request.id] || [];
            const requestOfferDraft = offerFormByRequestId[request.id] || {
              title: 'Official memorial quote',
              amount: '',
              leadTimeDays: '',
              validUntil: '',
              scopeSummary: '',
              terms: '',
              currency: 'usd',
            };
            const currentRequestOffer = requestOffers.find((offer) => offer.isCurrent) || request.currentOffer || null;

            return (
              <li key={request.id} className="quote-request-item">
                <div className="quote-request-row">
                  <div className="project-item-content">
                    <strong>{request.design?.title || 'Untitled memorial design'}</strong>
                    <span>
                      {isDealer
                        ? `${request.customer?.familyName || 'Unknown family'} • ${request.customer?.email || 'No email'}`
                        : `${request.dealer?.businessName || request.dealer?.name || 'Dealer'} • ${request.status}`}
                    </span>
                    <span>Submitted: {formatDateTime(request.submittedAt)}</span>
                    <span>
                      Type: {formatSelectionValue(request.design?.type)} | Color: {formatSelectionValue(request.design?.color)} | Shape: {formatSelectionValue(request.design?.shape)}
                    </span>
                  </div>

                  <div className="project-item-actions">
                    {isDealer ? (
                      <>
                        <button
                          className="secondary-link project-action-button"
                          type="button"
                          onClick={() => handleStatusChange(request.id, 'IN_REVIEW')}
                          disabled={updatingStatusForId === request.id}
                        >
                          In Review
                        </button>
                        <button
                          className="secondary-link project-action-button"
                          type="button"
                          onClick={() => handleStatusChange(request.id, 'RESPONDED')}
                          disabled={updatingStatusForId === request.id}
                        >
                          Responded
                        </button>
                      </>
                    ) : null}

                    <button
                      className={`quote-request-toggle ${isExpanded ? 'open' : ''}`}
                      type="button"
                      onClick={() => toggleRequestDetails(request.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`quote-request-details-${request.id}`}
                    >
                      <span>{isExpanded ? 'Hide details' : 'View details'}</span>
                      <span className="quote-request-toggle-arrow" aria-hidden="true">▾</span>
                    </button>
                  </div>
                </div>

                <div
                  id={`quote-request-details-${request.id}`}
                  className={`quote-request-expand ${isExpanded ? 'open' : ''}`}
                >
                  <div className="quote-request-details">
                    <article className="panel">
                      <h3>Official quote</h3>
                      {loadingOffersForId === request.id ? <p>Loading official quote...</p> : null}
                      {isDealer ? (
                        <div className="quote-offer-form">
                          <label>
                            Quote title
                            <input
                              type="text"
                              value={requestOfferDraft.title}
                              onChange={(event) => updateOfferField(request.id, 'title', event.target.value)}
                            />
                          </label>
                          <label>
                            Amount (USD)
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={requestOfferDraft.amount}
                              onChange={(event) => updateOfferField(request.id, 'amount', event.target.value)}
                            />
                          </label>
                          <label>
                            Lead time (days)
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={requestOfferDraft.leadTimeDays}
                              onChange={(event) => updateOfferField(request.id, 'leadTimeDays', event.target.value)}
                            />
                          </label>
                          <label>
                            Valid until
                            <input
                              type="date"
                              value={requestOfferDraft.validUntil}
                              onChange={(event) => updateOfferField(request.id, 'validUntil', event.target.value)}
                            />
                          </label>
                          <label>
                            Scope summary
                            <textarea
                              rows={2}
                              value={requestOfferDraft.scopeSummary}
                              onChange={(event) => updateOfferField(request.id, 'scopeSummary', event.target.value)}
                              placeholder="Summarize materials, engraving, and included options"
                            />
                          </label>
                          <label>
                            Terms
                            <textarea
                              rows={2}
                              value={requestOfferDraft.terms}
                              onChange={(event) => updateOfferField(request.id, 'terms', event.target.value)}
                              placeholder="Deposit, revision limits, delivery terms"
                            />
                          </label>
                          <button
                            className="quote-offer-send"
                            type="button"
                            onClick={() => sendOfficialQuote(request.id)}
                            disabled={sendingOfferForId === request.id}
                          >
                            {sendingOfferForId === request.id ? 'Sending official quote...' : 'Send official quote'}
                          </button>
                        </div>
                      ) : null}

                      {currentRequestOffer ? (
                        <article className="quote-offer-card current">
                          <div className="quote-offer-header">
                            <h4>{currentRequestOffer.title}</h4>
                            <span>{currentRequestOffer.isCurrent ? 'Current' : 'Official'}</span>
                          </div>
                          <p className="quote-offer-amount">{formatMoney(currentRequestOffer.amountCents, currentRequestOffer.currency)}</p>
                          <p className="panel-note">Lead time: {currentRequestOffer.leadTimeDays ?? 'Not specified'} day(s)</p>
                          <p className="panel-note">Valid until: {currentRequestOffer.validUntil ? formatDateTime(currentRequestOffer.validUntil) : 'Not specified'}</p>
                          {currentRequestOffer.scopeSummary ? <p className="panel-note">Scope: {currentRequestOffer.scopeSummary}</p> : null}
                          {currentRequestOffer.terms ? <p className="panel-note">Terms: {currentRequestOffer.terms}</p> : null}
                        </article>
                      ) : (
                        <p>No official quote has been issued yet.</p>
                      )}

                      {requestOffers.length > 1 ? (
                        <details className="quote-offer-history">
                          <summary>Quote revision history</summary>
                          <ul className="feature-list">
                            {requestOffers
                              .filter((offer) => !offer.isCurrent)
                              .map((offer) => (
                                <li key={offer.id}>
                                  {offer.title} - {formatMoney(offer.amountCents, offer.currency)} ({offer.status})
                                </li>
                              ))}
                          </ul>
                        </details>
                      ) : null}
                    </article>

                    <article className="panel">
                      <h3>Conversation thread</h3>
                      {loadingMessagesForId === request.id ? <p>Loading chat...</p> : null}
                      {loadingMessagesForId !== request.id && requestMessages.length === 0 ? <p>No messages yet.</p> : null}
                      {requestMessages.length > 0 ? (
                        <ul className="feature-list">
                          {requestMessages.map((message) => (
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
                          value={messageDraftByRequestId[request.id] || ''}
                          onChange={(event) => {
                            const nextValue = event.target.value;
                            setMessageDraftByRequestId((currentState) => ({
                              ...currentState,
                              [request.id]: nextValue,
                            }));
                          }}
                          placeholder="Share updates, clarifications, and next steps"
                        />
                      </label>
                      <button
                        className="secondary-link project-action-button"
                        type="button"
                        onClick={() => sendMessage(request.id)}
                        disabled={sendingMessageForId === request.id}
                      >
                        {sendingMessageForId === request.id ? 'Sending...' : 'Send message'}
                      </button>
                    </article>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="dashboard-actions">
        {!isDealer ? <Link className="secondary-link" to="/quote-request">Send new quote request</Link> : null}
        <Link className="secondary-link" to="/dashboard">Back to dashboard</Link>
      </div>
    </section>
  );
}

export default DealerQuotesPage;
