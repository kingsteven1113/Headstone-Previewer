import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../../utils/apiClient';
import { useAuth } from '../../context/AuthContext';

const DEFAULT_FORM = {
  name: '',
  email: '',
  businessName: '',
  businessPhone: '',
  website: '',
  taxIdLast4: '',
};

function DealerSignup() {
  const navigate = useNavigate();
  const { refreshAuthUser } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [verificationCode, setVerificationCode] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [message, setMessage] = useState('');
  const [devCodeHint, setDevCodeHint] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleRegisterDealer = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!formData.name || !formData.email || !formData.businessName || !formData.businessPhone) {
      setMessage('Please complete all required fields before continuing.');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      const response = await apiClient.registerDealer({
        name: formData.name,
        email: formData.email,
        businessName: formData.businessName,
        businessPhone: formData.businessPhone,
        website: formData.website,
        taxIdLast4: formData.taxIdLast4,
      });

      setRegisteredEmail(response.email || formData.email);
      setDevCodeHint(response.verificationCode || '');
      setStep(2);
      setMessage(response.message || 'Verification code sent. Enter it below to activate your dealer account.');
    } catch (error) {
      setMessage(error.message || 'Dealer registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!verificationCode.trim()) {
      setMessage('Enter the verification code to complete onboarding.');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      await apiClient.verifyDealerCode(registeredEmail || formData.email, verificationCode.trim());
      await refreshAuthUser();

      setMessage('Dealer account verified successfully. Redirecting to your dashboard...');
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.message || 'Verification failed. Check the code and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-card">
      <div className="auth-intro">
        <p className="eyebrow">Dealer onboarding</p>
        <h2>Create a Monument Dealer account</h2>
        <p>Dealer access uses a two-step verification flow to confirm legitimate business enrollment.</p>
      </div>

      {step === 1 ? (
        <form className="auth-form" onSubmit={handleRegisterDealer} aria-busy={isSubmitting}>
          <label>
            Contact name
            <input type="text" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} />
          </label>
          <label>
            Business email
            <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} />
          </label>
          <label>
            Dealer business name
            <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required disabled={isSubmitting} />
          </label>
          <label>
            Business phone
            <input type="tel" name="businessPhone" value={formData.businessPhone} onChange={handleChange} required disabled={isSubmitting} />
          </label>
          <label>
            Website (optional)
            <input type="url" name="website" value={formData.website} onChange={handleChange} disabled={isSubmitting} />
          </label>
          <label>
            Tax ID last 4 (optional)
            <input type="text" name="taxIdLast4" value={formData.taxIdLast4} onChange={handleChange} maxLength={4} disabled={isSubmitting} />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Continue to verification'}
          </button>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleVerifyCode} aria-busy={isSubmitting}>
          <label>
            Verification code
            <input
              type="text"
              name="verificationCode"
              value={verificationCode}
              onChange={(event) => setVerificationCode(event.target.value)}
              placeholder="Enter 6-digit code"
              required
              disabled={isSubmitting}
            />
          </label>
          {devCodeHint ? <p className="form-message">Dev code: {devCodeHint}</p> : null}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying...' : 'Verify dealer account'}
          </button>
          <button
            type="button"
            className="secondary-link"
            onClick={() => {
              setStep(1);
              setVerificationCode('');
            }}
            disabled={isSubmitting}
          >
            Edit registration details
          </button>
        </form>
      )}

      {message ? <p className="form-message">{message}</p> : null}

      <p className="auth-footer">
        Looking for a funeral-home account? <Link to="/signup">Create standard account</Link>
      </p>
      <p className="auth-footer">
        Already verified? <Link to="/login">Sign in</Link>
      </p>
    </section>
  );
}

export default DealerSignup;
