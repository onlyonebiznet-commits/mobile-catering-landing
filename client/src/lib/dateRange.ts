export function toLocalDateKey(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isWithinDateRange(
  value: string | Date,
  startDate?: string,
  endDate?: string,
): boolean {
  const dateKey = toLocalDateKey(value);

  if (!dateKey || (startDate && endDate && startDate > endDate)) {
    return false;
  }

  return (!startDate || dateKey >= startDate) && (!endDate || dateKey <= endDate);
}
