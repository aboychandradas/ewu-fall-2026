export const springSoft = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
  mass: 0.8,
};

export const springSnappy = {
  type: "spring" as const,
  stiffness: 420,
  damping: 30,
  mass: 0.7,
};

export const fadeUp = {
  initial: {
    opacity: 0,
    y: 14,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    ...springSoft,
  },
};

export const fadeScale = {
  initial: {
    opacity: 0,
    scale: 0.97,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    ...springSoft,
  },
};