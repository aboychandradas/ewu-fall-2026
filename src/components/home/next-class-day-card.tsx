"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

import type { ClassSession } from "@/data/fall-2026";
import { formatTime } from "@/lib/schedule";

interface NextClassDayCardProps {
  date: Date;
  sessions: ClassSession[];
}

export default function NextClassDayCard({
  date,
  sessions,
}: NextClassDayCardProps) {
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="glass overflow-hidden rounded-[30px] p-5"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
          <CalendarDays size={23} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">
            NEXT CLASS DAY
          </p>

          <h3 className="mt-1 text-lg font-semibold tracking-tight text-neutral-950">
            {dateLabel}
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            {sessions.length}{" "}
            {sessions.length === 1 ? "scheduled class" : "scheduled classes"}
          </p>
        </div>
      </div>

      {sessions.length > 0 ? (
        <div className="mt-5 space-y-3">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white/35 p-3.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <Clock3 size={18} aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-neutral-950">
                  {session.course}
                </p>

                <p className="mt-1 text-sm text-neutral-600">
                  {formatTime(session.start)} – {formatTime(session.end)}
                </p>

                <p className="mt-1.5 flex items-start gap-1.5 text-xs text-neutral-500">
                  <MapPin
                    size={13}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{session.room}</span>
                </p>
              </div>

              <span className="mt-1 shrink-0 rounded-full bg-blue-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-600">
                {session.type === "lab" ? "Lab" : "Class"}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-sm leading-6 text-neutral-500">
          No sessions are listed for this day. Check the routine for the
          latest schedule.
        </p>
      )}

      <Link
        href="/routine/"
        className="group mt-5 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-black/5 px-4 text-sm font-semibold text-neutral-950 outline-none transition-colors hover:bg-black/10 focus-visible:ring-2 focus-visible:ring-blue-500/50"
      >
        Open full routine
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </motion.div>
  );
}