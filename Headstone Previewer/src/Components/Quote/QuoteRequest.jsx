import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DEFAULT_DRAFT = {
  title: 'Untitled memorial design',
  type: null,
  color: null,
  shape: null,
  designStyle: 'Standard',
  wording: '',
  accessories: [],
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
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [draft, setDraft] = useState(DEFAULT_DRAFT);
  const [formData, setFormData] = useState({
    familyName: '',
    email: '',
    phone: '',
    appointmentWindow: '',
    notes: '',
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('Quote request draft ready. Next step is wiring this form to backend inquiry endpoints.');
  };

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
          {draft.wording ? <p><strong>Wording draft:</strong> {draft.wording}</p> : null}
          <div className='quote-request-links'>
            <Link className='secondary-link' to='/preview'>Back to previewer</Link>
            <Link className='secondary-link' to='/quote'>Open proposal builder</Link>
          </div>
        </article>

        <form className='quote-request-form' onSubmit={handleSubmit}>
          <label>
            Family or customer name
            <input
              type='text'
              name='familyName'
              value={formData.familyName}
              onChange={handleChange}
              placeholder='Who is this proposal for?'
              required
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
            />
          </label>

          <button className='quote-button' type='submit'>Submit quote request draft</button>
          {message ? <p className='form-message'>{message}</p> : null}
        </form>
      </div>
    </section>
  );
}

export default QuoteRequest;
