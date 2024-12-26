export function getDateRangeStart(range: string): Date {
  const now = new Date();
  switch (range) {
    case "today":
      return new Date(now.setHours(0, 0, 0, 0));
    case "week":
      const week = new Date(now);
      week.setDate(week.getDate() - week.getDay());
      return new Date(week.setHours(0, 0, 0, 0));
    case "month":
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case "quarter":
      const quarter = Math.floor(now.getMonth() / 3);
      return new Date(now.getFullYear(), quarter * 3, 1);
    default:
      return new Date(0); // Beginning of time
  }
}
