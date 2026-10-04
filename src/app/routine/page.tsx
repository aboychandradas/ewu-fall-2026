"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Sparkles,
} from "lucide-react";

import {
  routine,
  type ClassSession,
  type DayCode,
} from "@/data/fall-2026";

import {
  getClassesForDay,
  getCurrentClass,
  getCurrentDayCode,
  getDayName,
} from "@/lib/schedule";

import DaySelector from "@/components/routine/day-selector";
import RoutineClassCard from "@/components/routine/routine-class-card";
import ClassDetailSheet from "@/components/routine/class-detail-sheet";
import { useNow } from "@/lib/use-now";

export default function RoutinePage() {
  const now = useNow();

  const today: DayCode = now
    ? getCurrentDayCode(now)
    : "S";

  const [selectedDay, setSelectedDay] =
    useState<DayCode | null>(null);

  const [selectedClass, setSelectedClass] =
    useState<ClassSession | null>(null);

  const effectiveSelectedDay =
    selectedDay ?? today;

  const classes = useMemo(
    () =>
      getClassesForDay(
        effectiveSelectedDay,
        routine,
      ),
    [effectiveSelectedDay],
  );

  const currentClass = useMemo(
    () =>
      now
        ? getCurrentClass(now, routine)
        : null,
    [now],
  );

  const selectedIsToday =
    now !== null &&
    effectiveSelectedDay === today;

  if (!now) {
    return (
      <div className="space-y-7 pb-4 pt-3">
        <div className="pt-3">
          <div className="h-3 w-32 animate-pulse rounded-full bg-black/6" />

          <div className="mt-3 h-12 w-48 animate-pulse rounded-2xl bg-black/6" />

          <div className="mt-2 h-4 w-56 animate-pulse rounded-full bg-black/6" />
        </div>

        <div className="h-24 animate-pulse rounded-[28px] bg-black/6" />

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
              Weekly schedule
            </p>

            <h1 className="mt-2 text-[38px] font-semibold tracking-[-0.045em] text-neutral-950">
              Routine
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
          Fall 2026 · Information Studies
        </p>
      </motion.header>

      {/* DAY SELECTOR */}
      <motion.div
        initial={{
          opacity: 0,
          y: 12,
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
        <DaySelector
          selectedDay={effectiveSelectedDay}
          today={today}
          onChange={(day) =>
            setSelectedDay(day)
          }
        />
      </motion.div>

      {/* DAY HEADING */}
      <motion.div
        key={effectiveSelectedDay}
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="px-1"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
              {selectedIsToday
                ? "Today"
                : "Selected day"}
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              {getDayName(
                effectiveSelectedDay,
              )}
            </h2>
          </div>

          {selectedIsToday && (
            <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-blue-600">
              Today
            </span>
          )}
        </div>
      </motion.div>

      {/* SCHEDULE */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {classes.length > 0 ? (
            <motion.div
              key={effectiveSelectedDay}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.28,
              }}
              className="space-y-3"
            >
              {classes.map(
                (session, index) => (
                  <motion.div
                    key={session.id}
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
                      delay: index * 0.06,
                    }}
                  >
                    <RoutineClassCard
                      session={session}
                      isCurrent={
                        selectedIsToday &&
                        currentClass?.id ===
                          session.id
                      }
                      onClick={() =>
                        setSelectedClass(
                          session,
                        )
                      }
                    />
                  </motion.div>
                ),
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`empty-${effectiveSelectedDay}`}
              initial={{
                opacity: 0,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
              }}
              transition={{
                duration: 0.3,
              }}
              className="glass rounded-[30px] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/5">
                <Sparkles
                  size={20}
                  className="text-neutral-500"
                />
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">
                No classes today
              </h3>

              <p className="mt-1.5 max-w-70 text-sm leading-6 text-neutral-500">
                Nothing is scheduled for this
                day. Enjoy the free time.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DAY CODE FOOTER */}
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
        className="px-1 pt-1"
      >
        <p className="text-center text-[11px] leading-5 text-neutral-400">
          S · Sunday &nbsp; M · Monday &nbsp;
          T · Tuesday &nbsp; W · Wednesday &nbsp;
          R · Thursday
        </p>
      </motion.div>

      {/* CLASS DETAIL SHEET */}
      <ClassDetailSheet
        session={selectedClass}
        open={selectedClass !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedClass(null);
          }
        }}
      />
    </div>
  );
}