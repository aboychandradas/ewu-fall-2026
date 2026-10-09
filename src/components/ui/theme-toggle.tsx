"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

import { springSnappy } from "@/lib/motion";
import {
  useThemePreference,
  type ThemePreference,
} from "@/components/theme/theme-provider";

const nextPreference: Record<ThemePreference, ThemePreference> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const preferenceLabel: Record<ThemePreference, string> = {
  system: "System appearance",
  light: "Light appearance",
  dark: "Dark appearance",
};

export default function ThemeToggle() {
  const { preference, setPreference } = useThemePreference();

  const Icon =
  preference === "light"
    ? Sun
    : preference === "dark"
      ? Moon
      : Monitor;
      
  const label = preferenceLabel[preference];

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      transition={springSnappy}
      onClick={() => setPreference(nextPreference[preference])}
      aria-label={`${label}. Activate to change appearance.`}
      title={`${label} · tap to change`}
      className="theme-toggle flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/70 text-neutral-700 shadow-sm outline-none backdrop-blur-xl transition-colors focus-visible:ring-2 focus-visible:ring-blue-500/50"
    >
      <Icon size={18} strokeWidth={2} aria-hidden="true" />
    </motion.button>
  );
}
