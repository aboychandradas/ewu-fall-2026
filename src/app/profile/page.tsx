"use client";

import { motion } from "motion/react";

import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  School,
} from "lucide-react";

import { semesterInfo } from "@/data/fall-2026";

const TOTAL_PLANNED_SEMESTERS = 12;

const studentName = "Sumi Akter";

const currentSemester = Math.max(
  1,
  Math.min(
    TOTAL_PLANNED_SEMESTERS,
    Number(semesterInfo.semesterNumber) || 9,
  ),
);

const progress = Math.round(
  (currentSemester / TOTAL_PLANNED_SEMESTERS) * 100,
);

const remainingSemesters = Math.max(
  0,
  TOTAL_PLANNED_SEMESTERS - currentSemester,
);

export default function ProfilePage() {
  return (
    <div className="space-y-7 pb-8 pt-2">
      {/* PAGE HEADER */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400">
          YOUR ACADEMIC SPACE
        </p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-neutral-950">
          Profile
        </h1>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Your academic journey, all in one place.
        </p>
      </motion.header>

      {/* STUDENT IDENTITY CARD */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="premium-hero overflow-hidden rounded-[32px] p-6 sm:p-7"
      >
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[24px] border border-white/15 bg-white/10 text-2xl font-semibold tracking-tight text-white shadow-lg shadow-black/10">
            SA
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
              STUDENT PROFILE
            </p>

            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
              {studentName}
            </h2>

            <p className="mt-1 text-sm text-white/65">
              Information Studies
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white/85">
            <GraduationCap
              size={23}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="relative z-10 mt-6 flex items-center gap-2 border-t border-white/10 pt-5">
          <School
            size={17}
            className="shrink-0 text-white/65"
            aria-hidden="true"
          />

          <p className="text-sm font-medium text-white/85">
            {semesterInfo.university}
          </p>
        </div>
      </motion.section>

      {/* ACADEMIC INFORMATION */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="space-y-3"
      >
        <div className="px-1">
          <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
            Academic information
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Your current university and semester details.
          </p>
        </div>

        <div className="glass overflow-hidden rounded-[28px] p-2">
          <div className="flex items-center gap-3 rounded-2xl p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
              <School
                size={21}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-neutral-400">
                University
              </p>

              <p className="mt-1 font-semibold text-neutral-950">
                {semesterInfo.university}
              </p>
            </div>
          </div>

          <div className="mx-3 border-t border-black/5" />

          <div className="flex items-center gap-3 rounded-2xl p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
              <BookOpen
                size={21}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-neutral-400">
                Department
              </p>

              <p className="mt-1 font-semibold text-neutral-950">
                {semesterInfo.department}
              </p>
            </div>
          </div>

          <div className="mx-3 border-t border-black/5" />

          <div className="flex items-center gap-3 rounded-2xl p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
              <GraduationCap
                size={21}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-neutral-400">
                Current semester
              </p>

              <p className="mt-1 font-semibold text-neutral-950">
                {semesterInfo.semester}
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                {currentSemester} of {TOTAL_PLANNED_SEMESTERS} planned semesters
              </p>
            </div>

            <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-bold text-blue-600">
              {currentSemester}TH
            </span>
          </div>
        </div>
      </motion.section>

      {/* ESTIMATED GRADUATION TIMELINE */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass rounded-[30px] p-5 sm:p-6"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 text-blue-500">
            <CalendarDays
              size={21}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-neutral-400">
              YOUR JOURNEY
            </p>

            <h2 className="mt-1 text-lg font-semibold tracking-tight text-neutral-950">
              Estimated graduation timeline
            </h2>

            <p className="mt-1 text-sm leading-6 text-neutral-500">
              Your position in a planned 12-semester sequence.
            </p>
          </div>
        </div>

        <div className="mt-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-5xl font-semibold tracking-tight text-neutral-950">
              {progress}%
            </p>

            <p className="mt-2 text-sm font-medium text-neutral-500">
              Estimated timeline progress
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-neutral-950">
              {currentSemester}/{TOTAL_PLANNED_SEMESTERS}
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Semesters
            </p>
          </div>
        </div>

        <div
          className="mt-5 h-3 overflow-hidden rounded-full bg-black/5"
          role="progressbar"
          aria-label="Estimated semester timeline progress"
          aria-valuemin={0}
          aria-valuemax={TOTAL_PLANNED_SEMESTERS}
          aria-valuenow={currentSemester}
          aria-valuetext={`${progress}% of the planned 12-semester sequence`}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
          />
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-blue-500/5 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <GraduationCap
              size={19}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-neutral-950">
              {remainingSemesters === 0
                ? "Final planned semester"
                : `${remainingSemesters} semesters remaining after the current one`}
            </p>

            <p className="mt-1 text-xs leading-5 text-neutral-500">
              Keep moving forward, one semester at a time.
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-neutral-400">
          This percentage represents the position in a planned
          semester sequence, not completed university credits or
          an official graduation prediction. Actual graduation
          timing depends on academic requirements and university
          decisions.
        </p>
      </motion.section>

      {/* ENCOURAGEMENT */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          delay: 0.15,
        }}
        className="rounded-[26px] border border-violet-500/10 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-cyan-500/5 p-5"
      >
        <p className="text-sm font-semibold text-neutral-950">
          Your future is built one step at a time.
        </p>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Every class, every lesson, and every challenge is part
          of your journey. Keep going, Sumi.
        </p>
      </motion.section>
    </div>
  );
}