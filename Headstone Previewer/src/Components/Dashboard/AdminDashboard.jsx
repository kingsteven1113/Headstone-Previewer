import { useEffect, useState } from 'react';
import { apiClient } from '../../utils/apiClient';

const SUBSCRIPTION_STATUSES = ['trial', 'active', 'past_due', 'canceled', 'free'];
const PLAN_OPTIONS = ['trial', 'professional', 'studio', 'enterprise'];
const PAYMENT_STATUSES = ['pending', 'succeeded', 'failed', 'refunded'];

function formatCurrency(cents, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format((cents || 0) / 100);
}

function AdminDashboard() {
  const [overview, setOverview] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [isSavingSubscription, setIsSavingSubscription] = useState(null);
  const [isSavingPayment, setIsSavingPayment] = useState(false);
  const [editableSubscriptions, setEditableSubscriptions] = useState({});
  const [paymentForm, setPaymentForm] = useState({
    userId: '',
    amount: '',
    currency: 'usd',
    status: 'succeeded',
    provider: 'manual',
    providerPaymentId: '',
    paidAt: '',
  });

  const loadAdminData = async ({ withLoading = true } = {}) => {
    try {
      if (withLoading) {
        setIsLoading(true);
      }
      setError('');

      const [overviewData, accountsData, paymentsData] = await Promise.all([
        apiClient.getAdminOverview(),
        apiClient.getAdminAccounts(),
        apiClient.getAdminPayments(50),
      ]);

      setOverview(overviewData);
      setAccounts(accountsData);
      setPayments(paymentsData);

      setEditableSubscriptions((current) => {
        const nextState = { ...current };
        accountsData.forEach((account) => {
          if (!nextState[account.id]) {
            nextState[account.id] = {
              plan: account.subscription.plan,
              status: account.subscription.status,
            };
          }
        });
        return nextState;
      });
    } catch (loadError) {
      console.error('Failed to load admin dashboard data:', loadError);
      setError(loadError.message || 'Failed to load admin dashboard data.');
    } finally {
      if (withLoading) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleSubscriptionFieldChange = (accountId, field, value) => {
    setEditableSubscriptions((current) => ({
      ...current,
      [accountId]: {
        ...(current[accountId] || {}),
        [field]: value,
      },
    }));
  };

  const getPlanOptionsForAccount = (accountId, fallbackPlan) => {
    const selectedPlan = editableSubscriptions[accountId]?.plan || fallbackPlan || 'trial';
    if (PLAN_OPTIONS.includes(selectedPlan)) {
      return PLAN_OPTIONS;
    }

    // Preserve uncommon historical/custom plan names while still offering standard choices.
    return [selectedPlan, ...PLAN_OPTIONS];
  };

  const handleSubscriptionSave = async (accountId) => {
    const draft = editableSubscriptions[accountId];
    if (!draft?.plan || !draft?.status) {
      setActionMessage('Plan and status are required before saving.');
      return;
    }

    try {
      setActionMessage('');
      setIsSavingSubscription(accountId);

      await apiClient.upsertSubscription({
        userId: accountId,
        planName: draft.plan,
        status: draft.status,
      });

      await loadAdminData({ withLoading: false });
      setActionMessage('Subscription updated successfully.');
    } catch (saveError) {
      console.error('Failed to save subscription:', saveError);
      setActionMessage(saveError.message || 'Failed to save subscription.');
    } finally {
      setIsSavingSubscription(null);
    }
  };

  const handlePaymentInputChange = (field, value) => {
    setPaymentForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCreatePayment = async (event) => {
    event.preventDefault();

    if (!paymentForm.userId) {
      setActionMessage('Select an account before creating a payment.');
      return;
    }

    const amount = Number.parseFloat(paymentForm.amount);
    if (!Number.isFinite(amount) || amount < 0) {
      setActionMessage('Enter a valid non-negative payment amount.');
      return;
    }

    try {
      setActionMessage('');
      setIsSavingPayment(true);

      await apiClient.createPayment({
        userId: paymentForm.userId,
        amountCents: Math.round(amount * 100),
        currency: paymentForm.currency || 'usd',
        status: paymentForm.status,
        provider: paymentForm.provider || 'manual',
        providerPaymentId: paymentForm.providerPaymentId || null,
        paidAt: paymentForm.paidAt || null,
      });

      setPaymentForm({
        userId: paymentForm.userId,
        amount: '',
        currency: paymentForm.currency || 'usd',
        status: paymentForm.status || 'succeeded',
        provider: paymentForm.provider || 'manual',
        providerPaymentId: '',
        paidAt: '',
      });

      await loadAdminData({ withLoading: false });
      setActionMessage('Payment recorded successfully.');
    } catch (saveError) {
      console.error('Failed to create payment:', saveError);
      setActionMessage(saveError.message || 'Failed to create payment.');
    } finally {
      setIsSavingPayment(false);
    }
  };

  if (isLoading) {
    return (
      <section className="dashboard-card">
        <p className="eyebrow">Admin console</p>
        <h2>Loading account and payment data...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-card">
        <p className="eyebrow">Admin console</p>
        <h2>Unable to load dashboard</h2>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="dashboard-card">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Admin console</p>
          <h2>Business operations overview</h2>
        </div>
      </div>

      {actionMessage ? <p className="admin-action-message">{actionMessage}</p> : null}

      {overview ? (
        <div className="dashboard-grid admin-stats-grid">
          <article className="panel">
            <h3>Total accounts</h3>
            <p className="admin-stat-value">{overview.totalAccounts}</p>
          </article>
          <article className="panel">
            <h3>Active subscriptions</h3>
            <p className="admin-stat-value">{overview.activeSubscriptions}</p>
          </article>
          <article className="panel">
            <h3>Trial subscriptions</h3>
            <p className="admin-stat-value">{overview.trialSubscriptions}</p>
          </article>
          <article className="panel">
            <h3>Tracked revenue</h3>
            <p className="admin-stat-value">{formatCurrency(overview.totalRevenueCents)}</p>
          </article>
        </div>
      ) : null}

      <div className="admin-panel-grid">
        <article className="panel admin-table-panel">
          <h3>Accounts</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Projects</th>
                  <th>Total Paid</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.email}</td>
                    <td>{account.role}</td>
                    <td>
                      <select
                        className="admin-inline-select"
                        value={editableSubscriptions[account.id]?.plan || account.subscription.plan}
                        onChange={(event) => handleSubscriptionFieldChange(account.id, 'plan', event.target.value)}
                      >
                        {getPlanOptionsForAccount(account.id, account.subscription.plan).map((planOption) => (
                          <option key={planOption} value={planOption}>
                            {planOption}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="admin-inline-select"
                        value={editableSubscriptions[account.id]?.status || account.subscription.status}
                        onChange={(event) => handleSubscriptionFieldChange(account.id, 'status', event.target.value)}
                      >
                        {SUBSCRIPTION_STATUSES.map((statusOption) => (
                          <option key={statusOption} value={statusOption}>
                            {statusOption}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{account.projectCount}</td>
                    <td>{formatCurrency(account.totalPaidCents)}</td>
                    <td>
                      <button
                        className="admin-inline-button"
                        type="button"
                        onClick={() => handleSubscriptionSave(account.id)}
                        disabled={isSavingSubscription === account.id}
                      >
                        {isSavingSubscription === account.id ? 'Saving...' : 'Save'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel admin-table-panel">
          <h3>Record payment</h3>
          <form className="admin-payment-form" onSubmit={handleCreatePayment}>
            <label>
              Account
              <select
                value={paymentForm.userId}
                onChange={(event) => handlePaymentInputChange('userId', event.target.value)}
                required
              >
                <option value="">Select account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.email}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Amount (USD)
              <input
                type="number"
                min="0"
                step="0.01"
                value={paymentForm.amount}
                onChange={(event) => handlePaymentInputChange('amount', event.target.value)}
                required
              />
            </label>

            <label>
              Status
              <select
                value={paymentForm.status}
                onChange={(event) => handlePaymentInputChange('status', event.target.value)}
              >
                {PAYMENT_STATUSES.map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {statusOption}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Provider
              <input
                type="text"
                value={paymentForm.provider}
                onChange={(event) => handlePaymentInputChange('provider', event.target.value)}
                placeholder="manual, stripe, etc."
              />
            </label>

            <label>
              Provider payment ID
              <input
                type="text"
                value={paymentForm.providerPaymentId}
                onChange={(event) => handlePaymentInputChange('providerPaymentId', event.target.value)}
                placeholder="Optional"
              />
            </label>

            <label>
              Paid at
              <input
                type="datetime-local"
                value={paymentForm.paidAt}
                onChange={(event) => handlePaymentInputChange('paidAt', event.target.value)}
              />
            </label>

            <button className="admin-payment-submit" type="submit" disabled={isSavingPayment}>
              {isSavingPayment ? 'Saving payment...' : 'Record payment'}
            </button>
          </form>
        </article>

        <article className="panel admin-table-panel">
          <h3>Recent payments</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Provider</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.userEmail}</td>
                    <td>{formatCurrency(payment.amountCents, payment.currency)}</td>
                    <td>{payment.status}</td>
                    <td>{payment.provider}</td>
                    <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  );
}

export default AdminDashboard;
