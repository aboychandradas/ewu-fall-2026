"use client";

import { motion } from "motion/react";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import Link from "next/link";
import { getClassesForDay, getCurrentDayCode, formatTime, getDayName } from "@/lib/schedule";
import { semesterInfo } from "@/data/fall-2026";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export default function Home() {
  const todayCode = getCurrentDayCode();
  const todaysClasses = getClassesForDay(todayCode);

  return (
    <div className="space-y-7">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="pt-3"
      >
        <p className="text-sm font-medium text-neutral-500">
          {semesterInfo.department} · {semesterInfo.semesterNumber}th Semester
        </p>

        <h1 className="mt-2 text-[36px] font-semibold tracking-[-0.04em] text-neutral-950">
          {getGreeting()}
        </h1>

        <p className="mt-1 text-[15px] text-neutral-500">
          {formatDate()}
        </p>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
      >
        <div className="glass overflow-hidden rounded-[30px]">
          <div className="px-5 pb-4 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                  Today
                </p>

                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  {getDayName(todayCode)}
                </h2>
              </div>

              <div className="rounded-full bg-black/5 px-3 py-1.5 text-xs font-medium text-neutral-500">
                {todaysClasses.length}{" "}
                {todaysClasses.length === 1 ? "class" : "classes"}
              </div>
            </div>
          </div>

          <div className="divide-y divide-black/6">
            {todaysClasses.length > 0 ? (
              todaysClasses.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  className="px-5 py-4"
                >
                  <div className="flex gap-4">
                    <div className="min-w-18.5">
                      <p className="text-lg font-semibold tracking-tight">
                        {formatTime(session.start)}
                      </p>

                      <p className="mt-0.5 text-xs text-neutral-400">
                        {formatTime(session.end)}
                      </p>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">
                        {session.course}
                      </p>

                      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={13} />
                          {session.room}
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <Clock3 size={13} />
                          {session.type === "lab" ? "Lab" : "Class"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="px-5 py-8">
                <p className="font-medium">No classes today.</p>
                <p className="mt-1 text-sm text-neutral-500">
                  Enjoy your free day.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
      >
        <Link href="/routine" className="block">
          <div className="glass group rounded-[30px] p-5 transition-transform active:scale-[0.985]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                  Weekly routine
                </p>

                <p className="mt-1.5 font-semibold">
                  View the complete schedule
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  Sunday through Thursday
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}