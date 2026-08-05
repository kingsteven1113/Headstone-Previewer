import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_AUTH_STATE, getStoredAuthState, saveAuthState, clearStoredAuthState } from '../utils/authState';
import { apiClient } from '../utils/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(getStoredAuthState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verify stored token on mount
  useEffect(() => {
    const verifyStoredAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const result = await apiClient.verifyToken(token);
          if (result.valid) {
            apiClient.setToken(token);
            setAuthState({
              isAuthenticated: true,
              user: result.user,
              plan: result.user.plan || 'trial',
              subscriptionStatus: result.user.subscriptionStatus || 'free',
            });
          } else {
            // Token invalid, clear it
            apiClient.setToken(null);
            clearStoredAuthState();
            setAuthState(DEFAULT_AUTH_STATE);
          }
        }
      } catch (err) {
        console.error('Auth verification failed:', err);
        clearStoredAuthState();
        setAuthState(DEFAULT_AUTH_STATE);
      } finally {
        setIsLoading(false);
      }
    };

    verifyStoredAuth();
  }, []);

  useEffect(() => {
    saveAuthState(authState);
  }, [authState]);

  const login = async ({ email, name, plan = 'trial', subscriptionStatus = 'free' }) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await apiClient.login(email, name);
      
      setAuthState({
        isAuthenticated: true,
        user: result.user,
        plan: result.user.plan || plan,
        subscriptionStatus: result.user.subscriptionStatus || subscriptionStatus,
      });
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async ({ email, name, plan = 'trial', subscriptionStatus = 'free' }) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await apiClient.login(email, name);
      
      setAuthState({
        isAuthenticated: true,
        user: result.user,
        plan: result.user.plan || plan,
        subscriptionStatus: result.user.subscriptionStatus || subscriptionStatus,
      });
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const selectPlan = (planName) => {
    setAuthState((currentState) => ({
      ...currentState,
      plan: planName,
      subscriptionStatus: planName === 'trial' ? 'free' : 'active',
    }));
  };

  const refreshAuthUser = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        return;
      }

      const result = await apiClient.verifyToken(token);
      if (!result.valid) {
        return;
      }

      apiClient.setToken(token);
      setAuthState((currentState) => ({
        ...currentState,
        isAuthenticated: true,
        user: result.user,
        plan: result.user.plan || currentState.plan || 'trial',
        subscriptionStatus: result.user.subscriptionStatus || currentState.subscriptionStatus || 'free',
      }));
    } catch (err) {
      console.error('Failed to refresh auth user:', err);
    }
  };

  const logout = () => {
    apiClient.logout();
    clearStoredAuthState();
    setAuthState(DEFAULT_AUTH_STATE);
  };

  const value = useMemo(
    () => ({
      ...authState,
      isLoading,
      error,
      login,
      signup,
      selectPlan,
      refreshAuthUser,
      logout,
    }),
    [authState, isLoading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
