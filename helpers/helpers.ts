export const unixToDate = (unix: number): string => {
  const blogDate = new Date(unix * 1000);

  const blogDateDay = blogDate.getDate();
  const dayName = blogDate.toLocaleString("default", { weekday: "long" });
  const monthName = blogDate.toLocaleString("default", { month: "long" });
  const year = blogDate.getFullYear();

  return `${dayName}, ${monthName} ${blogDateDay} ${year}`;
};
