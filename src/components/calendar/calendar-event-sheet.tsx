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
  Timer,
  X,
} from "lucide-react";

import type {
  AcademicEvent,
} from "@/data/fall-2026";

import {
  formatAcademicEventDateRange,
  formatAcademicEventDuration,
  getAcademicEventCountdown,
  getAcademicEventState,
  getAcademicEventStateLabel,
} from "@/lib/academic-events";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface CalendarEventSheetProps {
  event: AcademicEvent | null;
  open: boolean;
  now: Date;
  onOpenChange: (open: boolean) => void;
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

export default function CalendarEventSheet({
  event,
  open,
  now,
  onOpenChange,
}: CalendarEventSheetProps) {
  if (!event) {
    return null;
  }

  const Icon = EVENT_ICONS[event.type];

  const state =
    getAcademicEventState(
      event,
      now,
    );

  const countdown =
    getAcademicEventCountdown(
      event,
      now,
    );

  const StateIcon =
    state === "active"
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
        className="mx-auto max-h-[88svh] w-full max-w-130 overflow-y-auto rounded-t-[36px] border-0 bg-[#f5f5f7] px-5 pb-9 pt-4"
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-black/12" />

        <SheetHeader className="text-left">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 rounded-full bg-black/4.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              <Icon size={13} />
              {getCategoryLabel(
                event.type,
              )}
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
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/4.5 text-neutral-500 outline-none focus-visible:ring-2 focus-visible:ring-black/15"
              aria-label="Close event details"
            >
              <X size={17} />
            </motion.button>
          </div>

          <SheetTitle className="text-[29px] font-semibold tracking-[-0.045em] text-neutral-950">
            {event.title}
          </SheetTitle>

          <p className="mt-2 text-sm font-medium text-neutral-500">
            Fall 2026 · Information Studies
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
          <div className="premium-hero rounded-[30px] p-5">
            <div className="flex items-start gap-4">
              <div className="hero-icon">
                <StateIcon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="eyebrow">
                  Event status
                </p>

                <p className="mt-2 text-xl font-semibold tracking-tight text-white">
                  {getAcademicEventStateLabel(
                    state,
                  )}
                </p>

                <p className="mt-1.5 text-sm text-white/50">
                  {countdown.label}
                </p>

                <p className="mt-1 font-mono text-[26px] font-semibold tracking-[-0.04em] tabular-nums text-white">
                  {countdown.value}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-3 space-y-3">
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.04,
            }}
            className="glass rounded-[28px] p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/4.5">
                <CalendarDays size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-neutral-400">
                  Date
                </p>

                <p className="mt-1 font-semibold leading-6 text-neutral-900">
                  {formatAcademicEventDateRange(
                    event,
                    true,
                  )}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
            }}
            className="glass rounded-[28px] p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/4.5">
                <Clock3 size={19} />
              </div>

              <div>
                <p className="text-xs font-medium text-neutral-400">
                  Duration
                </p>

                <p className="mt-1 font-semibold text-neutral-900">
                  {formatAcademicEventDuration(
                    event,
                  )}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.12,
            }}
            className="glass rounded-[28px] p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/4.5">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <p className="text-xs font-medium text-neutral-400">
                  Category
                </p>

                <p className="mt-1 font-semibold text-neutral-900">
                  {getCategoryLabel(
                    event.type,
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-neutral-400">
          Personal academic companion ·
          Fall 2026
        </p>
      </SheetContent>
    </Sheet>
  );
}