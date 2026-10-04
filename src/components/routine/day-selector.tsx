"use client";

import { motion } from "motion/react";
import { dayLabels, type DayCode } from "@/data/fall-2026";

interface DaySelectorProps {
  selectedDay: DayCode;
  today: DayCode;
  onChange: (day: DayCode) => void;
}

const shortNames: Record<DayCode, string> = {
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
    <div className="glass rounded-[28px] p-2">
      <div className="grid grid-cols-7 gap-1">
        {dayLabels.map((day) => {
          const active = selectedDay === day.code;
          const isToday = today === day.code;

          return (
            <button
              key={day.code}
              type="button"
              onClick={() => onChange(day.code)}
              className="relative min-w-0 rounded-[21px] px-1 py-3 text-center outline-none"
            >
              {active && (
                <motion.div
                  layoutId="routine-day-pill"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 32,
                  }}
                  className="absolute inset-0 rounded-[21px] bg-neutral-950"
                />
              )}

              <span className="relative z-10 block">
                <span
                  className={`block text-[15px] font-semibold transition-colors ${
                    active
                      ? "text-white"
                      : "text-neutral-800"
                  }`}
                >
                  {day.code === "A"
                    ? "S"
                    : day.code}
                </span>

                <span
                  className={`mt-0.5 block text-[9px] font-medium transition-colors ${
                    active
                      ? "text-white/55"
                      : "text-neutral-400"
                  }`}
                >
                  {shortNames[day.code]}
                </span>

                {isToday && !active && (
                  <motion.span
                    layoutId="today-dot"
                    className="mx-auto mt-1 block h-1 w-1 rounded-full bg-blue-500"
                  />
                )}

                {isToday && active && (
                  <motion.span
                    layoutId="active-today-dot"
                    className="mx-auto mt-1 block h-1 w-1 rounded-full bg-blue-300"
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}