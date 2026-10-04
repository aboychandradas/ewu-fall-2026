"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  Play,
} from "lucide-react";
import type { ClassSession } from "@/data/fall-2026";
import {
  formatCountdown,
  formatTime,
} from "@/lib/schedule";

type Status =
  | "current"
  | "next"
  | "done";

interface ClassStatusCardProps {
  status: Status;
  session: ClassSession | null;
  now: Date;
  start?: Date;
  onOpenRoutine?: () => void;
}

const statusContent = {
  current: {
    eyebrow: "NOW",
    title: "Class in progress",
    icon: Play,
  },
  next: {
    eyebrow: "UP NEXT",
    title: "Your next class",
    icon: ArrowRight,
  },
  done: {
    eyebrow: "DONE FOR TODAY",
    title: "No more classes today",
    icon: Check,
  },
};

export default function ClassStatusCard({
  status,
  session,
  now,
  start,
  onOpenRoutine,
}: ClassStatusCardProps) {
  const content = statusContent[status];
  const Icon = content.icon;

  if (!session) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.55,
          ease: "easeOut",
        }}
        className="relative overflow-hidden rounded-4xl bg-neutral-950 p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
      >
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/8 blur-2xl" />

        <div className="relative">
          <div className="flex items-center gap-2 text-white/55">
            <Check size={15} strokeWidth={2.3} />

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              Done for today
            </span>
          </div>

          <h2 className="mt-5 text-[26px] font-semibold tracking-[-0.03em]">
            No more classes today.
          </h2>

          <p className="mt-2 max-w-70 text-sm leading-6 text-white/55">
            Your academic schedule is clear for the rest
            of the day.
          </p>

          <button
            type="button"
            onClick={onOpenRoutine}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition active:scale-[0.97]"
          >
            View routine
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
      }}
      whileTap={{ scale: 0.992 }}
      className="relative overflow-hidden rounded-4xl bg-neutral-950 p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
    >
      <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-blue-400/[0.14] blur-3xl" />

      <div className="absolute -bottom-24 -left-12 h-48 w-48 rounded-full bg-indigo-400/8 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8">
              <Icon size={15} strokeWidth={2.2} />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
              {content.eyebrow}
            </span>
          </div>

          {status === "next" && start && (
            <span className="rounded-full bg-white/8 px-3 py-1.5 text-[11px] font-medium text-white/65">
              {formatCountdown(start, now)}
            </span>
          )}

          {status === "current" && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
              Live
            </span>
          )}
        </div>

        <div className="mt-7">
          <p className="text-[12px] font-medium text-white/45">
            {content.title}
          </p>

          <h2 className="mt-1.5 text-[30px] font-semibold tracking-[-0.04em]">
            {session.course}
          </h2>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/65">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={15} />
            {formatTime(session.start)}–
            {formatTime(session.end)}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <MapPin size={15} />
            {session.room}
          </span>
        </div>

        {status === "next" && start && (
          <div className="mt-6 border-t border-white/8 pt-4 text-xs text-white/45">
            {new Intl.DateTimeFormat(
              "en-US",
              {
                weekday: "long",
              },
            ).format(start)}
          </div>
        )}
      </div>
    </motion.div>
  );
}