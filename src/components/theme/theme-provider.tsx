"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ThemePreference = "light" | "dark" | "system";

type ThemeContextValue = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const STORAGE_KEY = "ewu-academic-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

const preferenceListeners = new Set<() => void>();

let currentPreference: ThemePreference = "system";
let preferenceLoaded = false;

function isThemePreference(
  value: string | null,
): value is ThemePreference {
  return (
    value === "light" ||
    value === "dark" ||
    value === "system"
  );
}

function readStoredPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (isThemePreference(stored)) {
      return stored;
    }
  } catch {
    // Use the default if local storage is unavailable.
  }

  return "system";
}

function getBrowserPreference(): ThemePreference {
  if (!preferenceLoaded) {
    currentPreference = readStoredPreference();
    preferenceLoaded = true;
  }

  return currentPreference;
}

function getServerPreference(): ThemePreference {
  return "system";
}

function subscribeToPreference(callback: () => void) {
  preferenceListeners.add(callback);

  function handleStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY && event.key !== null) {
      return;
    }

    currentPreference = readStoredPreference();
    preferenceLoaded = true;

    callback();
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    preferenceListeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function savePreference(next: ThemePreference) {
  currentPreference = next;
  preferenceLoaded = true;

  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Theme switching still works if storage is unavailable.
  }

  preferenceListeners.forEach((listener) => {
    listener();
  });
}

function applyTheme(
  preference: ThemePreference,
  isSystemDark: boolean,
) {
  const resolvedTheme =
    preference === "system"
      ? isSystemDark
        ? "dark"
        : "light"
      : preference;

  const root = document.documentElement;

  root.dataset.theme = resolvedTheme;
  root.style.colorScheme = resolvedTheme;

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );

  if (themeColor) {
    themeColor.content =
      resolvedTheme === "dark" ? "#0b0c0f" : "#f5f5f7";
  }
}

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const preference = useSyncExternalStore(
    subscribeToPreference,
    getBrowserPreference,
    getServerPreference,
  );

  const setPreference = useCallback(
    (next: ThemePreference) => {
      savePreference(next);
    },
    [],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const updateTheme = () => {
      applyTheme(preference, mediaQuery.matches);
    };

    updateTheme();

    if (preference === "system") {
      mediaQuery.addEventListener("change", updateTheme);

      return () => {
        mediaQuery.removeEventListener("change", updateTheme);
      };
    }

    return undefined;
  }, [preference]);

  const value = useMemo(
    () => ({
      preference,
      setPreference,
    }),
    [preference, setPreference],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemePreference() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemePreference must be used inside ThemeProvider.",
    );
  }

  return context;
}