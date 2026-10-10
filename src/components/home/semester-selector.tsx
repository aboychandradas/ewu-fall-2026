"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  ArrowRight,
  Check,
  ChevronDown,
  GraduationCap,
  X,
} from "lucide-react";

import { springSnappy } from "@/lib/motion";

const semesters = [
  {
    number: "10TH",
    title: "10th Semester",
    description: "Your next chapter is coming soon.",
    href: "/semester/10th/",
    colors: "from-blue-500/15 to-cyan-500/10",
  },
  {
    number: "11TH",
    title: "11th Semester",
    description: "More milestones lie ahead.",
    href: "/semester/11th/",
    colors: "from-violet-500/15 to-fuchsia-500/10",
  },
  {
    number: "12TH",
    title: "12th Semester",
    description: "Another step toward your bright future.",
    href: "/semester/12th/",
    colors: "from-emerald-500/15 to-teal-500/10",
  },
];

export default function SemesterSelector() {
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
  if (!open) {
    return;
  }

  const previousOverflow = document.body.style.overflow;

  const previouslyFocused =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

  // Capture the trigger element for this effect instance.
  const triggerElement = triggerRef.current;

  document.body.style.overflow = "hidden";

  const frame = window.requestAnimationFrame(() => {
    closeButtonRef.current?.focus();
  });

  return () => {
    window.cancelAnimationFrame(frame);

    document.body.style.overflow = previousOverflow;

    if (previouslyFocused?.isConnected) {
      previouslyFocused.focus();
    } else if (triggerElement?.isConnected) {
      triggerElement.focus();
    }
  };
}, [open]);

  function closeSelector() {
    setOpen(false);
  }

  return (
    <>
      {/* HOME HEADER BUTTON */}
      <motion.button
        ref={triggerRef}
        type="button"
        whileTap={{ scale: 0.94 }}
        transition={springSnappy}
        onClick={() => setOpen(true)}
        aria-label="Open semester selector"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="theme-toggle inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-3 text-neutral-700 shadow-sm outline-none backdrop-blur-xl transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-blue-500/50"
      >
        <GraduationCap
          size={18}
          strokeWidth={2}
          aria-hidden="true"
        />

        <span className="text-xs font-bold tracking-wide">
          9TH
        </span>

        <ChevronDown
          size={14}
          className="text-neutral-500"
          aria-hidden="true"
        />
      </motion.button>

      {/* SEMESTER SELECTOR SHEET */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="semester-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeSelector();
              }
            }}
            className="fixed inset-0 z-80 flex items-end justify-center bg-black/45 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          >
            <motion.section
              ref={dialogRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby="semester-dialog-title"
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 24,
                scale: 0.99,
              }}
              transition={{
                duration: 0.28,
                ease: "easeOut",
              }}
              onKeyDown={(event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeSelector();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusableElements =
    dialogRef.current?.querySelectorAll<HTMLElement>(
      [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'textarea:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(","),
    );

  if (!focusableElements?.length) {
    event.preventDefault();
    dialogRef.current?.focus();
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (
    event.shiftKey &&
    document.activeElement === first
  ) {
    event.preventDefault();
    last.focus();
  } else if (
    !event.shiftKey &&
    document.activeElement === last
  ) {
    event.preventDefault();
    first.focus();
  }
}}
              className="glass min-h-0 max-h-[88svh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-[28px] border border-white/20 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl sm:rounded-[32px] sm:p-6 sm:pb-6"
            >
              {/* SHEET HEADER */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                    YOUR ACADEMIC JOURNEY
                  </p>

                  <h2
                    id="semester-dialog-title"
                    className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950"
                  >
                    Semester roadmap
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    One semester at a time, one step closer to your dreams.
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeSelector}
                  aria-label="Close semester selector"
                  className="theme-toggle flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/5 text-neutral-600 outline-none transition-colors hover:bg-black/10 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500/50"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              {/* CURRENT SEMESTER */}
              <div className="relative mt-6 overflow-hidden rounded-[26px] border border-blue-500/20 bg-linear-to-br from-blue-500/15 via-cyan-500/10 to-violet-500/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-600">
                    <GraduationCap
                      size={23}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-base font-bold text-neutral-950">
                        9TH SEMESTER
                      </p>

                      <span className="rounded-full bg-blue-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-600">
                        Current
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-medium text-neutral-700">
                      Fall 2026
                    </p>

                    <p className="mt-2 text-xs leading-5 text-neutral-500">
                      Your current classes and academic calendar.
                    </p>
                  </div>

                  <Check
                    size={19}
                    className="mt-1 shrink-0 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* UPCOMING SEMESTERS */}
              <div className="mt-4 space-y-3">
                {semesters.map((semester, index) => (
                  <motion.div
                    key={semester.number}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.055,
                    }}
                  >
                    <Link
                      href={semester.href}
                      onClick={closeSelector}
                      className="group flex items-center gap-3 rounded-[24px] border border-black/5 bg-[var(--card)] p-4 text-left shadow-sm outline-none transition-all duration-200 hover:bg-[var(--card-strong)] active:scale-[0.985] active:bg-[var(--card-strong)] focus-visible:ring-2 focus-visible:ring-blue-500/50"
                    >
                      <div
                        className={[
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br",
                          semester.colors,
                        ].join(" ")}
                      >
                        <GraduationCap
                          size={21}
                          className="text-neutral-700"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-neutral-950">
                          {semester.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-neutral-500">
                          {semester.description}
                        </p>

                        <span className="mt-2 inline-flex rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                          Coming soon
                        </span>
                      </div>

                      <ArrowRight
                        size={18}
                        className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <p className="mt-5 text-center text-xs leading-5 text-neutral-400">
                New chapters are on the way. Your current Fall 2026
                schedule will remain unchanged.
              </p>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}