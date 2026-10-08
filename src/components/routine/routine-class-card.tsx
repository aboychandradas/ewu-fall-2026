"use client";

import { motion } from "motion/react";
import {
  Check,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";

import type {
  ClassSession,
} from "@/data/fall-2026";

import {
  formatDuration,
  formatTime,
  getSecondsUntilEnd,
  getSecondsUntilStart,
  getSessionProgress,
} from "@/lib/schedule";

export type RoutineCardState =
  | "past"
  | "current"
  | "upcoming"
  | "scheduled";

interface RoutineClassCardProps {
  session: ClassSession;
  state: RoutineCardState;
  now: Date;
  isToday: boolean;
  onClick: () => void;
}

export default function RoutineClassCard({
  session,
  state,
  now,
  isToday,
  onClick,
}: RoutineClassCardProps) {
  const isCurrent =
    state === "current";

  const isUpcoming =
    state === "upcoming";

  const isPast =
    state === "past";

  const progress =
    isToday && isCurrent
      ? getSessionProgress(
          now,
          session,
        )
      : 0;

  const countdown =
    isToday && isUpcoming
      ? formatDuration(
          getSecondsUntilStart(
            now,
            session,
          ),
        )
      : isToday && isCurrent
        ? formatDuration(
            getSecondsUntilEnd(
              now,
              session,
            ),
          )
        : null;

  return (
    <motion.button
      type="button"
      layout
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: isPast ? 0.62 : 1,
        y: 0,
      }}
      whileTap={{
        scale: 0.982,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 28,
      }}
      onClick={onClick}
      aria-label={`Open ${session.course} details`}
      className={[
        "group relative w-full overflow-hidden rounded-[30px] text-left outline-none focus-visible:ring-2 focus-visible:ring-black/15",
        isCurrent
          ? "bg-neutral-950 text-white shadow-[0_24px_60px_rgba(0,0,0,0.15)]"
          : "glass",
      ].join(" ")}
    >
      {isCurrent && (
        <>
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-400/[0.16] blur-3xl" />

          <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-white/[0.035] blur-3xl" />
        </>
      )}

      <div className="relative p-5">
        <div className="flex gap-4">
          <div className="w-[78px] shrink-0">
            <p
              className={[
                "text-[15px] font-semibold tracking-[-0.015em]",
                isCurrent
                  ? "text-white"
                  : isPast
                    ? "text-neutral-400"
                    : "text-neutral-800",
              ].join(" ")}
            >
              {formatTime(
                session.start,
              )}
            </p>

            <p
              className={[
                "mt-1 text-[11px]",
                isCurrent
                  ? "text-white/40"
                  : "text-neutral-400",
              ].join(" ")}
            >
              {formatTime(
                session.end,
              )}
            </p>

            <span
              className={[
                "mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em]",
                isCurrent
                  ? "bg-white/[0.08] text-blue-300"
                  : isPast
                    ? "bg-black/[0.04] text-neutral-400"
                    : "bg-black/[0.045] text-neutral-500",
              ].join(" ")}
            >
              {isCurrent ? (
                <>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-300" />
                  Now
                </>
              ) : isPast ? (
                <>
                  <Check size={10} />
                  Done
                </>
              ) : isUpcoming &&
                isToday ? (
                "Next"
              ) : (
                "Scheduled"
              )}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3
                  className={[
                    "truncate text-[19px] font-semibold tracking-[-0.03em]",
                    isCurrent
                      ? "text-white"
                      : isPast
                        ? "text-neutral-500"
                        : "text-neutral-950",
                  ].join(" ")}
                >
                  {session.course}
                </h3>

                <p
                  className={[
                    "mt-1 text-xs",
                    isCurrent
                      ? "text-white/45"
                      : "text-neutral-400",
                  ].join(" ")}
                >
                  {session.type ===
                  "lab"
                    ? "Laboratory"
                    : "Class"}
                </p>
              </div>

              <ChevronRight
                size={17}
                className={[
                  "mt-1 shrink-0 transition-transform group-hover:translate-x-0.5",
                  isCurrent
                    ? "text-white/45"
                    : "text-neutral-300",
                ].join(" ")}
              />
            </div>

            <div
              className={[
                "mt-4 flex items-center gap-1.5 text-xs",
                isCurrent
                  ? "text-white/60"
                  : "text-neutral-500",
              ].join(" ")}
            >
              <MapPin size={14} />
              <span>{session.room}</span>
            </div>

            <div
              className={[
                "mt-1.5 flex items-center gap-1.5 text-xs",
                isCurrent
                  ? "text-white/38"
                  : "text-neutral-400",
              ].join(" ")}
            >
              <Clock3 size={14} />

              <span>
                {formatTime(
                  session.start,
                )}
                {"–"}
                {formatTime(
                  session.end,
                )}
              </span>
            </div>

            {isToday &&
              (isCurrent ||
                isUpcoming) &&
              countdown && (
                <div className="mt-4">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p
                        className={[
                          "text-[9px] font-bold uppercase tracking-[0.13em]",
                          isCurrent
                            ? "text-white/38"
                            : "text-neutral-400",
                        ].join(" ")}
                      >
                        {isCurrent
                          ? "Remaining"
                          : "Starts in"}
                      </p>

                      <p
                        className={[
                          "mt-1 font-mono text-[22px] font-semibold tracking-[-0.04em] tabular-nums",
                          isCurrent
                            ? "text-white"
                            : "text-neutral-900",
                        ].join(" ")}
                      >
                        {countdown}
                      </p>
                    </div>

                    {isCurrent && (
                      <span className="text-xs font-semibold text-white/55">
                        {Math.round(
                          progress,
                        )}
                        %
                      </span>
                    )}
                  </div>

                  {isCurrent && (
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        animate={{
                          width: `${progress}%`,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-white"
                      />
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}