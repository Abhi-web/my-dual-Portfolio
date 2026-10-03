import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext(null);

const STORAGE_KEY = 'portfolioProfileMode';
const VALID_MODES = ['all', 'tech', 'bpo'];

export const ProfileProvider = ({ children }) => {
  const [profileMode, setProfileModeState] = useState(() => {
    // 1. Check URL query param (?profile=tech, ?profile=bpo, ?profile=all)
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlMode = params.get('profile')?.toLowerCase();
        if (urlMode && VALID_MODES.includes(urlMode)) {
          return urlMode;
        }
      } catch (e) {
        // Fallback safely
      }

      // 2. Check localStorage
      try {
        const stored = localStorage.getItem(STORAGE_KEY)?.toLowerCase();
        if (stored && VALID_MODES.includes(stored)) {
          return stored;
        }
      } catch (e) {
        // Fallback safely
      }
    }

    // 3. Default fallback
    return 'all';
  });

  const setProfileMode = React.useCallback((mode) => {
    const validMode = VALID_MODES.includes(mode?.toLowerCase()) ? mode.toLowerCase() : 'all';
    setProfileModeState(validMode);

    if (typeof window !== 'undefined') {
      // Persist to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, validMode);
      } catch (e) {
        // Ignore quota/private browsing errors
      }

      // Update URL query parameter without page reload
      try {
        const url = new URL(window.location.href);
        if (validMode === 'all') {
          url.searchParams.delete('profile');
        } else {
          url.searchParams.set('profile', validMode);
        }
        window.history.replaceState({}, '', url.toString());
      } catch (e) {
        // Ignore URL replace errors
      }
    }
  }, []);

  // Sync if user navigates back/forward with query params
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlMode = params.get('profile')?.toLowerCase();
      if (urlMode && VALID_MODES.includes(urlMode)) {
        setProfileModeState(urlMode);
      } else {
        setProfileModeState('all');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const contextValue = React.useMemo(() => ({
    profileMode,
    setProfileMode,
    validModes: VALID_MODES,
  }), [profileMode, setProfileMode]);

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export default ProfileContext;
