import test from 'node:test';
import assert from 'node:assert/strict';
import { clearSavedProjects, getSavedProjectById, getSavedProjects, saveProject } from './savedProjects.js';
import { clearStoredAuthState, saveAuthState } from './authState.js';

test('saveProject stores a new project and returns the updated list', () => {
  clearSavedProjects();

  const savedProjects = saveProject({
    title: 'Family Tribute',
    type: 'Die_And_Base',
    color: 'Impala_Black',
    shape: 'Heart_Shape',
    wording: 'Forever in our hearts',
  });

  const projects = getSavedProjects();

  assert.equal(projects.length, 1);
  assert.equal(savedProjects[0].title, 'Family Tribute');
  assert.equal(projects[0].type, 'Die_And_Base');
  assert.equal(projects[0].wording, 'Forever in our hearts');
});

test('clearSavedProjects removes persisted projects', () => {
  saveProject({ title: 'Project 1' });
  clearSavedProjects();

  assert.deepEqual(getSavedProjects(), []);
});

test('getSavedProjectById returns the matching saved project', () => {
  clearSavedProjects();
  const [project] = saveProject({ title: 'Load me' });

  assert.equal(getSavedProjectById(project.id)?.title, 'Load me');
});

test('saved projects stay scoped to the signed-in account after logout', () => {
  clearStoredAuthState();
  clearSavedProjects();

  saveAuthState({
    isAuthenticated: true,
    user: { email: 'demo@example.com', name: 'Demo Team' },
    plan: 'professional',
    subscriptionStatus: 'active',
  });

  saveProject({ title: 'Demo account project' });
  assert.equal(getSavedProjects().length, 1);

  clearStoredAuthState();
  assert.deepEqual(getSavedProjects(), []);

  saveAuthState({
    isAuthenticated: true,
    user: { email: 'other@example.com', name: 'Other Team' },
    plan: 'trial',
    subscriptionStatus: 'free',
  });

  saveProject({ title: 'Other account project' });
  assert.equal(getSavedProjects().length, 1);
  assert.equal(getSavedProjects()[0].title, 'Other account project');
});
