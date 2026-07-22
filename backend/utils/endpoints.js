export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/auth/login`,
  VERIFY: `${API_BASE_URL}/auth/verify`,

  // Projects
  PROJECTS: `${API_BASE_URL}/projects`,
  PROJECT: (id) => `${API_BASE_URL}/projects/${id}`,
};
