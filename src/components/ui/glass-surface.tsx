"use client";

import type { ReactNode } from "react";

import { motion } from "motion/react";

interface GlassSurfaceProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

export default function GlassSurface({
  children,
  className = "",
  interactive = false,
}: GlassSurfaceProps) {
  return (
    <motion.div
      whileTap={
        interactive
          ? {
              scale: 0.985,
            }
          : undefined
      }
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 30,
      }}
      className={[
        "glass-surface",
        interactive
          ? "cursor-pointer select-none"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </motion.div>
  );
}