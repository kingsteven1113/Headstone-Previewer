const STORAGE_KEY = 'headstone-previewer-auth';
const MEMORY_STORE = new Map();

export const DEFAULT_AUTH_STATE = {
  isAuthenticated: false,
  user: null,
  plan: 'trial',
  subscriptionStatus: 'free',
};

function getStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }

  if (typeof globalThis.localStorage !== 'undefined') {
    return globalThis.localStorage;
  }

  return {
    getItem(key) {
      return MEMORY_STORE.has(key) ? MEMORY_STORE.get(key) : null;
    },
    setItem(key, value) {
      MEMORY_STORE.set(key, value);
    },
    removeItem(key) {
      MEMORY_STORE.delete(key);
    },
  };
}

export function getStoredAuthState() {
  try {
    const storage = getStorage();
    const rawState = storage.getItem(STORAGE_KEY);

    if (!rawState) {
      return DEFAULT_AUTH_STATE;
    }

    const parsedState = JSON.parse(rawState);

    return {
      isAuthenticated: Boolean(parsedState?.isAuthenticated),
      user: parsedState?.user ?? null,
      plan: parsedState?.plan ?? 'trial',
      subscriptionStatus: parsedState?.subscriptionStatus ?? 'free',
    };
  } catch (error) {
    console.warn('Unable to read saved auth state', error);
    return DEFAULT_AUTH_STATE;
  }
}

export function saveAuthState(authState) {
  const storage = getStorage();
  storage.setItem(STORAGE_KEY, JSON.stringify(authState));
}

export function clearStoredAuthState() {
  const storage = getStorage();
  storage.removeItem(STORAGE_KEY);
}
