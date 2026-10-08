"use client";

import { useSyncExternalStore } from "react";

type Listener = () => void;

let currentTimestamp = 0;
let intervalId: ReturnType<typeof setInterval> | null =
  null;

const listeners = new Set<Listener>();

function updateTimestamp() {
  currentTimestamp = Date.now();

  listeners.forEach((listener) => {
    listener();
  });
}

function subscribe(listener: Listener) {
  listeners.add(listener);

  if (listeners.size === 1) {
    currentTimestamp = Date.now();

    intervalId = setInterval(
      updateTimestamp,
      1000,
    );
  }

  return () => {
    listeners.delete(listener);

    if (
      listeners.size === 0 &&
      intervalId !== null
    ) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}

function getSnapshot() {
  return currentTimestamp;
}

function getServerSnapshot() {
  return 0;
}

export function useLiveNow() {
  const timestamp = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (timestamp === 0) {
    return null;
  }

  return new Date(timestamp);
}