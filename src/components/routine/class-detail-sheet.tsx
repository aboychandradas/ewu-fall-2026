"use client";

import {
  Clock3,
  MapPin,
  X,
} from "lucide-react";

import type { ClassSession } from "@/data/fall-2026";
import { formatTime } from "@/lib/schedule";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ClassDetailSheetProps {
  session: ClassSession | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ClassDetailSheet({
  session,
  open,
  onOpenChange,
}: ClassDetailSheetProps) {
  if (!session) {
    return null;
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="bottom"
        className="mx-auto max-w-130 rounded-t-4xl border-0 bg-[#f5f5f7] px-5 pb-8 pt-4"
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-black/12" />

        <SheetHeader className="text-left">
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-black/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
              {session.type === "lab"
                ? "Laboratory"
                : "Class"}
            </span>

            <button
              type="button"
              onClick={() =>
                onOpenChange(false)
              }
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-neutral-500 transition active:scale-95"
              aria-label="Close"
            >
              <X size={17} />
            </button>
          </div>

          <SheetTitle className="text-[30px] font-semibold tracking-[-0.04em] text-neutral-950">
            {session.course}
          </SheetTitle>

          <p className="mt-1 text-sm font-medium text-neutral-500">
            {session.dayName}
          </p>
        </SheetHeader>

        <div className="mt-7 space-y-3">
          <div className="glass rounded-3xl p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/5">
                <Clock3 size={19} />
              </div>

              <div>
                <p className="text-xs font-medium text-neutral-400">
                  Time
                </p>

                <p className="mt-1 font-semibold">
                  {formatTime(session.start)}
                  {" – "}
                  {formatTime(session.end)}
                </p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/5">
                <MapPin size={19} />
              </div>

              <div>
                <p className="text-xs font-medium text-neutral-400">
                  Room
                </p>

                <p className="mt-1 font-semibold">
                  {session.room}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-neutral-400">
          East West University · Information
          Studies · Fall 2026
        </p>
      </SheetContent>
    </Sheet>
  );
}