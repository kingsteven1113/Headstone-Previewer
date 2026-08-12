import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentValue) => ({ ...currentValue, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!formData.email || !formData.password) {
      setMessage('Please enter your email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');
      await login({
        email: formData.email,
        name: formData.email.split('@')[0],
        plan: 'professional',
        subscriptionStatus: 'active',
      });
      setMessage('Signed in successfully.');
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.message || 'Sign-in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-card">
      <div className="auth-intro">
        <p className="eyebrow">Member access</p>
        <h2>Welcome back</h2>
        <p>Sign in to manage your memorial design workspace and your subscription.</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} />
        </label>
        <label>
          Password
          <input type="password" name="password" value={formData.password} onChange={handleChange} required disabled={isSubmitting} />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="loading-spinner" aria-hidden="true" />
              Signing in...
            </>
          ) : (
            'Continue'
          )}
        </button>
      </form>
      {message ? <p className="form-message">{message}</p> : null}
      <p className="auth-footer">
        Need an account? <Link to="/signup">Create one</Link>
      </p>
    </section>
  );
}

export default Login;
