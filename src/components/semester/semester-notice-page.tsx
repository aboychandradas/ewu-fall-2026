"use client";

import Link from "next/link";
import { motion } from "motion/react";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  GraduationCap,
  Heart,
  Sparkles,
} from "lucide-react";

export type SemesterNoticeNumber = "10th" | "11th" | "12th";

type SemesterNoticeContent = {
  heading: string;
  message: string;
  personalMessage: string;
  colors: string;
};

const notices: Record<
  SemesterNoticeNumber,
  SemesterNoticeContent
> = {
  "10th": {
    heading: "Your next chapter is being prepared.",
    message:
      "Your 10th-semester space is coming soon. Aboy Systems is continuing to develop the EWU Academic Companion, and this noticeboard will be updated when something new is ready for you.",
    personalMessage:
      "Keep going, Sumi. Every small step you take today is part of the bright future you're building.",
    colors:
      "from-blue-500/20 via-cyan-500/10 to-violet-500/20",
  },

  "11th": {
    heading: "Something wonderful is on the horizon.",
    message:
      "The noticeboard for your 11th semester is currently under development by Aboy Systems. Progress is ongoing, and this space will grow when the next update is ready.",
    personalMessage:
      "One semester at a time. May your hard work bring you confidence, new opportunities, and plenty of reasons to be proud.",
    colors:
      "from-violet-500/20 via-fuchsia-500/10 to-blue-500/20",
  },

  "12th": {
    heading: "A new milestone awaits you.",
    message:
      "Your 12th-semester noticeboard is still taking shape. Aboy Systems is working on the experience step by step, and new information will appear here when it is ready to share.",
    personalMessage:
      "Wishing you strength for the journey ahead, success in your studies, and a bright future filled with possibilities.",
    colors:
      "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
  },
};

export default function SemesterNoticePage({
  semester,
}: {
  semester: SemesterNoticeNumber;
}) {
  const notice = notices[semester];

  return (
    <div className="space-y-6 pb-8 pt-2">
      {/* BACK LINK */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl text-sm font-semibold text-neutral-500 outline-none transition-colors hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-blue-500/50"
        >
          <ArrowLeft
            size={17}
            aria-hidden="true"
          />
          Back to Home
        </Link>
      </motion.div>

      {/* MAIN NOTICE */}
      <motion.section
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="premium-hero overflow-hidden rounded-4xl p-6 sm:p-8"
      >
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <span className="eyebrow">
            NOTICEBOARD · {semester.toUpperCase()} SEMESTER
          </span>

          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            In development
          </span>
        </div>

        <div className="relative z-10 mt-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white shadow-lg shadow-black/10">
          <GraduationCap
            size={28}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        <h1 className="relative z-10 mt-6 text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
          {notice.heading}
        </h1>

        <p className="relative z-10 mt-4 max-w-md text-sm leading-7 text-white/70 sm:text-base">
          {notice.message}
        </p>

        <div className="relative z-10 mt-6 flex items-center gap-2 text-sm font-medium text-white/80">
          <Sparkles
            size={16}
            className="text-cyan-300"
            aria-hidden="true"
          />
          <span>Progress is ongoing.</span>
        </div>

        <div
  className={[
    "pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-linear-to-t opacity-50",
    notice.colors,
  ].join(" ")}
  style={{
    maskImage:
      "linear-gradient(to top, black 0%, transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(to top, black 0%, transparent 100%)",
  }}
  aria-hidden="true"
/>
      </motion.section>

      {/* PERSONAL MESSAGE */}
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
          duration: 0.35,
          delay: 0.08,
        }}
        className="glass rounded-[28px] p-5 sm:p-6"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
            <Heart
              size={21}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-400">
              A LITTLE ENCOURAGEMENT
            </p>

            <p className="mt-3 text-base font-medium leading-7 text-neutral-800">
              {notice.personalMessage}
            </p>

            <p className="mt-4 text-sm font-semibold text-neutral-500">
              With warm wishes,
            </p>

            <a
              href="https://aboysystems.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-bold text-blue-600 outline-none transition-colors hover:text-blue-700 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500/50"
            >
              Aboy Systems
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* DEVELOPMENT NOTICE */}
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
          duration: 0.35,
          delay: 0.12,
        }}
        className="glass rounded-[28px] p-5"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <CalendarDays
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <p className="font-semibold text-neutral-950">
              Good things take time.
            </p>

            <p className="mt-1 text-sm leading-6 text-neutral-500">
              This page is a development notice, not an official
              university announcement. Your current Fall 2026 routine
              remains available in the app.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ACTIONS */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          delay: 0.16,
        }}
        className="space-y-3"
      >
        <Link
          href="/"
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 outline-none transition-all duration-200 hover:bg-blue-700 active:scale-[0.985] active:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Back to Home
          <ArrowRight size={16} aria-hidden="true" />
        </Link>

        <p className="text-center text-xs leading-5 text-neutral-400">
          EWU Academic Companion · Made with care by Aboy Systems
        </p>
      </motion.div>
    </div>
  );
}