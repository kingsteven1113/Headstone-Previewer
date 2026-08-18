import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

function formatSelectionValue(value) {
  if (!value) {
    return 'Not selected';
  }

  return String(value)
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function formatMoney(cents, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: String(currency || 'usd').toUpperCase(),
  }).format((Number(cents) || 0) / 100);
}

function DealerDashboard() {
  const [inbox, setInbox] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState('');
  const [messagesByRequestId, setMessagesByRequestId] = useState({});
  const [messageDraftByRequestId, setMessageDraftByRequestId] = useState({});
  const [loadingMessagesForId, setLoadingMessagesForId] = useState('');
  const [sendingMessageForId, setSendingMessageForId] = useState('');
  const [offersByRequestId, setOffersByRequestId] = useState({});
  const [loadingOffersForId, setLoadingOffersForId] = useState('');
  const [sendingOfferForId, setSendingOfferForId] = useState('');
  const [offerFormByRequestId, setOfferFormByRequestId] = useState({});

  const loadInbox = async () => {
    try {
      setError('');
      setIsLoading(true);
      const data = await apiClient.getDealerQuoteInbox();
      setInbox(Array.isArray(data) ? data : []);
    } catch (loadError) {
      console.error('Failed to load dealer quote inbox:', loadError);
      setError(loadError.message || 'Unable to load dealer inbox right now.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInbox();
  }, []);

  const handleStatusChange = async (quoteRequestId, status) => {
    try {
      setNotice('');
      setUpdatingId(quoteRequestId);
      await apiClient.updateQuoteRequestStatus(quoteRequestId, status);
      await loadInbox();
      setNotice(`Request marked as ${status.toLowerCase().replace('_', ' ')}.`);
    } catch (updateError) {
      console.error('Failed to update quote request status:', updateError);
      setNotice(updateError.message || 'Unable to update request status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOpenChat = async (quoteRequestId) => {
    setSelectedRequestId(quoteRequestId);

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
      console.error('Failed to load chat messages:', messageError);
      setNotice(messageError.message || 'Unable to load chat messages.');
    } finally {
      setLoadingMessagesForId('');
    }
  };

  const handleOpenOffers = async (quoteRequestId) => {
    setSelectedRequestId(quoteRequestId);

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

  const handleOfferFieldChange = (quoteRequestId, field, value) => {
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

  const handleSendOfficialQuote = async (quoteRequestId) => {
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
    } catch (offerError) {
      console.error('Failed to send official quote:', offerError);
      setNotice(offerError.message || 'Unable to send official quote.');
    } finally {
      setSendingOfferForId('');
    }
  };

  const handleSendMessage = async (quoteRequestId) => {
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

  const selectedRequest = inbox.find((request) => request.id === selectedRequestId) || null;
  const selectedMessages = selectedRequest ? (messagesByRequestId[selectedRequest.id] || []) : [];
  const selectedOffers = selectedRequest ? (offersByRequestId[selectedRequest.id] || []) : [];
  const selectedOfferDraft = selectedRequest ? (offerFormByRequestId[selectedRequest.id] || {
    title: 'Official memorial quote',
    amount: '',
    leadTimeDays: '',
    validUntil: '',
    scopeSummary: '',
    terms: '',
    currency: 'usd',
  }) : null;

  if (isLoading) {
    return (
      <section className="dashboard-card">
        <p className="eyebrow">Dealer inbox</p>
        <h2>Loading inbound quote requests...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-card">
        <p className="eyebrow">Dealer inbox</p>
        <h2>Unable to load requests</h2>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="dashboard-card">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Dealer inbox</p>
          <h2>Inbound funeral-home quote requests</h2>
        </div>
      </div>

      {notice ? <p className="form-message">{notice}</p> : null}

      {inbox.length === 0 ? (
        <p>No requests yet. Funeral homes will appear here when they route quotes to your dealership.</p>
      ) : (
        <ul className="saved-project-list">
          {inbox.map((request) => (
            <li key={request.id}>
              <div className="project-item-content">
                <strong>{request.design?.title || 'Untitled memorial design'}</strong>
                <span>
                  {request.customer?.familyName || 'Unknown family'} • {request.customer?.email || 'No email'} • {request.status}
                </span>
                <span>
                  Submitted: {formatDateTime(request.submittedAt)}
                </span>
                <span>
                  Type: {formatSelectionValue(request.design?.type)} | Color: {formatSelectionValue(request.design?.color)} | Shape: {formatSelectionValue(request.design?.shape)}
                </span>
                <span>
                  Style: {formatSelectionValue(request.design?.designStyle)} | Cemetery: {request.customer?.cemeteryName || 'Not provided'}
                </span>
                {request.customer?.notes ? <span>Notes: {request.customer.notes}</span> : null}
                {request.design?.wording ? <span>Wording: {request.design.wording}</span> : null}
                {request.referralAttribution?.referralCode ? <span>Referral code: {request.referralAttribution.referralCode}</span> : null}
              </div>
              <div className="project-item-actions">
                <button
                  className="secondary-link project-action-button"
                  type="button"
                  onClick={() => handleStatusChange(request.id, 'IN_REVIEW')}
                  disabled={updatingId === request.id}
                >
                  Mark In Review
                </button>
                <button
                  className="secondary-link project-action-button"
                  type="button"
                  onClick={() => handleStatusChange(request.id, 'RESPONDED')}
                  disabled={updatingId === request.id}
                >
                  Mark Responded
                </button>
                <button
                  className="secondary-link project-action-button"
                  type="button"
                  onClick={() => handleStatusChange(request.id, 'DECLINED')}
                  disabled={updatingId === request.id}
                >
                  Decline
                </button>
                <button
                  className="secondary-link project-action-button"
                  type="button"
                  onClick={() => handleOpenChat(request.id)}
                  disabled={loadingMessagesForId === request.id}
                >
                  {loadingMessagesForId === request.id ? 'Loading chat...' : 'Open chat'}
                </button>
                <button
                  className="secondary-link project-action-button"
                  type="button"
                  onClick={() => handleOpenOffers(request.id)}
                  disabled={loadingOffersForId === request.id}
                >
                  {loadingOffersForId === request.id ? 'Loading quotes...' : 'Official quote'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedRequest ? (
        <article className="panel">
          <h3>Official quote</h3>
          <p className="panel-note">Create a polished quote card for {selectedRequest.requester?.name || selectedRequest.requester?.email || 'funeral home'}.</p>

          <div className="quote-offer-form">
            <label>
              Quote title
              <input
                type="text"
                value={selectedOfferDraft.title}
                onChange={(event) => handleOfferFieldChange(selectedRequest.id, 'title', event.target.value)}
              />
            </label>
            <label>
              Amount (USD)
              <input
                type="number"
                min="0"
                step="0.01"
                value={selectedOfferDraft.amount}
                onChange={(event) => handleOfferFieldChange(selectedRequest.id, 'amount', event.target.value)}
              />
            </label>
            <label>
              Lead time (days)
              <input
                type="number"
                min="0"
                step="1"
                value={selectedOfferDraft.leadTimeDays}
                onChange={(event) => handleOfferFieldChange(selectedRequest.id, 'leadTimeDays', event.target.value)}
              />
            </label>
            <label>
              Valid until
              <input
                type="date"
                value={selectedOfferDraft.validUntil}
                onChange={(event) => handleOfferFieldChange(selectedRequest.id, 'validUntil', event.target.value)}
              />
            </label>
            <label>
              Scope summary
              <textarea
                rows={2}
                value={selectedOfferDraft.scopeSummary}
                onChange={(event) => handleOfferFieldChange(selectedRequest.id, 'scopeSummary', event.target.value)}
                placeholder="Summarize materials, engraving, and included options"
              />
            </label>
            <label>
              Terms
              <textarea
                rows={2}
                value={selectedOfferDraft.terms}
                onChange={(event) => handleOfferFieldChange(selectedRequest.id, 'terms', event.target.value)}
                placeholder="Deposit, revision limits, delivery terms"
              />
            </label>
            <button
              className="quote-offer-send"
              type="button"
              onClick={() => handleSendOfficialQuote(selectedRequest.id)}
              disabled={sendingOfferForId === selectedRequest.id}
            >
              {sendingOfferForId === selectedRequest.id ? 'Sending official quote...' : 'Send official quote'}
            </button>
          </div>

          {selectedOffers.length > 0 ? (
            <div className="quote-offer-list">
              {selectedOffers.map((offer) => (
                <article key={offer.id} className={`quote-offer-card${offer.isCurrent ? ' current' : ''}`}>
                  <div className="quote-offer-header">
                    <h4>{offer.title}</h4>
                    <span>{offer.isCurrent ? 'Current' : 'Superseded'}</span>
                  </div>
                  <p className="quote-offer-amount">{formatMoney(offer.amountCents, offer.currency)}</p>
                  <p className="panel-note">Lead time: {offer.leadTimeDays ?? 'Not specified'} day(s)</p>
                  <p className="panel-note">Valid until: {offer.validUntil ? formatDateTime(offer.validUntil) : 'Not specified'}</p>
                  {offer.scopeSummary ? <p className="panel-note">Scope: {offer.scopeSummary}</p> : null}
                  {offer.terms ? <p className="panel-note">Terms: {offer.terms}</p> : null}
                </article>
              ))}
            </div>
          ) : null}

          <h3>Chat: {selectedRequest.design?.title || 'Quote request'}</h3>
          <p className="panel-note">Conversation with {selectedRequest.requester?.name || selectedRequest.requester?.email || 'funeral home'}.</p>
          {selectedMessages.length === 0 ? <p>No messages yet. Start the conversation below.</p> : null}
          {selectedMessages.length > 0 ? (
            <ul className="feature-list">
              {selectedMessages.map((message) => (
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
              value={messageDraftByRequestId[selectedRequest.id] || ''}
              onChange={(event) => {
                const nextValue = event.target.value;
                setMessageDraftByRequestId((currentState) => ({
                  ...currentState,
                  [selectedRequest.id]: nextValue,
                }));
              }}
              placeholder="Share pricing details, lead time, or follow-up questions"
            />
          </label>
          <button
            className="secondary-link project-action-button"
            type="button"
            onClick={() => handleSendMessage(selectedRequest.id)}
            disabled={sendingMessageForId === selectedRequest.id}
          >
            {sendingMessageForId === selectedRequest.id ? 'Sending...' : 'Send message'}
          </button>
        </article>
      ) : null}

      <div className="dashboard-actions">
        <Link className="dashboard-primary-link" to="/dealer-quotes">Open dedicated quote center</Link>
      </div>
    </section>
  );
}

export default DealerDashboard;
