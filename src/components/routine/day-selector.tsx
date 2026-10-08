"use client";

import { motion } from "motion/react";

import {
  dayLabels,
  type DayCode,
} from "@/data/fall-2026";

interface DaySelectorProps {
  selectedDay: DayCode;
  today: DayCode;
  onChange: (day: DayCode) => void;
}

const shortNames: Record<
  DayCode,
  string
> = {
  S: "Sun",
  M: "Mon",
  T: "Tue",
  W: "Wed",
  R: "Thu",
  F: "Fri",
  A: "Sat",
};

export default function DaySelector({
  selectedDay,
  today,
  onChange,
}: DaySelectorProps) {
  return (
    <div className="glass rounded-[30px] p-2">
      <div className="grid grid-cols-7 gap-1">
        {dayLabels.map((day) => {
          const active =
            selectedDay === day.code;

          const isToday =
            today === day.code;

          return (
            <motion.button
              key={day.code}
              type="button"
              aria-label={`Select ${shortNames[day.code]}`}
              aria-pressed={active}
              onClick={() =>
                onChange(day.code)
              }
              whileTap={{
                scale: 0.92,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
              className="relative min-w-0 touch-manipulation rounded-[22px] px-1 py-3 text-center outline-none focus-visible:ring-2 focus-visible:ring-black/15"
            >
              {active && (
                <motion.div
                  layoutId="routine-day-pill"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 32,
                  }}
                  className="absolute inset-0 rounded-[22px] bg-neutral-950 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                />
              )}

              <span className="relative z-10 block">
                <span
                  className={[
                    "block text-[15px] font-semibold transition-colors",
                    active
                      ? "text-white"
                      : "text-neutral-800",
                  ].join(" ")}
                >
                  {day.code === "A"
                    ? "S"
                    : day.code}
                </span>

                <span
                  className={[
                    "mt-0.5 block text-[9px] font-medium transition-colors",
                    active
                      ? "text-white/55"
                      : "text-neutral-400",
                  ].join(" ")}
                >
                  {shortNames[day.code]}
                </span>

                {isToday && (
                  <motion.span
                    layoutId="today-dot"
                    className={[
                      "mx-auto mt-1 block h-1 w-1 rounded-full",
                      active
                        ? "bg-blue-300"
                        : "bg-blue-500",
                    ].join(" ")}
                  />
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}