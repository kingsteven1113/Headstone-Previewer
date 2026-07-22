const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';
const MEMORY_STORAGE = new Map();

function getStorage() {
  if (typeof localStorage !== 'undefined') {
    return localStorage;
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

class ApiClient {
  constructor() {
    this.baseUrl = API_URL;
    this.storage = getStorage();
    this.token = this.storage.getItem('auth_token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      this.storage.setItem('auth_token', token);
    } else {
      this.storage.removeItem('auth_token');
    }
  }

  getToken() {
    return this.token;
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error?.message || `API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${error.message}`);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, name) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async verifyToken(token) {
    return this.request('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async logout() {
    this.setToken(null);
  }

  // Project endpoints
  async getProjects() {
    return this.request('/projects', {
      method: 'GET',
    });
  }

  async getProject(projectId) {
    return this.request(`/projects/${projectId}`, {
      method: 'GET',
    });
  }

  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(projectId, updates) {
    return this.request(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteProject(projectId) {
    return this.request(`/projects/${projectId}`, {
      method: 'DELETE',
    });
  }

  // Admin endpoints
  async getAdminOverview() {
    return this.request('/admin/overview', {
      method: 'GET',
    });
  }

  async getAdminAccounts() {
    return this.request('/admin/accounts', {
      method: 'GET',
    });
  }

  async getAdminPayments(limit = 100) {
    return this.request(`/admin/payments?limit=${limit}`, {
      method: 'GET',
    });
  }

  async upsertSubscription(subscriptionData) {
    return this.request('/admin/subscriptions', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  async createPayment(paymentData) {
    return this.request('/admin/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }
}

export const apiClient = new ApiClient();
