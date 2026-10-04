import {
  routine,
  type ClassSession,
  type DayCode,
} from "@/data/fall-2026";

const dayCodeMap: Record<number, DayCode> = {
  0: "S",
  1: "M",
  2: "T",
  3: "W",
  4: "R",
  5: "F",
  6: "A",
};

const dayNameMap: Record<DayCode, string> = {
  S: "Sunday",
  M: "Monday",
  T: "Tuesday",
  W: "Wednesday",
  R: "Thursday",
  F: "Friday",
  A: "Saturday",
};

export function getCurrentDayCode(date = new Date()): DayCode {
  return dayCodeMap[date.getDay()];
}

export function getDayName(day: DayCode) {
  return dayNameMap[day];
}

export function formatTime(time: string) {
  const [hourString, minute] = time.split(":");
  const hour = Number(hourString);

  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute} ${suffix}`;
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function dateAtTime(date: Date, time: string) {
  const result = new Date(date);
  const [hours, minutes] = time.split(":").map(Number);

  result.setHours(hours, minutes, 0, 0);

  return result;
}

export function getClassesForDay(
  day: DayCode,
  sessions: ClassSession[] = routine,
) {
  return sessions
    .filter((session) => session.day === day)
    .sort(
      (a, b) =>
        timeToMinutes(a.start) -
        timeToMinutes(b.start),
    );
}

export function getClassesForDate(
  date: Date,
  sessions: ClassSession[] = routine,
) {
  return getClassesForDay(getCurrentDayCode(date), sessions);
}

export function getCurrentClass(
  now: Date,
  sessions: ClassSession[] = routine,
) {
  const todaysClasses = getClassesForDate(now, sessions);

  return (
    todaysClasses.find((session) => {
      const start = dateAtTime(now, session.start);
      const end = dateAtTime(now, session.end);

      return now >= start && now < end;
    }) ?? null
  );
}

export function getNextClass(
  now: Date,
  sessions: ClassSession[] = routine,
) {
  for (let offset = 0; offset < 8; offset += 1) {
    const candidateDate = new Date(now);
    candidateDate.setDate(
      now.getDate() + offset,
    );

    const classes = getClassesForDate(
      candidateDate,
      sessions,
    );

    for (const session of classes) {
      const start = dateAtTime(
        candidateDate,
        session.start,
      );

      if (start > now) {
        return {
          session,
          start,
        };
      }
    }
  }

  return null;
}

export function getNextAcademicEvent(
  events: {
    id: string;
    date: string;
    endDate?: string;
    title: string;
    type:
      | "semester"
      | "holiday"
      | "assessment"
      | "exam"
      | "break";
  }[],
  now = new Date(),
) {
  const currentDay = new Date(now);
  currentDay.setHours(0, 0, 0, 0);

  return (
    events
      .map((event) => {
        const start = new Date(
          `${event.date}T00:00:00`,
        );

        const end = event.endDate
          ? new Date(`${event.endDate}T23:59:59`)
          : start;

        return {
          event,
          start,
          end,
        };
      })
      .filter(({ end }) => end >= currentDay)
      .sort(
        (a, b) =>
          a.start.getTime() -
          b.start.getTime(),
      )[0] ?? null
  );
}

export function formatCountdown(
  target: Date,
  now: Date,
) {
  const difference =
    target.getTime() - now.getTime();

  if (difference <= 0) {
    return "Starting now";
  }

  const totalMinutes = Math.ceil(
    difference / 60000,
  );

  if (totalMinutes < 60) {
    return `Starts in ${totalMinutes}m`;
  }

  const hours = Math.floor(
    totalMinutes / 60,
  );

  const minutes = totalMinutes % 60;

  if (hours < 24) {
    if (minutes === 0) {
      return `Starts in ${hours}h`;
    }

    return `Starts in ${hours}h ${minutes}m`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) {
    return "Tomorrow";
  }

  return `In ${days} days`;
}

export function formatRelativeDate(
  target: Date,
  now: Date,
) {
  const targetDay = new Date(target);
  targetDay.setHours(0, 0, 0, 0);

  const currentDay = new Date(now);
  currentDay.setHours(0, 0, 0, 0);

  const difference =
    Math.round(
      (targetDay.getTime() -
        currentDay.getTime()) /
        86400000,
    );

  if (difference === 0) {
    return "Today";
  }

  if (difference === 1) {
    return "Tomorrow";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "long",
      month: "short",
      day: "numeric",
    },
  ).format(target);
}