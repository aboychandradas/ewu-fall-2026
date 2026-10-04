"use client";

import { motion } from "motion/react";
import {
  BookOpenCheck,
  CalendarDays,
  GraduationCap,
  PartyPopper,
  Sparkles,
} from "lucide-react";

import type { AcademicEvent } from "@/data/fall-2026";

interface CalendarEventCardProps {
  event: AcademicEvent;
  isNext: boolean;
  isPast: boolean;
  onClick: () => void;
}

const EVENT_ICONS = {
  semester: CalendarDays,
  exam: GraduationCap,
  assessment: BookOpenCheck,
  holiday: PartyPopper,
  break: Sparkles,
} satisfies Record<
  AcademicEvent["type"],
  typeof CalendarDays
>;

function formatDateRange(
  date: string,
  endDate?: string,
) {
  const start = new Date(`${date}T00:00:00`);

  const startText =
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(start);

  if (!endDate) {
    return startText;
  }

  const end = new Date(`${endDate}T00:00:00`);

  const endText =
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(end);

  return `${startText}–${endText}`;
}

function getCategoryLabel(
  type: AcademicEvent["type"],
) {
  switch (type) {
    case "exam":
      return "Examination";

    case "assessment":
      return "Academic assessment";

    case "holiday":
      return "University holiday";

    case "break":
      return "Semester break";

    default:
      return "Academic milestone";
  }
}

export default function CalendarEventCard({
  event,
  isNext,
  isPast,
  onClick,
}: CalendarEventCardProps) {
  const Icon = EVENT_ICONS[event.type];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{
        scale: 0.985,
      }}
      layout
      className={`w-full rounded-[28px] text-left outline-none transition ${
        isNext
          ? "bg-neutral-950 text-white shadow-[0_20px_50px_rgba(0,0,0,0.13)]"
          : "glass"
      } ${isPast ? "opacity-55" : ""}`}
    >
      <div className="flex gap-4 p-5">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            isNext
              ? "bg-white/8 text-white"
              : "bg-black/5 text-neutral-600"
          }`}
        >
          <Icon size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${
                isNext
                  ? "text-white/45"
                  : "text-neutral-400"
              }`}
            >
              {formatDateRange(
                event.date,
                event.endDate,
              )}
            </p>

            {isNext && (
              <span className="rounded-full bg-blue-400/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-blue-300">
                Up next
              </span>
            )}
          </div>

          <h3
            className={`mt-1.5 font-semibold leading-snug tracking-[-0.018em] ${
              isNext
                ? "text-white"
                : "text-neutral-950"
            }`}
          >
            {event.title}
          </h3>

          <p
            className={`mt-1.5 text-xs ${
              isNext
                ? "text-white/40"
                : "text-neutral-400"
            }`}
          >
            {getCategoryLabel(event.type)}
          </p>
        </div>
      </div>
    </motion.button>
  );
}