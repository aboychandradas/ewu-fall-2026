"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";

import type { ClassSession } from "@/data/fall-2026";
import Pressable from "@/components/ui/pressable";

interface LiveStatusCardProps {
  status: "current" | "next" | "done";
  session: ClassSession | null;
  now: Date;
  start?: Date;
  onOpenRoutine: () => void;
}

function createTime(
  now: Date,
  value: string,
) {
  const [hours, minutes] =
    value.split(":").map(Number);

  const result = new Date(now);

  result.setHours(
    hours,
    minutes,
    0,
    0,
  );

  return result;
}

function formatDuration(
  totalSeconds: number,
) {
  const safeSeconds = Math.max(
    0,
    Math.floor(totalSeconds),
  );

  const hours = Math.floor(
    safeSeconds / 3600,
  );

  const minutes = Math.floor(
    (safeSeconds % 3600) / 60,
  );

  const seconds =
    safeSeconds % 60;

  return [
    hours
      .toString()
      .padStart(2, "0"),
    minutes
      .toString()
      .padStart(2, "0"),
    seconds
      .toString()
      .padStart(2, "0"),
  ].join(":");
}

function getProgress(
  now: Date,
  session: ClassSession,
) {
  const start = createTime(
    now,
    session.start,
  );

  const end = createTime(
    now,
    session.end,
  );

  const total =
    end.getTime() - start.getTime();

  const elapsed =
    now.getTime() - start.getTime();

  if (total <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      (elapsed / total) * 100,
    ),
  );
}

function formatStartCountdown(
  now: Date,
  start: Date,
) {
  const difference =
    start.getTime() - now.getTime();

  if (difference <= 0) {
    return "Starting now";
  }

  const seconds = Math.floor(
    difference / 1000,
  );

  return formatDuration(seconds);
}

function formatRemainingCountdown(
  now: Date,
  session: ClassSession,
) {
  const end = createTime(
    now,
    session.end,
  );

  return formatDuration(
    (end.getTime() -
      now.getTime()) /
      1000,
  );
}

export default function LiveStatusCard({
  status,
  session,
  now,
  start,
  onOpenRoutine,
}: LiveStatusCardProps) {
  if (!session || status === "done") {
    return (
      <motion.section
        initial={{
          opacity: 0,
          y: 16,
          scale: 0.985,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 28,
        }}
        className="premium-hero overflow-hidden rounded-4xl p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">
              TODAY
            </p>

            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em]">
              You&apos;re done for today.
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
              There are no more scheduled
              classes today.
            </p>
          </div>

          <div className="hero-icon">
            <Sparkles size={19} />
          </div>
        </div>

        <Pressable
          onClick={onOpenRoutine}
          className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 text-sm font-semibold text-black shadow-lg shadow-black/10"
        >
          Open routine
          <ArrowRight size={16} />
        </Pressable>
      </motion.section>
    );
  }

  if (status === "next" && start) {
    const scheduledForAnotherDay =
      start.toDateString() !== now.toDateString();

    const scheduledDateLabel =
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }).format(start);

    return (
      <motion.section
        initial={{
          opacity: 0,
          y: 16,
          scale: 0.985,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 28,
        }}
        className="premium-hero overflow-hidden rounded-4xl p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">
              UP NEXT
            </p>

            <h2 className="mt-2 text-[34px] font-semibold tracking-tighter">
              {session.course}
            </h2>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/65">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={14} />
                {session.start}–{session.end}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {session.room}
              </span>
            </div>

            {scheduledForAnotherDay && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-medium text-white/80">
                <CalendarDays
                  size={14}
                  aria-hidden="true"
                />
                {scheduledDateLabel}
              </p>
            )}
          </div>

          <div className="hero-icon">
            <Clock3 size={19} />
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
            Starts in
          </p>

          <motion.p
            key={formatStartCountdown(
              now,
              start,
            )}
            initial={{
              opacity: 0.5,
              y: 4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.18,
            }}
            className="mt-1 font-mono text-[42px] font-semibold tracking-[-0.06em] tabular-nums"
          >
            {formatStartCountdown(
              now,
              start,
            )}
          </motion.p>
        </div>

        <Pressable
          onClick={onOpenRoutine}
          className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 text-sm font-semibold text-black shadow-lg shadow-black/10"
        >
           Open routine
          <ArrowRight size={16} />
        </Pressable>
      </motion.section>
    );
  }

  const progress = getProgress(
    now,
    session,
  );

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 16,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
      }}
      className="premium-hero overflow-hidden rounded-4xl p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="eyebrow">
              HAPPENING NOW
            </p>

            <span className="live-dot">
              <span />
            </span>
          </div>

          <h2 className="mt-2 text-[34px] font-semibold tracking-tighter">
            {session.course}
          </h2>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/65">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} />
              {session.start}–{session.end}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} />
              {session.room}
            </span>
          </div>
        </div>

        <div className="hero-icon">
          <Sparkles size={19} />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
              Remaining
            </p>

            <motion.p
              key={formatRemainingCountdown(
                now,
                session,
              )}
              initial={{
                opacity: 0.5,
                y: 4,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.18,
              }}
              className="mt-1 font-mono text-[34px] font-semibold tracking-tighter tabular-nums"
            >
              {formatRemainingCountdown(
                now,
                session,
              )}
            </motion.p>
          </div>

          <p className="text-sm font-semibold text-white/70">
            {Math.round(progress)}%
          </p>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/12">
          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="h-full rounded-full bg-white"
          />
        </div>
      </div>

      <Pressable
        onClick={onOpenRoutine}
        className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 text-sm font-semibold text-black shadow-lg shadow-black/10"
      >
        Open routine
        <ArrowRight size={16} />
      </Pressable>
    </motion.section>
  );
}