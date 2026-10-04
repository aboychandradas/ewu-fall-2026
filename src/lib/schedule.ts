import { routine, type ClassSession, type DayCode } from "@/data/fall-2026";

const dayCodeMap: Record<number, DayCode> = {
  0: "S",
  1: "M",
  2: "T",
  3: "W",
  4: "R",
  5: "F",
  6: "A",
};

export function getCurrentDayCode(date = new Date()): DayCode {
  return dayCodeMap[date.getDay()];
}

export function getClassesForDay(
  day: DayCode,
  sessions: ClassSession[] = routine,
) {
  return sessions
    .filter((session) => session.day === day)
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function formatTime(time: string) {
  const [hourString, minute] = time.split(":");
  const hour = Number(hourString);

  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute} ${suffix}`;
}

export function getDayName(day: DayCode) {
  const session = routine.find((item) => item.day === day);

  if (session) {
    return session.dayName;
  }

  const fallback: Record<DayCode, string> = {
    S: "Sunday",
    M: "Monday",
    T: "Tuesday",
    W: "Wednesday",
    R: "Thursday",
    F: "Friday",
    A: "Saturday",
  };

  return fallback[day];
}