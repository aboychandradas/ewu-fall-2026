"use client";

import { motion } from "motion/react";
import { Clock3, MapPin } from "lucide-react";
import type { ClassSession } from "@/data/fall-2026";
import { formatTime } from "@/lib/schedule";

interface RoutineClassCardProps {
  session: ClassSession;
  isCurrent: boolean;
  onClick: () => void;
}

export default function RoutineClassCard({
  session,
  isCurrent,
  onClick,
}: RoutineClassCardProps) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -8,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      whileTap={{
        scale: 0.985,
      }}
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-[28px] text-left outline-none transition ${
        isCurrent
          ? "bg-neutral-950 text-white shadow-[0_20px_50px_rgba(0,0,0,0.14)]"
          : "glass"
      }`}
    >
      {isCurrent && (
        <>
          <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-400/[0.12] blur-3xl" />

          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.08]" />
        </>
      )}

      <div className="relative flex gap-4 p-5">
        <div className="w-[78px] shrink-0">
          <p
            className={`text-[15px] font-semibold tracking-[-0.015em] ${
              isCurrent
                ? "text-white"
                : "text-neutral-800"
            }`}
          >
            {formatTime(session.start)}
          </p>

          <p
            className={`mt-1 text-[11px] ${
              isCurrent
                ? "text-white/40"
                : "text-neutral-400"
            }`}
          >
            {formatTime(session.end)}
          </p>

          {isCurrent && (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-blue-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-300" />
              Now
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                className={`truncate text-[18px] font-semibold tracking-[-0.025em] ${
                  isCurrent
                    ? "text-white"
                    : "text-neutral-950"
                }`}
              >
                {session.course}
              </h3>

              <p
                className={`mt-1 text-xs ${
                  isCurrent
                    ? "text-white/45"
                    : "text-neutral-400"
                }`}
              >
                {session.type === "lab"
                  ? "Laboratory"
                  : "Class"}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.09em] ${
                isCurrent
                  ? "bg-white/[0.08] text-white/55"
                  : "bg-black/[0.05] text-neutral-400"
              }`}
            >
              {session.type === "lab"
                ? "Lab"
                : "Course"}
            </span>
          </div>

          <div
            className={`mt-4 flex items-center gap-1.5 text-xs ${
              isCurrent
                ? "text-white/55"
                : "text-neutral-500"
            }`}
          >
            <MapPin size={14} />
            <span>{session.room}</span>
          </div>

          <div
            className={`mt-1.5 flex items-center gap-1.5 text-xs ${
              isCurrent
                ? "text-white/35"
                : "text-neutral-400"
            }`}
          >
            <Clock3 size={14} />
            <span>
              {formatTime(session.start)}–{formatTime(session.end)}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}