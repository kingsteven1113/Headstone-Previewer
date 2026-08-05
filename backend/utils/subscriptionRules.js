export const PLAN_RULES = {
  trial: {
    label: 'Trial',
    projectLimit: 3,
  },
  free: {
    label: 'Free',
    projectLimit: 3,
  },
  professional: {
    label: 'Professional',
    projectLimit: null,
  },
  studio: {
    label: 'Studio',
    projectLimit: null,
  },
  enterprise: {
    label: 'Enterprise',
    projectLimit: null,
  },
};

export function normalizePlanName(planName) {
  const normalized = String(planName || 'trial').trim().toLowerCase();
  return PLAN_RULES[normalized] ? normalized : 'professional';
}

export function getPlanRules(planName) {
  return PLAN_RULES[normalizePlanName(planName)];
}

export function getProjectLimitForPlan(planName) {
  return getPlanRules(planName).projectLimit;
}

export function getProjectLimitMessage(planName) {
  const rules = getPlanRules(planName);

  if (rules.projectLimit === null) {
    return 'Your plan supports unlimited saved designs.';
  }

  return `${rules.label} includes up to ${rules.projectLimit} saved designs. Upgrade to Professional to save more.`;
}

export function isUnlimitedPlan(planName) {
  return getProjectLimitForPlan(planName) === null;
}