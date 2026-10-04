"use client";

import {
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  PartyPopper,
  Sparkles,
  X,
} from "lucide-react";

import type { AcademicEvent } from "@/data/fall-2026";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface CalendarEventSheetProps {
  event: AcademicEvent | null;
  open: boolean;
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

function formatDateRange(
  date: string,
  endDate?: string,
) {
  const start = new Date(`${date}T00:00:00`);

  const startText =
    new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(start);

  if (!endDate) {
    return startText;
  }

  const end = new Date(`${endDate}T00:00:00`);

  const endText =
    new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(end);

  return `${startText} – ${endText}`;
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

export default function CalendarEventSheet({
  event,
  open,
  onOpenChange,
}: CalendarEventSheetProps) {
  if (!event) {
    return null;
  }

  const Icon = EVENT_ICONS[event.type];

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="bottom"
        className="mx-auto max-w-130 rounded-t-4xl border-0 bg-[#f5f5f7] px-5 pb-8 pt-4"
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-black/12" />

        <SheetHeader className="text-left">
          <div className="mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
              <Icon size={13} />
              {getCategoryLabel(event.type)}
            </span>

            <button
              type="button"
              onClick={() =>
                onOpenChange(false)
              }
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-neutral-500 transition active:scale-95"
              aria-label="Close"
            >
              <X size={17} />
            </button>
          </div>

          <SheetTitle className="text-[28px] font-semibold tracking-[-0.04em] text-neutral-950">
            {event.title}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-7 space-y-3">
          <div className="glass rounded-3xl p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/5">
                <CalendarDays size={19} />
              </div>

              <div>
                <p className="text-xs font-medium text-neutral-400">
                  Date
                </p>

                <p className="mt-1 font-semibold">
                  {formatDateRange(
                    event.date,
                    event.endDate,
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/5">
                <Clock3 size={19} />
              </div>

              <div>
                <p className="text-xs font-medium text-neutral-400">
                  Semester
                </p>

                <p className="mt-1 font-semibold">
                  Fall 2026
                </p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/5">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <p className="text-xs font-medium text-neutral-400">
                  Category
                </p>

                <p className="mt-1 font-semibold">
                  {getCategoryLabel(
                    event.type,
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}