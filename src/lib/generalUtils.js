const now = new Date();
export const formattedDateTime =
  now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }) +
  " " +
  now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
