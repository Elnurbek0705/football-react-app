export function formatMatchTime(utcDate) {
  const date = new Date(utcDate);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const formattedTime = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${
    isToday
      ? "Today"
      : date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
  }, ${formattedTime}`;
}
