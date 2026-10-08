"use client";

import { motion } from "motion/react";
import {
  CheckCircle2,
  Clock3,
  MapPin,
  Timer,
  X,
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
  getSessionState,
} from "@/lib/schedule";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ClassDetailSheetProps {
  session: ClassSession | null;
  open: boolean;
  now: Date;
  isToday: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ClassDetailSheet({
  session,
  open,
  now,
  isToday,
  onOpenChange,
}: ClassDetailSheetProps) {
  if (!session) {
    return null;
  }

  const state =
    isToday
      ? getSessionState(
          now,
          session,
        )
      : "upcoming";

  const progress =
    isToday && state === "current"
      ? getSessionProgress(
          now,
          session,
        )
      : 0;

  const countdown =
    isToday && state === "upcoming"
      ? formatDuration(
          getSecondsUntilStart(
            now,
            session,
          ),
        )
      : isToday && state === "current"
        ? formatDuration(
            getSecondsUntilEnd(
              now,
              session,
            ),
          )
        : null;

  const stateLabel =
    state === "current"
      ? "Happening now"
      : state === "past"
        ? "Completed"
        : isToday
          ? "Upcoming"
          : "Scheduled";

  const StateIcon =
    state === "current"
      ? Timer
      : state === "past"
        ? CheckCircle2
        : Clock3;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="bottom"
        className="mx-auto max-w-130 rounded-t-[36px] border-0 bg-[#f5f5f7] px-5 pb-9 pt-4"
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-black/12" />

        <SheetHeader className="text-left">
          <div className="mb-4 flex items-center justify-between">
            <span
              className={[
                "rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em]",
                state === "current"
                  ? "bg-blue-500/10 text-blue-600"
                  : "bg-black/5 text-neutral-500",
              ].join(" ")}
            >
              {session.type === "lab"
                ? "Laboratory"
                : "Class"}
            </span>

            <motion.button
              type="button"
              whileTap={{
                scale: 0.9,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
              }}
              onClick={() =>
                onOpenChange(false)
              }
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-neutral-500 outline-none focus-visible:ring-2 focus-visible:ring-black/15"
              aria-label="Close"
            >
              <X size={17} />
            </motion.button>
          </div>

          <SheetTitle className="text-[32px] font-semibold tracking-[-0.045em] text-neutral-950">
            {session.course}
          </SheetTitle>

          <p className="mt-1 text-sm font-medium text-neutral-500">
            {session.dayName}
          </p>
        </SheetHeader>

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 28,
          }}
          className="mt-7"
        >
          <div className="glass rounded-[30px] p-5">
            <div className="flex items-start gap-4">
              <div
                className={[
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                  state === "current"
                    ? "bg-blue-500/10 text-blue-600"
                    : "bg-black/5 text-neutral-600",
                ].join(" ")}
              >
                <StateIcon size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                  Status
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {stateLabel}
                </p>

                {countdown && (
                  <p className="mt-1 font-mono text-sm font-semibold tabular-nums text-neutral-500">
                    {countdown}
                    {state ===
                      "current" &&
                      " remaining"}
                  </p>
                )}
              </div>
            </div>

            {state === "current" && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                  <span>
                    Progress
                  </span>

                  <span>
                    {Math.round(
                      progress,
                    )}
                    %
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/6">
                  <motion.div
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-neutral-950"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="glass rounded-[28px] p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/5">
                <Clock3 size={19} />
              </div>

              <div>
                <p className="text-xs font-medium text-neutral-400">
                  Time
                </p>

                <p className="mt-1 font-semibold">
                  {formatTime(
                    session.start,
                  )}
                  {" – "}
                  {formatTime(
                    session.end,
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="glass rounded-[28px] p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/5">
                <MapPin size={19} />
              </div>

              <div>
                <p className="text-xs font-medium text-neutral-400">
                  Room
                </p>

                <p className="mt-1 font-semibold">
                  {session.room}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-neutral-400">
          East West University ·
          Information Studies ·
          Fall 2026
        </p>
      </SheetContent>
    </Sheet>
  );
}