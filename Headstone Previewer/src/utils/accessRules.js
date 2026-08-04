const TRIAL_PROJECT_LIMIT = 3;

const PLAN_RULES = {
  trial: {
    canGenerateQuotes: false,
    canUseAdvancedPreviewer: false,
    projectLimit: TRIAL_PROJECT_LIMIT,
  },
  free: {
    canGenerateQuotes: false,
    canUseAdvancedPreviewer: false,
    projectLimit: TRIAL_PROJECT_LIMIT,
  },
  professional: {
    canGenerateQuotes: true,
    canUseAdvancedPreviewer: false,
    projectLimit: null,
  },
  studio: {
    canGenerateQuotes: true,
    canUseAdvancedPreviewer: true,
    projectLimit: null,
  },
  enterprise: {
    canGenerateQuotes: true,
    canUseAdvancedPreviewer: true,
    projectLimit: null,
  },
};

function normalizePlan(plan) {
  const normalized = String(plan || 'trial').trim().toLowerCase();
  return PLAN_RULES[normalized] ? normalized : 'trial';
}

function getPlanRules(plan) {
  return PLAN_RULES[normalizePlan(plan)];
}

export function canSaveProjects({ isAuthenticated, plan = 'trial', projectCount = 0, currentProjectId = null }) {
  if (!isAuthenticated) {
    return false;
  }

  if (currentProjectId) {
    return true;
  }

  const { projectLimit } = getPlanRules(plan);
  if (projectLimit === null) {
    return true;
  }

  return Number(projectCount) < projectLimit;
}

export function getSaveProjectMessage({ isAuthenticated, plan = 'trial', projectCount = 0, currentProjectId = null }) {
  if (!isAuthenticated) {
    return 'Create an account to save and share your memorial designs.';
  }

  if (currentProjectId) {
    return 'Design updated successfully.';
  }

  const { projectLimit } = getPlanRules(plan);
  if (projectLimit !== null && Number(projectCount) >= projectLimit) {
    return `Your ${normalizePlan(plan)} plan includes up to ${projectLimit} saved designs. Upgrade to Professional to save more.`;
  }

  return 'Design saved to your project list.';
}

export function canGenerateQuotes({ isAuthenticated, plan = 'trial' }) {
  if (!isAuthenticated) {
    return false;
  }

  return getPlanRules(plan).canGenerateQuotes;
}

export function getQuoteAccessMessage({ isAuthenticated, plan = 'trial' }) {
  if (!isAuthenticated) {
    return 'Create an account to unlock quote generation and proposal tools.';
  }

  if (canGenerateQuotes({ isAuthenticated, plan })) {
    return 'Quote generation is available on your current plan.';
  }

  return 'Quote generation is available on Professional plans and above.';
}

export function canUseAdvancedPreviewer({ isAuthenticated, plan = 'trial' }) {
  if (!isAuthenticated) {
    return false;
  }

  return getPlanRules(plan).canUseAdvancedPreviewer;
}

export function getAdvancedPreviewerMessage({ isAuthenticated, plan = 'trial' }) {
  if (!isAuthenticated) {
    return 'Create an account to unlock the advanced preview workflow.';
  }

  if (canUseAdvancedPreviewer({ isAuthenticated, plan })) {
    return 'Advanced preview mode unlocked for this account.';
  }

  return 'Upgrade to Studio to unlock advanced design-style controls in the previewer.';
}

export function getUsageSummary({ plan = 'trial', projectCount = 0 }) {
  const { projectLimit } = getPlanRules(plan);

  if (projectLimit === null) {
    return {
      usageLabel: `${projectCount} saved project${projectCount === 1 ? '' : 's'}`,
      isUnlimited: true,
      projectLimit: null,
      remainingProjects: null,
    };
  }

  const safeCount = Math.max(0, Number(projectCount) || 0);
  const remainingProjects = Math.max(0, projectLimit - safeCount);

  return {
    usageLabel: `${safeCount}/${projectLimit} saved projects`,
    isUnlimited: false,
    projectLimit,
    remainingProjects,
  };
}
