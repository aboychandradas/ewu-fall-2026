"use client";

import type { ReactNode } from "react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

interface PressableProps
  extends Omit<
    HTMLMotionProps<"button">,
    "children"
  > {
  children: ReactNode;
  className?: string;
}

export default function Pressable({
  children,
  className = "",
  disabled,
  ...props
}: PressableProps) {
  return (
    <motion.button
      type="button"
      whileTap={
        disabled
          ? undefined
          : {
              scale: 0.965,
            }
      }
      transition={{
        type: "spring",
        stiffness: 520,
        damping: 28,
      }}
      disabled={disabled}
      className={[
        "touch-manipulation",
        "will-change-transform",
        "disabled:pointer-events-none",
        "disabled:opacity-45",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </motion.button>
  );
}