"use client";

import { motion } from "motion/react";
import {
  CalendarDays,
  GraduationCap,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import { academicEvents } from "@/data/fall-2026";

function formatEventDate(date: string, endDate?: string) {
  const start = new Date(`${date}T00:00:00`);

  const startText = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(start);

  if (!endDate) return startText;

  const end = new Date(`${endDate}T00:00:00`);

  const endText = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(end);

  return `${startText}–${endText}`;
}

function EventIcon({
  type,
}: {
  type: "semester" | "holiday" | "assessment" | "exam" | "break";
}) {
  if (type === "holiday") {
    return <PartyPopper size={18} />;
  }

  if (type === "exam" || type === "assessment") {
    return <GraduationCap size={18} />;
  }

  if (type === "break") {
    return <Sparkles size={18} />;
  }

  return <CalendarDays size={18} />;
}

export default function CalendarPage() {
  return (
    <div className="space-y-7 pt-3">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-sm font-medium text-neutral-500">
          Academic calendar
        </p>

        <h1 className="mt-2 text-[36px] font-semibold tracking-[-0.04em]">
          Fall 2026
        </h1>
      </motion.header>

      <div className="space-y-3">
        {academicEvents.map((event, index) => (
          <motion.article
            key={event.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.04,
            }}
            className="glass rounded-[26px] p-5"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/5 text-neutral-700">
                <EventIcon type={event.type} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  {formatEventDate(event.date, event.endDate)}
                </p>

                <h2 className="mt-1.5 font-semibold leading-snug">
                  {event.title}
                </h2>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}