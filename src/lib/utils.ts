import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function adjustScheduleToCurrentWeek(data) {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));

  return data.filter(event => {
    const eventStart = new Date(event.start);
    return eventStart >= startOfWeek && eventStart <= endOfWeek;
  });
}
