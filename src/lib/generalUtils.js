export const formatDateTime = (now) => {
  try {
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
  } catch (error) {
    console.error("Error in formatDateTime:", error);
    // Handle the error appropriately, or rethrow it if needed
    throw error;
  }
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

export const fetchChatTitle = async (setChatTitle) => {
  const url = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
  try {
    const response = await fetch(`${url}/chat`);
    const data = await response.json();
    setChatTitle(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
