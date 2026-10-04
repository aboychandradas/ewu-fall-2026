"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, House, List } from "lucide-react";
import type { ReactNode } from "react";

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
      <main className="mx-auto min-h-svh w-full max-w-130 px-5 pb-28 pt-6 sm:px-7">
        {children}
      </main>

      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-130 px-4 pb-3">
        <div className="glass rounded-[28px] px-2 py-2">
          <div className="grid grid-cols-3 gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-[22px] transition ${
                    active
                      ? "bg-black/6 text-black"
                      : "text-neutral-500 hover:bg-black/3"
                  }`}
                >
                  <Icon
                    size={20}
                    strokeWidth={active ? 2.4 : 1.9}
                  />

                  <span className="text-[11px] font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}