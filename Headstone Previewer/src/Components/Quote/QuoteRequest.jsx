import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { buildQuoteRequestIntake, saveQuoteRequestIntake } from '../../utils/quoteRequestIntake';
import { useAuth } from '../../context/AuthContext';
import { canUseAdvancedPreviewer } from '../../utils/accessRules';
import { PREVIEW_CATALOG } from '../../utils/previewCatalog';
import { apiClient } from '../../utils/apiClient';

const DEFAULT_DRAFT = {
  title: 'Untitled memorial design',
  type: null,
  color: null,
  shape: null,
  designStyle: 'Standard',
  wording: '',
  accessories: [],
  additionalCategorySelections: {},
};

const formatSelectionValue = (value) => {
  if (!value) {
    return 'Not selected';
  }

  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
};

function QuoteRequest() {
  const { isAuthenticated, plan, user } = useAuth();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [draft, setDraft] = useState(DEFAULT_DRAFT);
  const [dealers, setDealers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDealers, setIsLoadingDealers] = useState(false);
  const [formData, setFormData] = useState({
    familyName: '',
    email: '',
    phone: '',
    appointmentWindow: '',
    notes: '',
    cemeteryName: '',
    dealerUserId: '',
    preferredDealer: '',
    referralCode: '',
  });

  useEffect(() => {
    const locationDraft = location.state?.quoteRequestDraft;
    let savedDraft = null;

    if (typeof window !== 'undefined') {
      const storedDraft = window.sessionStorage.getItem('headstone-previewer-quote-request');
      if (storedDraft) {
        try {
          savedDraft = JSON.parse(storedDraft);
        } catch (error) {
          console.warn('Unable to parse quote request draft from session storage', error);
        }
      }
    }

    const nextDraft = locationDraft || savedDraft || DEFAULT_DRAFT;
    setDraft(nextDraft);
    setFormData((currentData) => ({
      ...currentData,
      notes: nextDraft.wording || currentData.notes,
    }));
  }, [location.state]);

  useEffect(() => {
    const loadDealers = async () => {
      try {
        setIsLoadingDealers(true);
        const response = await apiClient.getVerifiedDealers();
        const dealerOptions = Array.isArray(response) ? response : [];
        setDealers(dealerOptions);
        setFormData((currentData) => ({
          ...currentData,
          dealerUserId: currentData.dealerUserId || dealerOptions[0]?.id || '',
          preferredDealer: currentData.preferredDealer || dealerOptions[0]?.businessName || '',
        }));
      } catch (error) {
        console.error('Failed to load dealer directory:', error);
        setMessage(error.message || 'Unable to load dealer directory right now.');
      } finally {
        setIsLoadingDealers(false);
      }
    };

    loadDealers();
  }, []);

  const hasStudioTierAccess = canUseAdvancedPreviewer({ isAuthenticated, plan });

  const additionalCategorySummary = useMemo(() => {
    if (!hasStudioTierAccess) {
      return [];
    }

    const selectedCategories = draft.additionalCategorySelections || {};
    const categories = PREVIEW_CATALOG.options.additionalCategories || [];
    const categoryOptions = PREVIEW_CATALOG.options.additionalCategoryOptions || {};

    return categories.map((category) => {
      const rawValue = selectedCategories[category.key] || null;
      const options = categoryOptions[category.key] || [];
      const selectedOption = options.find((option) => option.value === rawValue);

      if (selectedOption) {
        return {
          key: category.key,
          label: category.label,
          value: selectedOption.label,
        };
      }

      if (rawValue) {
        return {
          key: category.key,
          label: category.label,
          value: formatSelectionValue(rawValue),
        };
      }

      return {
        key: category.key,
        label: category.label,
        value: options.length ? 'Not selected' : 'Coming soon',
      };
    });
  }, [draft.additionalCategorySelections, hasStudioTierAccess]);

  const accessorySummary = useMemo(() => {
    if (!draft.accessories?.length) {
      return 'None selected';
    }

    return draft.accessories.join(', ');
  }, [draft.accessories]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!formData.dealerUserId) {
      setMessage('Select a dealer before submitting your quote request.');
      return;
    }

    const intakePayload = buildQuoteRequestIntake({
      draft,
      formData,
    });

    try {
      setIsSubmitting(true);
      const selectedDealer = dealers.find((dealer) => dealer.id === formData.dealerUserId) || null;

      const createdRequest = await apiClient.createQuoteRequest({
        dealerUserId: formData.dealerUserId,
        customer: intakePayload.customer,
        design: intakePayload.design,
        referralAttribution: {
          ...intakePayload.referralAttribution,
          preferredDealer: intakePayload.referralAttribution.preferredDealer || selectedDealer?.businessName || null,
        },
      });

      saveQuoteRequestIntake({
        ...intakePayload,
        status: createdRequest.status,
        quoteRequestId: createdRequest.id,
      });

      setMessage(`Quote request sent to ${createdRequest.dealer?.businessName || createdRequest.dealer?.name || 'selected dealer'}. They can now respond from their dealer inbox.`);
    } catch (error) {
      console.error('Failed to submit quote request:', error);
      setMessage(error.message || 'Quote request submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDealerAccount = String(user?.role || '').toUpperCase() === 'DEALER' || String(user?.role || '').toUpperCase() === 'DEALER_PENDING';

  return (
    <section className='quote-request-card'>
      <p className='eyebrow'>Quote request</p>
      <h2>Request a memorial quote</h2>
      <p>Review your design details and submit your contact information for follow-up.</p>

      <div className='quote-request-layout'>
        <article className='quote-request-summary'>
          <h3>Selected design</h3>
          <p><strong>Design name:</strong> {draft.title || DEFAULT_DRAFT.title}</p>
          <p><strong>Type:</strong> {formatSelectionValue(draft.type)}</p>
          <p><strong>Color:</strong> {formatSelectionValue(draft.color)}</p>
          <p><strong>Shape:</strong> {formatSelectionValue(draft.shape)}</p>
          <p><strong>Design style:</strong> {formatSelectionValue(draft.designStyle)}</p>
          <p><strong>Accessories:</strong> {accessorySummary}</p>
          {hasStudioTierAccess
            ? additionalCategorySummary.map((category) => (
                <p key={category.key}><strong>{category.label}:</strong> {category.value}</p>
              ))
            : null}
          {draft.wording ? <p><strong>Wording draft:</strong> {draft.wording}</p> : null}
          <div className='quote-request-links'>
            <Link className='secondary-link' to='/preview'>Back to previewer</Link>
            <Link className='secondary-link' to='/quote'>Open proposal builder</Link>
          </div>
        </article>

        <form className='quote-request-form' onSubmit={handleSubmit}>
          {isLoadingDealers ? <p>Loading dealer directory...</p> : null}

          <label>
            Select monument dealer
            <select
              name='dealerUserId'
              value={formData.dealerUserId}
              onChange={(event) => {
                const selectedDealer = dealers.find((dealer) => dealer.id === event.target.value) || null;
                setFormData((currentData) => ({
                  ...currentData,
                  dealerUserId: event.target.value,
                  preferredDealer: selectedDealer?.businessName || currentData.preferredDealer,
                }));
              }}
              required
              disabled={isSubmitting || isLoadingDealers || isDealerAccount}
            >
              <option value=''>Choose a dealer</option>
              {dealers.map((dealer) => (
                <option key={dealer.id} value={dealer.id}>
                  {dealer.businessName}
                </option>
              ))}
            </select>
          </label>

          <label>
            Family or customer name
            <input
              type='text'
              name='familyName'
              value={formData.familyName}
              onChange={handleChange}
              placeholder='Who is this proposal for?'
              required
              disabled={isSubmitting || isDealerAccount}
            />
          </label>

          <label>
            Contact email
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='name@example.com'
              required
              disabled={isSubmitting || isDealerAccount}
            />
          </label>

          <label>
            Contact phone
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Best callback number'
              required
              disabled={isSubmitting || isDealerAccount}
            />
          </label>

          <label>
            Preferred appointment window
            <input
              type='text'
              name='appointmentWindow'
              value={formData.appointmentWindow}
              onChange={handleChange}
              placeholder='Example: Weekday afternoons'
              disabled={isSubmitting || isDealerAccount}
            />
          </label>

          <label>
            Cemetery name
            <input
              type='text'
              name='cemeteryName'
              value={formData.cemeteryName}
              onChange={handleChange}
              placeholder='Example: Oak Hill Memorial Park'
              disabled={isSubmitting || isDealerAccount}
            />
          </label>

          <label>
            Preferred monument dealer
            <input
              type='text'
              name='preferredDealer'
              value={formData.preferredDealer}
              onChange={handleChange}
              placeholder='Used for referral attribution and quote routing'
              disabled={isSubmitting || isDealerAccount}
            />
          </label>

          <label>
            Dealer referral code (optional)
            <input
              type='text'
              name='referralCode'
              value={formData.referralCode}
              onChange={handleChange}
              placeholder='Example: LEGACY-2026'
              disabled={isSubmitting || isDealerAccount}
            />
          </label>

          <label>
            Notes and wording
            <textarea
              name='notes'
              value={formData.notes}
              onChange={handleChange}
              placeholder='Share inscription notes or family preferences'
              rows={5}
              disabled={isSubmitting || isDealerAccount}
            />
          </label>

          {isDealerAccount ? <p className='form-message'>Dealer accounts can review inbound requests from the dashboard inbox.</p> : null}

          <button className='quote-button' type='submit' disabled={isSubmitting || isDealerAccount || isLoadingDealers || !dealers.length}>
            {isSubmitting ? 'Submitting request...' : 'Send quote request to dealer'}
          </button>
          {message ? <p className='form-message'>{message}</p> : null}
        </form>
      </div>
    </section>
  );
}

export default QuoteRequest;
