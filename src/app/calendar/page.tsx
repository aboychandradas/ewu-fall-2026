"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

import {
  academicEvents,
  type AcademicEvent,
} from "@/data/fall-2026";

import { useNow } from "@/lib/use-now";

import CalendarEventCard from "@/components/calendar/calendar-event-card";
import CalendarEventSheet from "@/components/calendar/calendar-event-sheet";

function getMonthKey(date: string) {
  const value = new Date(
    `${date}T00:00:00`,
  );

  return `${value.getFullYear()}-${value.getMonth()}`;
}

function getMonthName(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(
    new Date(`${date}T00:00:00`),
  );
}

function isPastEvent(
  event: AcademicEvent,
  now: Date,
) {
  const end = new Date(
    `${event.endDate ?? event.date}T23:59:59`,
  );

  return end < now;
}

export default function CalendarPage() {
  const now = useNow();

  const [selectedEvent, setSelectedEvent] =
    useState<AcademicEvent | null>(null);

  const groupedEvents = useMemo(() => {
    const groups = new Map<
      string,
      AcademicEvent[]
    >();

    for (const event of academicEvents) {
      const key = getMonthKey(event.date);

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key)?.push(event);
    }

    return Array.from(groups.entries());
  }, []);

  const nextEvent = useMemo(() => {
    if (!now) {
      return null;
    }

    const currentDay = new Date(now);

    currentDay.setHours(0, 0, 0, 0);

    return (
      academicEvents
        .map((event) => ({
          event,
          start: new Date(
            `${event.date}T00:00:00`,
          ),
          end: new Date(
            `${event.endDate ?? event.date}T23:59:59`,
          ),
        }))
        .filter(
          ({ end }) => end >= currentDay,
        )
        .sort(
          (a, b) =>
            a.start.getTime() -
            b.start.getTime(),
        )[0]?.event ?? null
    );
  }, [now]);

  if (!now) {
    return (
      <div className="space-y-7 pb-4 pt-3">
        <div className="pt-3">
          <div className="h-3 w-32 animate-pulse rounded-full bg-black/6" />

          <div className="mt-3 h-12 w-52 animate-pulse rounded-2xl bg-black/6" />

          <div className="mt-2 h-4 w-60 animate-pulse rounded-full bg-black/6" />
        </div>

        <div className="h-28 animate-pulse rounded-[30px] bg-black/6" />

        <div className="h-7 w-36 animate-pulse rounded-full bg-black/6" />

        <div className="h-32 animate-pulse rounded-[28px] bg-black/6" />

        <div className="h-32 animate-pulse rounded-[28px] bg-black/6" />
      </div>
    );
  }

  return (
    <div className="space-y-7 pb-4 pt-3">
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
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
              Academic calendar
            </p>

            <h1 className="mt-2 text-[38px] font-semibold tracking-[-0.045em] text-neutral-950">
              Fall 2026
            </h1>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 shadow-sm ring-1 ring-black/5">
            <CalendarDays
              size={19}
              className="text-neutral-600"
            />
          </div>
        </div>

        <p className="mt-2 text-[15px] text-neutral-500">
          Important academic dates
        </p>
      </motion.header>

      {/* UPCOMING EVENT */}
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
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Coming up
          </p>

          <CalendarEventCard
            event={nextEvent}
            isNext
            isPast={false}
            onClick={() =>
              setSelectedEvent(nextEvent)
            }
          />
        </motion.section>
      )}

      {/* TIMELINE */}
      <div className="space-y-8">
        {groupedEvents.map(
          ([monthKey, events], groupIndex) => {
            const firstEvent = events[0];

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
                  duration: 0.45,
                  delay:
                    0.1 +
                    groupIndex * 0.05,
                }}
              >
                <div className="mb-3 flex items-center gap-3 px-1">
                  <h2 className="text-lg font-semibold tracking-[-0.02em]">
                    {getMonthName(
                      firstEvent.date,
                    )}
                  </h2>

                  <div className="h-px flex-1 bg-black/6" />
                </div>

                <div className="space-y-3">
                  {events.map(
                    (event, index) => {
                      const isNext =
                        nextEvent?.id ===
                        event.id;

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
                            duration: 0.35,
                            delay:
                              0.12 +
                              index * 0.05,
                          }}
                        >
                          <CalendarEventCard
                            event={event}
                            isNext={isNext}
                            isPast={isPastEvent(
                              event,
                              now,
                            )}
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
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.25,
        }}
        className="px-2 text-center text-[11px] leading-5 text-neutral-400"
      >
        East West University · Information
        Studies · Fall 2026
      </motion.p>

      {/* DETAIL SHEET */}
      <CalendarEventSheet
        event={selectedEvent}
        open={selectedEvent !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedEvent(null);
          }
        }}
      />
    </div>
  );
}