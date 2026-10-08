"use client";

import { motion } from "motion/react";
import {
  Check,
  Clock3,
  MapPin,
} from "lucide-react";

import type {
  ClassSession,
} from "@/data/fall-2026";

import { formatTime } from "@/lib/schedule";

interface TodayTimelineProps {
  sessions: ClassSession[];
  now: Date;
  currentClassId?: string;
}

function createDateTime(
  now: Date,
  time: string,
) {
  const [hours, minutes] =
    time.split(":").map(Number);

  const result = new Date(now);

  result.setHours(
    hours,
    minutes,
    0,
    0,
  );

  return result;
}

function getClassState(
  now: Date,
  session: ClassSession,
) {
  const start = createDateTime(
    now,
    session.start,
  );

  const end = createDateTime(
    now,
    session.end,
  );

  if (now < start) {
    return "upcoming" as const;
  }

  if (now >= start && now < end) {
    return "current" as const;
  }

  return "past" as const;
}

function getNowPosition(
  now: Date,
  sessions: ClassSession[],
) {
  if (sessions.length === 0) {
    return 0;
  }

  const first = createDateTime(
    now,
    sessions[0].start,
  );

  const last = createDateTime(
    now,
    sessions[sessions.length - 1].end,
  );

  const total =
    last.getTime() -
    first.getTime();

  if (total <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      ((now.getTime() -
        first.getTime()) /
        total) *
        100,
    ),
  );
}

export default function TodayTimeline({
  sessions,
  now,
  currentClassId,
}: TodayTimelineProps) {
  if (sessions.length === 0) {
    return (
      <div className="glass rounded-[30px] p-5">
        <p className="text-sm font-semibold">
          No classes today.
        </p>

        <p className="mt-1 text-sm leading-6 text-neutral-500">
          Your schedule is clear.
        </p>
      </div>
    );
  }

  const nowPosition =
    getNowPosition(
      now,
      sessions,
    );

  return (
    <div className="glass overflow-hidden rounded-[30px]">
      <div className="px-5 pb-4 pt-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">
              Today
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-[-0.025em]">
              Schedule timeline
            </h2>
          </div>

          <span className="text-xs font-medium text-neutral-400">
            {sessions.length}{" "}
            {sessions.length === 1
              ? "class"
              : "classes"}
          </span>
        </div>
      </div>

      <div className="relative px-5 pb-5">
        <div
          className="pointer-events-none absolute bottom-5 left-[88px] top-0 w-px bg-black/7"
          aria-hidden="true"
        />

        {sessions.map(
          (
            session,
            index,
          ) => {
            const state =
              getClassState(
                now,
                session,
              );

            const current =
              currentClassId ===
              session.id;

            return (
              <motion.div
                key={session.id}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay:
                    index * 0.05,
                }}
                className="relative grid grid-cols-[64px_24px_minmax(0,1fr)] gap-3 py-3"
              >
                <div className="pt-1 text-right">
                  <p
                    className={[
                      "text-xs font-semibold",
                      state ===
                      "current"
                        ? "text-blue-600"
                        : state ===
                            "past"
                          ? "text-neutral-400"
                          : "text-neutral-700",
                    ].join(" ")}
                  >
                    {formatTime(
                      session.start,
                    )}
                  </p>

                  <p className="mt-0.5 text-[10px] text-neutral-400">
                    {formatTime(
                      session.end,
                    )}
                  </p>
                </div>

                <div className="relative flex justify-center">
                  <div
                    className={[
                      "mt-1.5 h-3 w-3 rounded-full border-2 transition",
                      state ===
                      "current"
                        ? "border-blue-500 bg-blue-500 shadow-[0_0_0_5px_rgba(0,122,255,0.10)]"
                        : state ===
                            "past"
                          ? "border-neutral-300 bg-neutral-300"
                          : "border-neutral-300 bg-white",
                    ].join(" ")}
                  />
                </div>

                <div
                  className={[
                    "rounded-2xl px-3 py-3 transition",
                    current
                      ? "bg-blue-500/[0.055]"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2">
                    <h3
                      className={[
                        "text-sm font-semibold tracking-[-0.015em]",
                        state ===
                        "past"
                          ? "text-neutral-400"
                          : "text-neutral-900",
                      ].join(" ")}
                    >
                      {session.course}
                    </h3>

                    {current && (
                      <span className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-1 text-[9px] font-bold text-blue-600">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                        NOW
                      </span>
                    )}

                    {state ===
                      "past" && (
                      <Check
                        size={13}
                        className="text-neutral-400"
                      />
                    )}
                  </div>

                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin
                        size={12}
                      />
                      {session.room}
                    </span>

                    <span className="inline-flex items-center gap-1">
                      <Clock3
                        size={12}
                      />
                      {session.type ===
                      "lab"
                        ? "Lab"
                        : "Class"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          },
        )}

        <motion.div
          animate={{
            top: `calc(${nowPosition}% - 1px)`,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="pointer-events-none absolute left-[81px] right-5 flex items-center"
          aria-hidden="true"
        >
          <div className="h-px flex-1 bg-blue-500/40" />

          <span className="ml-2 rounded-full bg-blue-500 px-2 py-1 font-mono text-[9px] font-semibold text-white shadow-sm">
            NOW
          </span>
        </motion.div>
      </div>
    </div>
  );
}