import type { AcademicEvent } from "@/data/fall-2026";

export type AcademicEventState =
  | "past"
  | "active"
  | "upcoming";

export interface AcademicEventBounds {
  start: Date;
  end: Date;
}

export function getAcademicEventBounds(
  event: AcademicEvent,
): AcademicEventBounds {
  const start = new Date(
    `${event.date}T00:00:00`,
  );

  const end = new Date(
    `${event.endDate ?? event.date}T23:59:59.999`,
  );

  return { start, end };
}

export function getAcademicEventState(
  event: AcademicEvent,
  now: Date,
): AcademicEventState {
  const { start, end } =
    getAcademicEventBounds(event);

  if (now > end) {
    return "past";
  }

  if (now < start) {
    return "upcoming";
  }

  return "active";
}

export function formatAcademicEventDateRange(
  event: AcademicEvent,
  includeWeekday = false,
) {
  const start = new Date(
    `${event.date}T00:00:00`,
  );

  const end = new Date(
    `${event.endDate ?? event.date}T00:00:00`,
  );

  const startOptions: Intl.DateTimeFormatOptions =
    includeWeekday
      ? {
          weekday: "long",
          month: "long",
          day: "numeric",
        }
      : {
          month: "short",
          day: "numeric",
        };

  const endOptions: Intl.DateTimeFormatOptions =
    includeWeekday
      ? {
          weekday: "long",
          month: "long",
          day: "numeric",
        }
      : {
          month: "short",
          day: "numeric",
        };

  const startText =
    new Intl.DateTimeFormat(
      "en-US",
      startOptions,
    ).format(start);

  if (!event.endDate) {
    return startText;
  }

  if (
    start.getFullYear() ===
      end.getFullYear() &&
    start.getMonth() ===
      end.getMonth()
  ) {
    const endDay = end.getDate();

    if (includeWeekday) {
      const endText =
        new Intl.DateTimeFormat(
          "en-US",
          endOptions,
        ).format(end);

      return `${startText} – ${endText}`;
    }

    return `${startText.split(" ")[0]} ${start.getDate()}–${endDay}`;
  }

  const endText =
    new Intl.DateTimeFormat(
      "en-US",
      endOptions,
    ).format(end);

  return `${startText} – ${endText}`;
}

export function getAcademicEventDurationDays(
  event: AcademicEvent,
) {
  const start = new Date(
    `${event.date}T00:00:00`,
  );

  const end = new Date(
    `${event.endDate ?? event.date}T00:00:00`,
  );

  const days =
    Math.round(
      (end.getTime() - start.getTime()) /
        86400000,
    ) + 1;

  return Math.max(1, days);
}

export function formatAcademicEventDuration(
  event: AcademicEvent,
) {
  const days =
    getAcademicEventDurationDays(event);

  return `${days} ${days === 1 ? "day" : "days"}`;
}

export function getAcademicEventCountdown(
  event: AcademicEvent,
  now: Date,
) {
  const state =
    getAcademicEventState(event, now);

  if (state === "past") {
    return {
      state,
      label: "Completed",
      value: "Event ended",
      totalSeconds: 0,
    };
  }

  const { start, end } =
    getAcademicEventBounds(event);

  const target =
    state === "active" ? end : start;

  const totalSeconds = Math.max(
    0,
    Math.ceil(
      (target.getTime() -
        now.getTime()) /
        1000,
    ),
  );

  const days = Math.floor(
    totalSeconds / 86400,
  );

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600,
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60,
  );

  const seconds = totalSeconds % 60;

  const clock = [
    hours,
    minutes,
    seconds,
  ]
    .map((value) =>
      String(value).padStart(2, "0"),
    )
    .join(":");

  return {
    state,
    label:
      state === "active"
        ? "Ends in"
        : "Starts in",
    value:
      days > 0
        ? `${days}d ${clock}`
        : clock,
    totalSeconds,
  };
}

export function getAcademicEventProgress(
  event: AcademicEvent,
  now: Date,
) {
  const { start, end } =
    getAcademicEventBounds(event);

  const duration =
    end.getTime() - start.getTime();

  if (duration <= 0) {
    return 0;
  }

  if (now <= start) {
    return 0;
  }

  if (now >= end) {
    return 100;
  }

  return Math.min(
    100,
    Math.max(
      0,
      ((now.getTime() - start.getTime()) /
        duration) *
        100,
    ),
  );
}

export function getAcademicEventStateLabel(
  state: AcademicEventState,
) {
  switch (state) {
    case "past":
      return "Completed";

    case "active":
      return "Happening now";

    case "upcoming":
      return "Upcoming";
  }
}