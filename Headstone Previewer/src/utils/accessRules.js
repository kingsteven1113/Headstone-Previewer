export function canSaveProjects({ isAuthenticated }) {
  return Boolean(isAuthenticated);
}

export function getSaveProjectMessage({ isAuthenticated }) {
  if (!isAuthenticated) {
    return 'Create an account to save and share your memorial designs.';
  }

  return 'Design saved to your project list.';
}
