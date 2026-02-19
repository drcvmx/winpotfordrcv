import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';

// Mock types
type AppRole = 'superadmin' | 'admin' | 'editor';

interface AuthState {
  user: User | null;
  session: Session | null;
  roles: AppRole[];
  isLoading: boolean;
}

// Mock User Data
const MOCK_USER: User = {
  id: 'mock-user-id',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  email: 'admin@demo.com',
  phone: '',
  role: 'authenticated',
  updated_at: new Date().toISOString()
};

const MOCK_SESSION: Session = {
  access_token: 'mock-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: MOCK_USER
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    roles: [],
    isLoading: true,
  });

  useEffect(() => {
    // Check local storage for session
    const storedSession = localStorage.getItem('winpot_demo_session');
    if (storedSession) {
      setAuthState({
        user: MOCK_USER,
        session: MOCK_SESSION,
        roles: ['superadmin'], // Default to superadmin for demo
        isLoading: false
      });
    } else {
      setAuthState({
        user: null,
        session: null,
        roles: [],
        isLoading: false
      });
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Accept any login for demo
    localStorage.setItem('winpot_demo_session', 'true');

    const newState = {
      user: MOCK_USER,
      session: MOCK_SESSION,
      roles: ['superadmin'] as AppRole[],
      isLoading: false
    };

    setAuthState(newState);
    return { data: { user: MOCK_USER, session: MOCK_SESSION }, error: null };
  };

  const signUp = async (email: string, password: string) => {
    // Demo signup just logs you in
    return signIn(email, password);
  };

  const signOut = async () => {
    localStorage.removeItem('winpot_demo_session');
    setAuthState({
      user: null,
      session: null,
      roles: [],
      isLoading: false
    });
    return { error: null };
  };

  const hasRole = (role: AppRole): boolean => {
    return authState.roles.includes(role);
  };

  const isSuperAdmin = (): boolean => hasRole('superadmin');
  const isAdmin = (): boolean => hasRole('admin') || hasRole('superadmin');
  const isEditor = (): boolean => hasRole('editor') || isAdmin();

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    hasRole,
    isSuperAdmin,
    isAdmin,
    isEditor,
  };
}
