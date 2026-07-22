import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { canGenerateQuotes, canUseAdvancedPreviewer, getAdvancedPreviewerMessage, getQuoteAccessMessage, getUsageSummary } from '../../utils/accessRules';
import { formatDesignStyleLabel } from '../../utils/designStyles';
import { getSavedProjects, deleteProject, updateProject } from '../../utils/savedProjects';

function Dashboard() {
  const { user, plan, subscriptionStatus } = useAuth();
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const navigate = useNavigate();

  const planCopy = {
    trial: ['3 saved designs', 'Basic preview access', 'Upgrade path into paid workflow'],
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

  const handleLoadProject = (project) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('headstone-previewer-pending-project', JSON.stringify(project));
    }
    navigate('/');
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
          {!advancedPreviewEnabled ? <Link className="secondary-link" to="/pricing">Upgrade for advanced preview</Link> : <Link className="secondary-link" to="/">Open advanced previewer</Link>}
          <p className="panel-note">{quoteAccessEnabled ? 'Quote generation is also enabled on this account.' : 'Quote generation remains locked until you move above Trial.'}</p>
        </article>
      </div>

      <div className="dashboard-actions">
        <Link className="secondary-link" to="/pricing">View pricing</Link>
        <Link className="secondary-link" to="/">Back to previewer</Link>
      </div>
    </section>
  );
}

export default Dashboard;
