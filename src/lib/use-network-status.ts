"use client";

import { useSyncExternalStore } from "react";

function subscribe(
  callback: () => void,
) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener(
    "online",
    callback,
  );

  window.addEventListener(
    "offline",
    callback,
  );

  return () => {
    window.removeEventListener(
      "online",
      callback,
    );

    window.removeEventListener(
      "offline",
      callback,
    );
  };
}

function getSnapshot() {
  if (typeof navigator === "undefined") {
    return true;
  }

  return navigator.onLine;
}

function getServerSnapshot() {
  // Keep server rendering deterministic.
  // The browser's actual status is read after hydration.
  return true;
}

export function useNetworkStatus() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
}