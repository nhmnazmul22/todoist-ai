import { clsx, type ClassValue } from 'clsx';
import {
  format,
  formatRelative,
  isBefore,
  isSameYear,
  isToday,
  isTomorrow,
  startOfToday,
} from 'date-fns';
import { redirect } from 'react-router';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const convertUpperCase = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

// Format the data
export const formatDate = (date: string | number | Date) => {
  const today = new Date();

  const relativeDay = convertUpperCase(
    formatRelative(date, today).split(' at ')[0],
  );

  // List of relative keyword to check
  const relativeKeyword = [
    'Today',
    'Tomorrow',
    'Yesterday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];

  if (relativeKeyword.includes(relativeDay)) {
    return relativeDay;
  }

  if (isSameYear(date, today)) {
    return format(date, 'dd MMM');
  } else {
    return format(date, 'dd MMM yyyy');
  }
};

// Get due date color class
export const getDueDateColorClass = (
  dueDate: Date | null,
  completed?: boolean,
): string | undefined => {
  if (dueDate === null || completed === undefined) return;

  if (isBefore(dueDate, startOfToday()) && !completed) {
    return 'text-red-500';
  }

  if (isToday(dueDate)) {
    return 'text-emerald-500';
  }

  if (isTomorrow(dueDate) && !completed) {
    return 'text-amber-500';
  }
};

// Generate unique ID
export const generateId = () => {
  return Math.random().toString(36) + Date.now().toString(36);
};

export const getUserId = () => {
  const userId = localStorage.getItem('ClerkUserId');
  return userId;
};
