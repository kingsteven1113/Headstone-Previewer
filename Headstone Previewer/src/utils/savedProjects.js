import { getStoredAuthState } from './authState.js';
import { apiClient } from './apiClient.js';

// Fallback to localStorage if API is unavailable
const USE_API = true;
const MEMORY_STORAGE = new Map();
let projectsCache = [];
let cacheLoaded = false;

function hasAuthenticatedApiSession() {
  return USE_API && Boolean(apiClient.getToken());
}

async function loadProjectsFromAPI() {
  const projects = await apiClient.getProjects();
  projectsCache = projects;
  cacheLoaded = true;
  return projects;
}

// Legacy localStorage functions for backward compatibility
function getLegacyStorageKey() {
  const authState = getStoredAuthState();
  const accountEmail = authState?.user?.email?.trim().toLowerCase();

  if (authState?.isAuthenticated && accountEmail) {
    return `headstone-previewer-projects:${accountEmail}`;
  }

  return 'headstone-previewer-projects:guest';
}

function getStorageFromLocalStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }

  if (typeof globalThis.localStorage !== 'undefined') {
    return globalThis.localStorage;
  }

  return {
    getItem(key) {
      return MEMORY_STORAGE.has(key) ? MEMORY_STORAGE.get(key) : null;
    },
    setItem(key, value) {
      MEMORY_STORAGE.set(key, value);
    },
    removeItem(key) {
      MEMORY_STORAGE.delete(key);
    },
  };
}

export async function getSavedProjects() {
  if (hasAuthenticatedApiSession()) {
    try {
      if (!cacheLoaded) {
        return await loadProjectsFromAPI();
      }
      return projectsCache;
    } catch (error) {
      console.error('Error getting projects from API:', error);
      throw error;
    }
  }

  // Fallback to localStorage
  try {
    const storage = getStorageFromLocalStorage();
    if (!storage) return [];

    const storageKey = getLegacyStorageKey();
    const rawProjects = storage.getItem(storageKey);

    if (rawProjects) {
      return JSON.parse(rawProjects);
    }
  } catch (error) {
    console.warn('Unable to read saved projects from storage:', error);
  }

  return [];
}

export async function getSavedProjectById(projectId) {
  try {
    if (hasAuthenticatedApiSession()) {
      return await apiClient.getProject(projectId);
    }
  } catch (error) {
    console.error('Error getting project from API:', error);
    throw error;
  }

  // Fallback to localStorage
  const projects = await getSavedProjects();
  return projects.find((project) => project.id === projectId) ?? null;
}

export async function saveProject(project) {
  try {
    if (hasAuthenticatedApiSession()) {
      const newProject = await apiClient.createProject({
        title: project.title || 'Saved design',
        type: project.type || 'Custom',
        color: project.color || 'Custom',
        shape: project.shape || 'Custom',
        designStyle: project.designStyle || 'Standard',
        name: project.name ?? '',
        wording: project.wording || '',
        accessories: Array.isArray(project.accessories) ? project.accessories : [],
      });

      // Update cache
      projectsCache = [newProject, ...projectsCache];
      cacheLoaded = true;
      return projectsCache;
    }
  } catch (error) {
    console.error('Error saving project to API:', error);
    throw error;
  }

  // Fallback to localStorage
  const storage = getStorageFromLocalStorage();
  if (!storage) return [];

  const storageKey = getLegacyStorageKey();
  const projects = JSON.parse(storage.getItem(storageKey) || '[]');

  const normalizedProject = {
    id: project.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: project.title || 'Saved design',
    type: project.type || 'Custom',
    color: project.color || 'Custom',
    shape: project.shape || 'Custom',
    designStyle: project.designStyle || 'Standard',
    name: project.name ?? '',
    wording: project.wording || '',
    accessories: Array.isArray(project.accessories) ? project.accessories : [],
    createdAt: project.createdAt || new Date().toISOString(),
  };

  const updatedProjects = [normalizedProject, ...projects].slice(0, 10);
  storage.setItem(storageKey, JSON.stringify(updatedProjects));
  return updatedProjects;
}

export async function deleteProject(projectId) {
  try {
    if (hasAuthenticatedApiSession()) {
      await apiClient.deleteProject(projectId);
      projectsCache = projectsCache.filter((p) => p.id !== projectId);
      return projectsCache;
    }
  } catch (error) {
    console.error('Error deleting project from API:', error);
    throw error;
  }

  // Fallback to localStorage
  const storage = getStorageFromLocalStorage();
  if (!storage) return [];

  const storageKey = getLegacyStorageKey();
  const projects = JSON.parse(storage.getItem(storageKey) || '[]');
  const updatedProjects = projects.filter((project) => project.id !== projectId);
  storage.setItem(storageKey, JSON.stringify(updatedProjects));
  return updatedProjects;
}

export async function updateProject(projectId, updates) {
  try {
    if (hasAuthenticatedApiSession()) {
      const updatedProject = await apiClient.updateProject(projectId, updates);
      projectsCache = projectsCache.map((p) =>
        p.id === projectId ? updatedProject : p
      );
      cacheLoaded = true;
      return projectsCache;
    }
  } catch (error) {
    console.error('Error updating project in API:', error);
    throw error;
  }

  // Fallback to localStorage
  const storage = getStorageFromLocalStorage();
  if (!storage) return [];

  const storageKey = getLegacyStorageKey();
  const projects = JSON.parse(storage.getItem(storageKey) || '[]');
  const updatedProjects = projects.map((project) =>
    project.id === projectId ? { ...project, ...updates } : project
  );
  storage.setItem(storageKey, JSON.stringify(updatedProjects));
  return updatedProjects;
}

export function clearSavedProjects() {
  projectsCache = [];
  cacheLoaded = false;
  
  const storage = getStorageFromLocalStorage();
  if (storage) {
    const storageKey = getLegacyStorageKey();
    storage.removeItem(storageKey);
  }
}
