"use client";

import { motion } from "motion/react";

import {
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  PartyPopper,
  Sparkles,
} from "lucide-react";

import type {
  AcademicEvent,
} from "@/data/fall-2026";

import {
  getAcademicEventCountdown,
  getAcademicEventProgress,
  type AcademicEventState,
  formatAcademicEventDateRange,
  formatAcademicEventDuration,
  getAcademicEventStateLabel,
} from "@/lib/academic-events";

interface CalendarEventCardProps {
  event: AcademicEvent;
  state: AcademicEventState;
  now: Date;
  isNext: boolean;
  featured?: boolean;
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
  state,
  now,
  isNext,
  featured = false,
  onClick,
}: CalendarEventCardProps) {
  const Icon = EVENT_ICONS[event.type];

  const countdown =
    getAcademicEventCountdown(
      event,
      now,
    );

  const progress =
    state === "active"
      ? getAcademicEventProgress(
          event,
          now,
        )
      : 0;

  const isPast = state === "past";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`View ${event.title} details`}
      whileTap={{
        scale: 0.985,
      }}
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
      }}
      className={[
        "group relative w-full overflow-hidden rounded-[30px] text-left outline-none focus-visible:ring-2 focus-visible:ring-black/15",
        featured
          ? "premium-hero"
          : state === "active"
            ? "glass border border-blue-500/10"
            : "glass",
        isPast ? "opacity-55" : "",
      ].join(" ")}
    >
      <div className="relative p-5">
        <div className="flex items-start gap-4">
          <div
            className={[
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px]",
              featured
                ? "border border-white/10 bg-white/[0.08] text-white"
                : state === "active"
                  ? "bg-blue-500/10 text-blue-600"
                  : "bg-black/[0.045] text-neutral-600",
            ].join(" ")}
          >
            <Icon size={20} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p
                className={[
                  "text-[10px] font-bold uppercase tracking-[0.13em]",
                  featured
                    ? "text-white/45"
                    : "text-neutral-400",
                ].join(" ")}
              >
                {formatAcademicEventDateRange(
                  event,
                )}
              </p>

              {isNext && (
                <span
                  className={[
                    "rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em]",
                    featured
                      ? "bg-blue-400/10 text-blue-300"
                      : "bg-blue-500/10 text-blue-600",
                  ].join(" ")}
                >
                  Up next
                </span>
              )}
            </div>

            <h3
              className={[
                "mt-2 font-semibold leading-snug tracking-[-0.025em]",
                featured
                  ? "text-[21px] text-white"
                  : "text-[17px] text-neutral-950",
              ].join(" ")}
            >
              {event.title}
            </h3>

            <p
              className={[
                "mt-1.5 text-xs",
                featured
                  ? "text-white/45"
                  : "text-neutral-400",
              ].join(" ")}
            >
              {getCategoryLabel(
                event.type,
              )}
            </p>
          </div>

          {!featured && (
            <div
              className={[
                "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                state === "active"
                  ? "bg-blue-500/10 text-blue-600"
                  : "bg-black/[0.035] text-neutral-400",
              ].join(" ")}
            >
              {state === "past" ? (
                <CheckCircle2 size={16} />
              ) : (
                <Clock3 size={16} />
              )}
            </div>
          )}
        </div>

        {featured && !isPast && (
          <div className="mt-7 border-t border-white/10 pt-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">
                  {countdown.label}
                </p>

                <p className="mt-2 font-mono text-[29px] font-semibold tracking-[-0.05em] tabular-nums text-white sm:text-[34px]">
                  {countdown.value}
                </p>
              </div>

              {event.endDate && (
                <span className="mb-1 text-xs font-medium text-white/45">
                  {formatAcademicEventDuration(
                    event,
                  )}
                </span>
              )}
            </div>

            {state === "active" && (
              <div className="mt-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
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

                <p className="mt-2 text-right text-[10px] font-semibold text-white/45">
                  {Math.round(progress)}%
                  {" elapsed"}
                </p>
              </div>
            )}
          </div>
        )}

        {!featured && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-black/[0.045] pt-3">
            <span className="text-[11px] font-medium text-neutral-400">
              {getAcademicEventStateLabel(
                state,
              )}
            </span>

            {event.endDate && (
              <span className="text-[11px] text-neutral-400">
                {formatAcademicEventDuration(
                  event,
                )}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.button>
  );
}