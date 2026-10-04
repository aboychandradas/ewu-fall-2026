export type DayCode = "S" | "M" | "T" | "W" | "R" | "F" | "A";

export type ClassType = "course" | "lab";

export interface ClassSession {
  id: string;
  course: string;
  day: DayCode;
  dayName: string;
  start: string;
  end: string;
  room: string;
  type: ClassType;
}

export interface AcademicEvent {
  id: string;
  date: string;
  endDate?: string;
  title: string;
  type: "semester" | "holiday" | "assessment" | "exam" | "break";
}

export const semesterInfo = {
  university: "East West University",
  department: "Information Studies",
  semester: "Fall 2026",
  semesterNumber: 9,
  startDate: "2026-09-13",
  endDate: "2026-12-23",
};

export const routine: ClassSession[] = [
  {
    id: "gen7211-sun",
    course: "GEN7211",
    day: "S",
    dayName: "Sunday",
    start: "11:50",
    end: "13:20",
    room: "FUB-104",
    type: "course",
  },

  {
    id: "inf7402-mon",
    course: "INF7402",
    day: "M",
    dayName: "Monday",
    start: "10:10",
    end: "11:40",
    room: "FUB-303",
    type: "course",
  },

  {
    id: "inf7403-mon",
    course: "INF7403",
    day: "M",
    dayName: "Monday",
    start: "13:30",
    end: "15:00",
    room: "AB1-202",
    type: "course",
  },

  {
    id: "gen7211-tue",
    course: "GEN7211",
    day: "T",
    dayName: "Tuesday",
    start: "11:50",
    end: "13:20",
    room: "FUB-104",
    type: "course",
  },

  {
    id: "inf7402-lab-wed",
    course: "INF7402 Lab",
    day: "W",
    dayName: "Wednesday",
    start: "08:00",
    end: "10:00",
    room: "531 (C. Lab-5)",
    type: "lab",
  },

  {
    id: "inf7402-wed",
    course: "INF7402",
    day: "W",
    dayName: "Wednesday",
    start: "10:10",
    end: "11:40",
    room: "FUB-303",
    type: "course",
  },

  {
    id: "inf7403-wed",
    course: "INF7403",
    day: "W",
    dayName: "Wednesday",
    start: "13:30",
    end: "15:00",
    room: "AB1-202",
    type: "course",
  },

  {
    id: "inf7403-lab-thu",
    course: "INF7403 Lab",
    day: "R",
    dayName: "Thursday",
    start: "10:10",
    end: "12:10",
    room: "531 (C. Lab-5)",
    type: "lab",
  },
];

export const academicEvents: AcademicEvent[] = [
  {
    id: "first-day",
    date: "2026-09-13",
    title: "First Day of Classes",
    type: "semester",
  },

  {
    id: "durga-puja",
    date: "2026-10-19",
    endDate: "2026-10-21",
    title: "Durga Puja Holiday",
    type: "holiday",
  },

  {
    id: "mid-semester",
    date: "2026-11-15",
    title: "Mid-Semester Assessment Submission",
    type: "assessment",
  },

  {
    id: "last-day",
    date: "2026-12-10",
    title: "Last Day of Classes",
    type: "semester",
  },

  {
    id: "final-exams",
    date: "2026-12-13",
    endDate: "2026-12-20",
    title: "Final Examinations",
    type: "exam",
  },

  {
    id: "victory-day",
    date: "2026-12-16",
    title: "Victory Day",
    type: "holiday",
  },

  {
    id: "final-grades",
    date: "2026-12-23",
    title: "Submission of Final Grades",
    type: "semester",
  },

  {
    id: "semester-break",
    date: "2026-12-26",
    endDate: "2027-01-04",
    title: "Semester Break",
    type: "break",
  },
];

export const dayLabels: {
  code: DayCode;
  label: string;
}[] = [
  { code: "S", label: "Sunday" },
  { code: "M", label: "Monday" },
  { code: "T", label: "Tuesday" },
  { code: "W", label: "Wednesday" },
  { code: "R", label: "Thursday" },
  { code: "F", label: "Friday" },
  { code: "A", label: "Saturday" },
];