import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { canGenerateQuotes, getQuoteAccessMessage } from '../../utils/accessRules';
import { buildQuote } from '../../utils/quoteGenerator';
import { buildProposalText } from '../../utils/proposalExport';
import { getSavedProjects } from '../../utils/savedProjects';

function Quote() {
  const { user, plan, isAuthenticated } = useAuth();
  const [selectedProject, setSelectedProject] = useState(null);
  const [quote, setQuote] = useState(null);
  const [message, setMessage] = useState('');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const quoteAccessEnabled = canGenerateQuotes({ isAuthenticated, plan });

  useEffect(() => {
    if (!quoteAccessEnabled) {
      setIsLoading(false);
      setProjects([]);
      setSelectedProject(null);
      setQuote(null);
      return;
    }

    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const loadedProjects = await getSavedProjects();
        setProjects(loadedProjects);
        const fallbackProject = loadedProjects[0] || null;
        setSelectedProject(fallbackProject);
        setQuote(buildQuote(fallbackProject));
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects([]);
        setSelectedProject(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [quoteAccessEnabled]);

  const handleProjectChange = async (event) => {
    const projectId = event.target.value;
    const project = projects.find((entry) => entry.id === projectId) || null;
    setSelectedProject(project);
    setQuote(buildQuote(project));
    setMessage('');
  };

  const handleCopyProposal = async () => {
    if (!quote) {
      return;
    }

    const proposalText = buildProposalText({
      ...quote,
      preparedFor: user?.name || 'Client',
    });

    await navigator.clipboard.writeText(proposalText);
    setMessage('Proposal copied to clipboard.');
  };

  const handlePrintProposal = () => {
    if (!quote) {
      return;
    }

    const proposalText = buildProposalText({
      ...quote,
      preparedFor: user?.name || 'Client',
    });

    const printWindow = window.open('', '_blank', 'width=700,height=800');

    if (!printWindow) {
      setMessage('Please allow pop-ups to print the proposal.');
      return;
    }

    printWindow.document.write(`<pre>${proposalText}</pre>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    setMessage('Proposal prepared for printing.');
  };

  return (
    <section className="quote-card">
      <p className="eyebrow">Proposal builder</p>
      <h2>Generate a simple proposal</h2>
      <p>Use a saved design to create a polished memorial proposal draft.</p>

      {!quoteAccessEnabled ? (
        <div className="status-banner">
          <strong>Proposal access locked:</strong> {getQuoteAccessMessage({ isAuthenticated, plan })} <Link className="secondary-link" to="/pricing">View plans</Link>
        </div>
      ) : null}

      {quoteAccessEnabled && isLoading ? (
        <p>Loading your saved designs...</p>
      ) : quoteAccessEnabled ? (
        <>
          <label>
            Select a saved design
            <select value={selectedProject?.id || ''} onChange={handleProjectChange}>
              <option value="">No project selected</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </label>

          {quote ? (
            <>
              <div className="proposal-actions">
                <button className="quote-button" type="button" onClick={handleCopyProposal}>Copy proposal</button>
                <button className="quote-button" type="button" onClick={handlePrintProposal}>Print proposal</button>
              </div>
              {message ? <p className="form-message">{message}</p> : null}
              <div className="proposal-grid">
              <article className="proposal-panel">
                <h3>{quote.title}</h3>
                <p>{quote.summary}</p>
            <p><strong>Prepared for:</strong> {user?.name || 'Client'}</p>
          </article>
          <article className="proposal-panel">
            <h3>Design details</h3>
            <p><strong>Type:</strong> {quote.type}</p>
            <p><strong>Color:</strong> {quote.color}</p>
            <p><strong>Shape:</strong> {quote.shape}</p>
            <p><strong>Design style:</strong> {quote.designStyle}</p>
            <p><strong>Name:</strong> {quote.name || 'Not specified'}</p>
          </article>
          <article className="proposal-panel">
            <h3>Pricing</h3>
            <p><strong>Base:</strong> ${quote.basePrice}</p>
            <p><strong>Accessories:</strong> ${quote.accessorySurcharge}</p>
            <p><strong>Design style:</strong> ${quote.designStyleSurcharge}</p>
            <p><strong>Premium:</strong> ${quote.premiumSurcharge}</p>
            <p><strong>Total:</strong> ${quote.total}</p>
          </article>
          </div>
            </>
          ) : null}
        </>
      ) : null}
    </section>
  );
}

export default Quote;
