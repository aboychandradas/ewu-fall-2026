"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  House,
  List,
} from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

import { springSnappy } from "@/lib/motion";

import ConnectionStatus from "@/components/ui/connection-status";

const navigation = [
  {
    href: "/",
    label: "Home",
    icon: House,
  },
  {
    href: "/routine",
    label: "Routine",
    icon: List,
  },
  {
    href: "/calendar",
    label: "Calendar",
    icon: CalendarDays,
  },
];

export default function AppShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <ConnectionStatus />
      <main className="mx-auto min-h-svh w-full max-w-130 px-5 pb-32 pt-6 sm:px-7">
        {children}
      </main>

      <nav
        aria-label="Primary navigation"
        className="safe-bottom fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-130 px-4 pb-3"
      >
        <div className="glass rounded-[30px] p-2">
          <div className="grid grid-cols-3 gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                pathname === `${item.href}/`;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex min-h-14 touch-manipulation flex-col items-center justify-center rounded-[22px] text-neutral-500 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black/15"
                >
                  {active && (
                    <motion.div
                      layoutId="active-tab"
                      transition={springSnappy}
                      className="absolute inset-0 rounded-[22px] bg-black/5.5"
                    />
                  )}

                  <motion.div
                    whileTap={{
                      scale: 0.92,
                    }}
                    transition={springSnappy}
                    className="relative z-10 flex flex-col items-center justify-center gap-1"
                  >
                    <Icon
                      size={20}
                      strokeWidth={
                        active ? 2.3 : 1.85
                      }
                    />

                    <span
                      className={[
                        "text-[11px] font-semibold tracking-[-0.01em]",
                        active
                          ? "text-neutral-950"
                          : "text-neutral-500",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}