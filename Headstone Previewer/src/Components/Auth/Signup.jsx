import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'manager' });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentValue) => ({ ...currentValue, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setMessage('Please complete all required fields before creating your account.');
      return;
    }

    try {
      await signup({
        email: formData.email,
        name: formData.name,
        plan: 'trial',
        subscriptionStatus: 'free',
      });
      setMessage('Account created. You can now explore the trial workspace.');
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.message || 'Account creation failed. Please try again.');
    }
  };

  return (
    <section className="auth-card">
      <div className="auth-intro">
        <p className="eyebrow">Create account</p>
        <h2>Launch your funeral-home workspace</h2>
        <p>Set up your team profile and start a free trial for the previewer experience.</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Business name
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>
          Role
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="manager">Funeral Home Manager</option>
            <option value="sales">Sales Rep</option>
          </select>
        </label>
        <button type="submit">Create account</button>
      </form>
      {message ? <p className="form-message">{message}</p> : null}
      <p className="auth-footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
      <p className="auth-footer">
        Monument Dealer? <Link to="/dealer-signup">Create a verified dealer account</Link>
      </p>
    </section>
  );
}

export default Signup;
