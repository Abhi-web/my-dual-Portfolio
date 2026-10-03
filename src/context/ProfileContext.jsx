import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ProfileContext = createContext(null);

const STORAGE_KEY_MODE = 'portfolioProfileMode';
const STORAGE_KEY_STEALTH = 'portfolioStealthMode';
const STORAGE_KEY_DEFAULT = 'portfolioDefaultMode';
const VALID_MODES = ['all', 'tech', 'bpo'];

export const ProfileProvider = ({ children }) => {
  // Determine if a targeted URL query parameter is present (?track=tech or ?profile=tech)
  const [urlLockInfo, setUrlLockInfo] = useState(() => {
    if (typeof window === 'undefined') return { isLocked: false, targetMode: null };
    try {
      const params = new URLSearchParams(window.location.search);
      const queryMode = (params.get('track') || params.get('profile'))?.toLowerCase();
      if (queryMode && VALID_MODES.includes(queryMode)) {
        return { isLocked: true, targetMode: queryMode };
      }
    } catch {
      // Safe fallback
    }
    return { isLocked: false, targetMode: null };
  });

  // Default landing mode for normal visitors (saved in localStorage or default to 'all')
  const [defaultPublicMode, setDefaultPublicModeState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_DEFAULT)?.toLowerCase();
        if (stored && VALID_MODES.includes(stored)) return stored;
      } catch {
        // Safe fallback
      }
    }
    return 'all';
  });

  // Active presentation mode
  const [profileMode, setProfileModeState] = useState(() => {
    // 1. If URL has explicit track parameter, lock to that
    if (urlLockInfo.isLocked && urlLockInfo.targetMode) {
      return urlLockInfo.targetMode;
    }

    // 2. Check localStorage saved mode
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_MODE)?.toLowerCase();
        if (stored && VALID_MODES.includes(stored)) {
          return stored;
        }
      } catch {
        // Safe fallback
      }
    }

    // 3. Fallback to default public mode
    return defaultPublicMode;
  });

  // Stealth Mode: Hides visible switcher buttons from recruiters
  // When active, visitors see a 100% dedicated single-domain portfolio without dual-career switchers
  const [stealthMode, setStealthModeState] = useState(() => {
    // If URL is explicitly locked to tech or bpo, stealth is strictly locked ON
    if (urlLockInfo.isLocked) return true;

    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_STEALTH);
        if (stored !== null) return stored === 'true';
      } catch {
        // Safe fallback
      }
    }
    // Default to stealth mode enabled for clean recruiter presentation
    return true;
  });

  // Secret Master Controller Modal state
  const [secretControllerOpen, setSecretControllerOpen] = useState(false);

  // Set Profile Mode with persistence
  const setProfileMode = useCallback((mode) => {
    const validMode = VALID_MODES.includes(mode?.toLowerCase()) ? mode.toLowerCase() : 'all';
    setProfileModeState(validMode);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_MODE, validMode);
      } catch {
        // Safe fallback
      }

      // Update URL query parameter smoothly
      try {
        const url = new URL(window.location.href);
        if (validMode === 'all') {
          url.searchParams.delete('track');
          url.searchParams.delete('profile');
        } else {
          url.searchParams.set('track', validMode);
        }
        window.history.replaceState({}, '', url.toString());
      } catch {
        // Safe fallback
      }
    }
  }, []);

  // Set Stealth Mode toggle
  const setStealthMode = useCallback((enabled) => {
    setStealthModeState(enabled);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_STEALTH, String(enabled));
      } catch {
        // Safe fallback
      }
    }
  }, []);

  // Set Default Public Landing Mode
  const setDefaultPublicMode = useCallback((mode) => {
    const validMode = VALID_MODES.includes(mode?.toLowerCase()) ? mode.toLowerCase() : 'all';
    setDefaultPublicModeState(validMode);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_DEFAULT, validMode);
      } catch {
        // Safe fallback
      }
    }
  }, []);

  const openSecretController = useCallback(() => {
    setSecretControllerOpen(true);
  }, []);

  const closeSecretController = useCallback(() => {
    setSecretControllerOpen(false);
  }, []);

  // Sync if visitor navigates back/forward with history
  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const queryMode = (params.get('track') || params.get('profile'))?.toLowerCase();
        if (queryMode && VALID_MODES.includes(queryMode)) {
          setProfileModeState(queryMode);
          setUrlLockInfo({ isLocked: true, targetMode: queryMode });
        } else {
          setUrlLockInfo({ isLocked: false, targetMode: null });
        }
      } catch {
        // Safe fallback
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global Keyboard Shortcut: Ctrl + Shift + P or Cmd + Shift + P
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
        setSecretControllerOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const contextValue = useMemo(() => ({
    profileMode,
    setProfileMode,
    validModes: VALID_MODES,
    stealthMode,
    setStealthMode,
    isUrlLocked: urlLockInfo.isLocked,
    defaultPublicMode,
    setDefaultPublicMode,
    secretControllerOpen,
    openSecretController,
    closeSecretController,
  }), [
    profileMode,
    setProfileMode,
    stealthMode,
    setStealthMode,
    urlLockInfo.isLocked,
    defaultPublicMode,
    setDefaultPublicMode,
    secretControllerOpen,
    openSecretController,
    closeSecretController,
  ]);

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
