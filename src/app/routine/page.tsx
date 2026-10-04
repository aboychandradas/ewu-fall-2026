"use client";

import { motion } from "motion/react";
import { MapPin, Clock3 } from "lucide-react";
import { routine, dayLabels } from "@/data/fall-2026";
import { formatTime } from "@/lib/schedule";

export default function RoutinePage() {
  return (
    <div className="space-y-7 pt-3">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-sm font-medium text-neutral-500">
          Fall 2026 · 9th Semester
        </p>

        <h1 className="mt-2 text-[36px] font-semibold tracking-[-0.04em]">
          Routine
        </h1>
      </motion.header>

      <div className="space-y-4">
        {dayLabels.map((day, dayIndex) => {
          const classes = routine
            .filter((item) => item.day === day.code)
            .sort((a, b) => a.start.localeCompare(b.start));

          return (
            <motion.section
              key={day.code}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: dayIndex * 0.04,
              }}
            >
              <div className="mb-2 flex items-center gap-3 px-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                  {day.code}
                </span>

                <h2 className="font-semibold">{day.label}</h2>
              </div>

              <div className="glass overflow-hidden rounded-[26px]">
                {classes.length === 0 ? (
                  <div className="px-5 py-5">
                    <p className="text-sm text-neutral-400">
                      No classes
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-black/6">
                    {classes.map((session) => (
                      <div
                        key={session.id}
                        className="px-5 py-4"
                      >
                        <div className="flex gap-4">
                          <div className="min-w-18.5">
                            <p className="font-semibold">
                              {formatTime(session.start)}
                            </p>

                            <p className="mt-0.5 text-xs text-neutral-400">
                              {formatTime(session.end)}
                            </p>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="truncate font-semibold">
                                {session.course}
                              </h3>

                              {session.type === "lab" && (
                                <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                                  Lab
                                </span>
                              )}
                            </div>

                            <div className="mt-1.5 flex items-center gap-1 text-xs text-neutral-500">
                              <MapPin size={13} />
                              {session.room}
                            </div>

                            <div className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
                              <Clock3 size={13} />
                              {formatTime(session.start)}–
                              {formatTime(session.end)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}