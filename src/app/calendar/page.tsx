"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  ChevronRight,
} from "lucide-react";

import {
  academicEvents,
  type AcademicEvent,
  semesterInfo,
} from "@/data/fall-2026";

import {
  getAcademicEventState,
} from "@/lib/academic-events";

import {
  getNextAcademicEvent,
} from "@/lib/schedule";

import { useLiveNow } from "@/lib/use-live-now";

import CalendarEventCard from "@/components/calendar/calendar-event-card";

import CalendarEventSheet from "@/components/calendar/calendar-event-sheet";

function getMonthKey(date: string) {
  const value = new Date(
    `${date}T00:00:00`,
  );

  return `${value.getFullYear()}-${value.getMonth()}`;
}

function getMonthName(date: string) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      year: "numeric",
    },
  ).format(
    new Date(`${date}T00:00:00`),
  );
}

export default function CalendarPage() {
  const now = useLiveNow();

  const [
    selectedEvent,
    setSelectedEvent,
  ] = useState<AcademicEvent | null>(
    null,
  );

  const groupedEvents = useMemo(() => {
    const sortedEvents = [
      ...academicEvents,
    ].sort((a, b) =>
      a.date.localeCompare(b.date),
    );

    const groups = new Map<
      string,
      AcademicEvent[]
    >();

    for (const event of sortedEvents) {
      const key = getMonthKey(
        event.date,
      );

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key)?.push(event);
    }

    return Array.from(
      groups.entries(),
    );
  }, []);

  const nextEventInfo = useMemo(
    () =>
      now
        ? getNextAcademicEvent(
            academicEvents,
            now,
          )
        : null,
    [now],
  );

  const nextEvent =
    nextEventInfo?.event ?? null;

  if (!now) {
    return (
      <div className="space-y-7 pb-4 pt-3">
        <div className="pt-3">
          <div className="h-3 w-32 animate-pulse rounded-full bg-black/6" />

          <div className="mt-3 h-12 w-52 animate-pulse rounded-2xl bg-black/6" />

          <div className="mt-2 h-4 w-60 animate-pulse rounded-full bg-black/6" />
        </div>

        <div className="h-52 animate-pulse rounded-[30px] bg-black/6" />

        <div className="h-7 w-36 animate-pulse rounded-full bg-black/6" />

        <div className="h-32 animate-pulse rounded-[30px] bg-black/6" />

        <div className="h-32 animate-pulse rounded-[30px] bg-black/6" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-4 pt-3">
      {/* HEADER */}
      <motion.header
        initial={{
          opacity: 0,
          y: 14,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">
              Academic calendar
            </p>

            <h1 className="mt-2 text-[38px] font-semibold tracking-[-0.05em] text-neutral-950">
              Fall 2026
            </h1>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/70 shadow-sm backdrop-blur-xl">
            <CalendarDays
              size={19}
              className="text-neutral-600"
            />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-4">
          <p className="text-[15px] text-neutral-500">
            Important academic dates
          </p>

          <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-neutral-400">
            {new Intl.DateTimeFormat(
              "en-US",
              {
                month: "short",
                day: "numeric",
              },
            ).format(now)}
          </span>
        </div>
      </motion.header>

      {/* NEXT EVENT */}
      {nextEvent && (
        <motion.section
          initial={{
            opacity: 0,
            y: 14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.05,
          }}
        >
          <div className="mb-3 flex items-end justify-between px-1">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                Coming up
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-[-0.025em]">
                Next event
              </h2>
            </div>

            <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-blue-600">
              Live countdown
            </span>
          </div>

          <CalendarEventCard
            event={nextEvent}
            now={now}
            state={getAcademicEventState(
              nextEvent,
              now,
            )}
            isNext
            featured
            onClick={() =>
              setSelectedEvent(
                nextEvent,
              )
            }
          />
        </motion.section>
      )}

      {/* MONTH TIMELINE */}
      <div className="space-y-8">
        {groupedEvents.map(
          (
            [monthKey, events],
            groupIndex,
          ) => {
            const firstEvent =
              events[0];

            return (
              <motion.section
                key={monthKey}
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay:
                    0.08 +
                    groupIndex * 0.045,
                }}
              >
                <div className="mb-3 flex items-center gap-3 px-1">
                  <h2 className="text-lg font-semibold tracking-[-0.025em] text-neutral-900">
                    {getMonthName(
                      firstEvent.date,
                    )}
                  </h2>

                  <div className="h-px flex-1 bg-black/[0.07]" />

                  <span className="text-[10px] font-semibold text-neutral-400">
                    {events.length}{" "}
                    {events.length === 1
                      ? "event"
                      : "events"}
                  </span>
                </div>

                <div className="space-y-3">
                  {events.map(
                    (
                      event,
                      index,
                    ) => {
                      const isNext =
                        nextEvent?.id ===
                        event.id;

                      const state =
                        getAcademicEventState(
                          event,
                          now,
                        );

                      return (
                        <motion.div
                          key={event.id}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.3,
                            delay:
                              index * 0.035,
                          }}
                        >
                          <CalendarEventCard
                            event={event}
                            now={now}
                            state={state}
                            isNext={isNext}
                            onClick={() =>
                              setSelectedEvent(
                                event,
                              )
                            }
                          />
                        </motion.div>
                      );
                    },
                  )}
                </div>
              </motion.section>
            );
          },
        )}
      </div>

      {/* FOOTER */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.2,
        }}
        className="px-2 text-center"
      >
        <p className="text-[11px] leading-5 text-neutral-400">
          {semesterInfo.university} ·
          Information Studies · Fall 2026
        </p>

        <p className="mt-1 text-[10px] text-neutral-400/80">
          Select any event to view its details.
        </p>
      </motion.div>

      {/* EVENT DETAIL SHEET */}
      <AnimatePresence>
        <CalendarEventSheet
          event={selectedEvent}
          open={selectedEvent !== null}
          now={now}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedEvent(null);
            }
          }}
        />
      </AnimatePresence>
    </div>
  );
}