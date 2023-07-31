export function getPreviousNDates(n: number) {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date;
}

export function getLast7Days() {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(getPreviousNDates(i));
  }
  return dates.reverse();
}

export function getLastNDays(n: number) {
  const dates = [];
  for (let i = 0; i < n; i++) {
    dates.push(getPreviousNDates(i));
  }
  return dates.reverse();
}

export function getYYMMDD(date: Date) {
  return date.toISOString().slice(0, 10);
}
