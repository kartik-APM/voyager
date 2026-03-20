import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await authService.getSession();
        if (session?.user) {
          setUser(session.user);
          const userProfile = await authService.getProfile(session.user.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        try {
          const userProfile = await authService.getProfile(session.user.id);
          setProfile(userProfile);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    const data = await authService.signIn(email, password);
    return data;
  };

  const signUp = async (email, password, metadata) => {
    const data = await authService.signUp(email, password, metadata);
    return data;
  };

  const signInWithGoogle = async () => {
    const data = await authService.signInWithGoogle();
    return data;
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    const updatedProfile = await authService.updateProfile(user.id, updates);
    setProfile(updatedProfile);
    return updatedProfile;
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
