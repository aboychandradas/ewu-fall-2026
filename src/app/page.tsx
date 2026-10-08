"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";
import { useMemo } from "react";

import {
  academicEvents,
  semesterInfo,
} from "@/data/fall-2026";

import LiveStatusCard from "@/components/home/live-status-card";

import {
  formatRelativeDate,
  formatTime,
  getClassesForDate,
  getCurrentClass,
  getNextAcademicEvent,
  getNextClass,
} from "@/lib/schedule";

import { useLiveNow } from "@/lib/use-live-now";

function formatToday(date: Date) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    },
  ).format(date);
}

function getGreeting(hour: number) {
  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

function formatCountdownTo(
  target: Date,
  now: Date,
) {
  const difference =
    target.getTime() - now.getTime();

  if (difference <= 0) {
    return "Now";
  }

  const minutes = Math.ceil(
    difference / 60000,
  );

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(
    minutes / 60,
  );

  const remainingMinutes =
    minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

function getSemesterProgress(
  now: Date,
) {
  const start =
    new Date(
      `${semesterInfo.startDate}T00:00:00`,
    ).getTime();

  const end =
    new Date(
      `${semesterInfo.endDate}T23:59:59`,
    ).getTime();

  const current = now.getTime();

  if (current <= start) {
    return 0;
  }

  if (current >= end) {
    return 100;
  }

  return Math.round(
    ((current - start) /
      (end - start)) *
      100,
  );
}

export default function Home() {
  const router = useRouter();

  const now = useLiveNow();

  const todayClasses = useMemo(
    () =>
      now
        ? getClassesForDate(now)
        : [],
    [now],
  );

  const currentClass = useMemo(
    () =>
      now
        ? getCurrentClass(now)
        : null,
    [now],
  );

  const nextClass = useMemo(
    () =>
      now
        ? getNextClass(now)
        : null,
    [now],
  );

  const nextEvent = useMemo(
    () =>
      now
        ? getNextAcademicEvent(
            academicEvents,
            now,
          )
        : null,
    [now],
  );

  const semesterProgress =
    now
      ? getSemesterProgress(now)
      : 0;

  if (!now) {
    return (
      <div className="space-y-7 pb-3">
        <div className="pt-3">
          <div className="h-3 w-32 animate-pulse rounded-full bg-black/6" />

          <div className="mt-3 h-4 w-44 animate-pulse rounded-full bg-black/6" />

          <div className="mt-7 h-12 w-64 animate-pulse rounded-2xl bg-black/6" />

          <div className="mt-3 h-4 w-40 animate-pulse rounded-full bg-black/6" />
        </div>

        <div className="h-72 animate-pulse rounded-[32px] bg-black/6" />

        <div className="h-36 animate-pulse rounded-[30px] bg-black/6" />

        <div className="h-28 animate-pulse rounded-[30px] bg-black/6" />
      </div>
    );
  }

  const isCurrent = Boolean(
    currentClass,
  );

  const isNextToday = Boolean(
    !currentClass &&
      nextClass &&
      new Date(
        nextClass.start,
      ).toDateString() ===
        now.toDateString(),
  );

  const status =
    isCurrent
      ? "current"
      : isNextToday
        ? "next"
        : "done";

  const session =
    currentClass ??
    nextClass?.session ??
    null;

  const nextStart =
    status === "next"
      ? nextClass?.start
      : undefined;

  return (
    <div className="space-y-7 pb-3">
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
          duration: 0.55,
          ease: "easeOut",
        }}
        className="pt-3"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400">
              East West University
            </p>

            <p className="mt-2 text-sm font-medium text-neutral-500">
              {semesterInfo.department}
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/70 shadow-sm backdrop-blur-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-neutral-700">
              9TH
            </span>
          </div>
        </div>

        <h1 className="mt-7 text-[39px] font-semibold tracking-[-0.055em] text-neutral-950">
          {getGreeting(
            now.getHours(),
          )}
        </h1>

        <div className="mt-1 flex items-center justify-between gap-4">
          <p className="text-[15px] text-neutral-500">
            {formatToday(now)}
          </p>

          <p className="shrink-0 font-mono text-sm font-semibold tabular-nums text-neutral-700">
            {new Intl.DateTimeFormat(
              "en-US",
              {
                hour: "numeric",
                minute: "2-digit",
              },
            ).format(now)}
          </p>
        </div>
      </motion.header>

      <LiveStatusCard
        status={status}
        session={session}
        now={now}
        start={nextStart}
        onOpenRoutine={() => {
          router.push("/routine");
        }}
      />

      <section className="space-y-3">
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
            delay: 0.08,
          }}
          className="flex items-end justify-between px-1"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">
              Today
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Your schedule
            </h2>
          </div>

          <Link
            href="/routine/"
            className="group flex items-center gap-1 text-sm font-semibold text-neutral-500 outline-none transition-colors hover:text-neutral-950 focus-visible:text-neutral-950"
          >
            Full routine
            <ChevronRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        <div className="glass overflow-hidden rounded-[30px]">
          {todayClasses.length ===
          0 ? (
            <div className="px-5 py-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/5">
                <Clock3
                  size={19}
                  className="text-neutral-500"
                />
              </div>

              <p className="mt-4 font-semibold">
                No classes today.
              </p>

              <p className="mt-1 text-sm leading-6 text-neutral-500">
                Your schedule is clear
                for the rest of the
                day.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-black/6">
              {todayClasses.map(
                (
                  session,
                  index,
                ) => {
                  const current =
                    currentClass?.id ===
                    session.id;

                  const start =
                    new Date(now);

                  const [
                    hours,
                    minutes,
                  ] =
                    session.start
                      .split(":")
                      .map(Number);

                  start.setHours(
                    hours,
                    minutes,
                    0,
                    0,
                  );

                  const isUpcoming =
                    start.getTime() >
                    now.getTime();

                  return (
                    <motion.div
                      key={session.id}
                      initial={{
                        opacity: 0,
                        x: 10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        delay:
                          0.1 +
                          index * 0.05,
                      }}
                      className={[
                        "px-5 py-4 transition",
                        current
                          ? "bg-blue-500/4.5"
                          : "",
                      ].join(" ")}
                    >
                      <div className="flex gap-4">
                        <div className="w-[4.65rem] shrink-0">
                          <p
                            className={[
                              "text-sm font-semibold",
                              current
                                ? "text-blue-600"
                                : "text-neutral-800",
                            ].join(" ")}
                          >
                            {formatTime(
                              session.start,
                            )}
                          </p>

                          <p className="mt-0.5 text-xs text-neutral-400">
                            {formatTime(
                              session.end,
                            )}
                          </p>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="truncate font-semibold tracking-[-0.015em]">
                              {session.course}
                            </h3>

                            {current && (
                              <span className="flex shrink-0 items-center gap-1 rounded-full bg-blue-500/10 px-2 py-1 text-[10px] font-semibold text-blue-600">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                                NOW
                              </span>
                            )}

                            {!current &&
                              isUpcoming && (
                                <span className="hidden shrink-0 rounded-full bg-black/4 px-2 py-1 text-[10px] font-semibold text-neutral-400 sm:inline-flex">
                                  UPCOMING
                                </span>
                              )}
                          </div>

                          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
                            <span className="inline-flex items-center gap-1">
                              <MapPin
                                size={13}
                              />
                              {session.room}
                            </span>

                            <span className="inline-flex items-center gap-1">
                              <Clock3
                                size={13}
                              />
                              {session.type ===
                              "lab"
                                ? "Lab"
                                : "Class"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                },
              )}
            </div>
          )}
        </div>
      </section>

      <section>
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
            delay: 0.14,
          }}
          className="glass rounded-[30px] p-5"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                Fall 2026
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Semester progress
              </h2>
            </div>

            <span className="text-sm font-semibold text-neutral-700">
              {semesterProgress}%
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/6">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${semesterProgress}%`,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="h-full rounded-full bg-neutral-900"
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
            <span>
              {formatRelativeDate(
                new Date(
                  `${semesterInfo.startDate}T00:00:00`,
                ),
                now,
              )}
            </span>

            <span>
              Ends{" "}
              {formatRelativeDate(
                new Date(
                  `${semesterInfo.endDate}T23:59:59`,
                ),
                now,
              )}
            </span>
          </div>
        </motion.div>
      </section>

      {nextEvent && (
        <motion.section
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
            delay: 0.2,
          }}
        >
          <Link
            href="/calendar/"
            className="group block outline-none"
          >
            <motion.div
              whileTap={{
                scale: 0.985,
              }}
              className="glass rounded-[30px] p-5 transition-shadow group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.075)] focus-visible:ring-2 focus-visible:ring-black/15"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/5">
                  <CalendarDays
                    size={19}
                    className="text-neutral-600"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                    Next academic event
                  </p>

                  <h2 className="mt-1.5 font-semibold tracking-[-0.015em]">
                    {nextEvent.event.title}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                    <span>
                      {formatRelativeDate(
                        nextEvent.start,
                        now,
                      )}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-neutral-300" />

                    <span>
                      {formatCountdownTo(
                        nextEvent.start,
                        now,
                      )}
                    </span>
                  </div>
                </div>

                <ArrowRight
                  size={18}
                  className="mt-1 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </motion.div>
          </Link>
        </motion.section>
      )}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.26,
        }}
        className="px-1 pb-3"
      >
        <p className="text-center text-[11px] leading-5 text-neutral-400">
          East West University ·
          Information Studies ·
          Fall 2026
        </p>
      </motion.div>
    </div>
  );
}