"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  CloudOff,
  Wifi,
} from "lucide-react";

import { useNetworkStatus } from "@/lib/use-network-status";

export default function ConnectionStatus() {
  const isOnline = useNetworkStatus();

  const [showReconnected, setShowReconnected] =
    useState(false);

  useEffect(() => {
    let timeoutId:
      | ReturnType<typeof setTimeout>
      | undefined;

    function handleOffline() {
      setShowReconnected(false);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }

    function handleOnline() {
      setShowReconnected(true);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setShowReconnected(false);
      }, 2600);
    }

    window.addEventListener(
      "offline",
      handleOffline,
    );

    window.addEventListener(
      "online",
      handleOnline,
    );

    return () => {
      window.removeEventListener(
        "offline",
        handleOffline,
      );

      window.removeEventListener(
        "online",
        handleOnline,
      );

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const visible =
    !isOnline || showReconnected;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 top-[calc(env(safe-area-inset-top)+0.75rem)] z-70 flex justify-center px-4"
    >
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={
              isOnline
                ? "online"
                : "offline"
            }
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -6,
              scale: 0.98,
            }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
            role="status"
            className="glass flex max-w-full items-center gap-3 rounded-full px-4 py-3 shadow-[0_12px_35px_rgba(0,0,0,0.09)]"
          >
            <div
              className={[
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                isOnline
                  ? "bg-green-500/10 text-green-600"
                  : "bg-amber-500/10 text-amber-600",
              ].join(" ")}
            >
              {isOnline ? (
                <Wifi size={16} />
              ) : (
                <CloudOff size={16} />
              )}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-900">
                {isOnline
                  ? "Back online"
                  : "You're offline"}
              </p>

              <p className="mt-0.5 text-[11px] leading-4 text-neutral-500">
                {isOnline
                  ? "Your connection is available again."
                  : "Your academic schedule remains available."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}