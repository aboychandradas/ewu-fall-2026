"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import {
  dayLabels,
  routine,
  type ClassSession,
  type DayCode,
} from "@/data/fall-2026";

import {
  getClassesForDay,
  getCurrentClass,
  getCurrentDayCode,
  getDayName,
  getSessionState,
} from "@/lib/schedule";

import DaySelector from "@/components/routine/day-selector";
import RoutineClassCard, {
  type RoutineCardState,
} from "@/components/routine/routine-class-card";
import ClassDetailSheet from "@/components/routine/class-detail-sheet";

import { useLiveNow } from "@/lib/use-live-now";

const dayOrder: DayCode[] = [
  "S",
  "M",
  "T",
  "W",
  "R",
  "F",
  "A",
];

const dayContentVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 18 : -18,
  }),

  animate: {
    opacity: 1,
    x: 0,
  },

  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -18 : 18,
  }),
};

export default function RoutinePage() {
  const now = useLiveNow();

  const today: DayCode = now
    ? getCurrentDayCode(now)
    : "S";

  const [selectedDay, setSelectedDay] =
    useState<DayCode | null>(null);

  const [selectedClass, setSelectedClass] =
    useState<ClassSession | null>(null);

  const [direction, setDirection] =
    useState(0);

  const pointerStartX =
    useRef<number | null>(null);

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
        ? getCurrentClass(
            now,
            routine,
          )
        : null,
    [now],
  );

  const selectedIsToday =
    now !== null &&
    effectiveSelectedDay === today;

  function selectDay(day: DayCode) {
    if (day === effectiveSelectedDay) {
      return;
    }

    const currentIndex =
      dayOrder.indexOf(
        effectiveSelectedDay,
      );

    const nextIndex =
      dayOrder.indexOf(day);

    setDirection(
      nextIndex > currentIndex
        ? 1
        : -1,
    );

    setSelectedDay(day);
  }

  function moveDay(step: number) {
    const currentIndex =
      dayOrder.indexOf(
        effectiveSelectedDay,
      );

    const nextIndex =
      currentIndex + step;

    if (
      nextIndex < 0 ||
      nextIndex >= dayOrder.length
    ) {
      return;
    }

    selectDay(
      dayOrder[nextIndex],
    );
  }

  function handlePointerDown(
    event: PointerEvent<HTMLDivElement>,
  ) {
    pointerStartX.current =
      event.clientX;
  }

  function handlePointerUp(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (
      pointerStartX.current === null
    ) {
      return;
    }

    const distance =
      event.clientX -
      pointerStartX.current;

    pointerStartX.current = null;

    if (Math.abs(distance) < 56) {
      return;
    }

    moveDay(
      distance < 0 ? 1 : -1,
    );
  }

  if (!now) {
    return (
      <div className="space-y-7 pb-4 pt-3">
        <div className="pt-3">
          <div className="h-3 w-32 animate-pulse rounded-full bg-black/6" />

          <div className="mt-3 h-12 w-48 animate-pulse rounded-2xl bg-black/6" />

          <div className="mt-2 h-4 w-56 animate-pulse rounded-full bg-black/6" />
        </div>

        <div className="h-24 animate-pulse rounded-[30px] bg-black/6" />

        <div className="h-7 w-36 animate-pulse rounded-full bg-black/6" />

        <div className="h-36 animate-pulse rounded-[30px] bg-black/6" />

        <div className="h-36 animate-pulse rounded-[30px] bg-black/6" />
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
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">
              Weekly schedule
            </p>

            <h1 className="mt-2 text-[38px] font-semibold tracking-[-0.05em] text-neutral-950">
              Routine
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
            Fall 2026 · Information
            Studies
          </p>

          <span className="font-mono text-xs font-semibold tabular-nums text-neutral-400">
            {new Intl.DateTimeFormat(
              "en-US",
              {
                hour: "numeric",
                minute: "2-digit",
              },
            ).format(now)}
          </span>
        </div>
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
          onChange={selectDay}
        />
      </motion.div>

      {/* DAY HEADING */}
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <motion.div
          key={effectiveSelectedDay}
          variants={dayContentVariants}
          custom={direction}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 30,
          }}
          className="flex items-end justify-between px-1"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-400">
              {selectedIsToday
                ? "Today"
                : "Selected day"}
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-[-0.025em]">
              {getDayName(
                effectiveSelectedDay,
              )}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileTap={{
                scale: 0.9,
              }}
              onClick={() =>
                moveDay(-1)
              }
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-neutral-500 outline-none focus-visible:ring-2 focus-visible:ring-black/15"
              aria-label="Previous day"
            >
              <ChevronLeft size={16} />
            </motion.button>

            {selectedIsToday && (
              <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                Today
              </span>
            )}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.9,
              }}
              onClick={() =>
                moveDay(1)
              }
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-neutral-500 outline-none focus-visible:ring-2 focus-visible:ring-black/15"
              aria-label="Next day"
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* SCHEDULE */}
      <div
        style={{
          touchAction: "pan-y",
        }}
        onPointerDown={
          handlePointerDown
        }
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStartX.current =
            null;
        }}
      >
        <AnimatePresence
          mode="wait"
          initial={false}
          custom={direction}
        >
          <motion.div
            key={effectiveSelectedDay}
            variants={dayContentVariants}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="space-y-3"
          >
            {classes.length > 0 ? (
              classes.map(
                (session, index) => {
                  const state: RoutineCardState =
                    selectedIsToday
                      ? getSessionState(
                          now,
                          session,
                        )
                      : "scheduled";

                  return (
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
                        type: "spring",
                        stiffness: 300,
                        damping: 28,
                        delay:
                          index * 0.055,
                      }}
                    >
                      <RoutineClassCard
                        session={session}
                        state={state}
                        now={now}
                        isToday={
                          selectedIsToday
                        }
                        onClick={() =>
                          setSelectedClass(
                            session,
                          )
                        }
                      />
                    </motion.div>
                  );
                },
              )
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
                  type: "spring",
                  stiffness: 300,
                  damping: 28,
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
                  No classes
                </h3>

                <p className="mt-1.5 max-w-70 text-sm leading-6 text-neutral-500">
                  Nothing is scheduled
                  for{" "}
                  {getDayName(
                    effectiveSelectedDay,
                  ).toLowerCase()}
                  .
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
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
        className="px-1 pt-1"
      >
        <p className="text-center text-[11px] leading-5 text-neutral-400">
          S · Sunday &nbsp; M · Monday
          &nbsp; T · Tuesday &nbsp; W ·
          Wednesday &nbsp; R · Thursday
        </p>
      </motion.div>

      {/* DETAIL SHEET */}
      <ClassDetailSheet
        session={selectedClass}
        open={selectedClass !== null}
        now={now}
        isToday={selectedIsToday}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedClass(null);
          }
        }}
      />
    </div>
  );
}