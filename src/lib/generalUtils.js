export const formatDateTime = (now) => {
  const formattedDateTime =
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

  return formattedDateTime;
};

export const formatChatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const now = new Date();

  // Check if the date is today
  const isToday = now.toDateString() === dateTime.toDateString();

  let formattedDateTime;
  if (isToday) {
    formattedDateTime =
      "Today " +
      dateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
  } else {
    formattedDateTime =
      dateTime.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      " " +
      dateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
  }

  return formattedDateTime;
};
