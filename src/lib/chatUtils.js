export const fetchMessages = async (setMessages) => {
  const url = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
  try {
    const response = await fetch(`${url}/messages`);
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    const data = await response.json();
    setMessages(data); // Update messages state with response data
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

// Handle incoming message response
export const handleMessageResponse = (data, setMessages) => {
  setMessages((prevMessages) => [...prevMessages, data]);
};

// Handle incoming Telegram message
export const handleTelegramMessage = (data, setMessages) => {
  setMessages((prevMessages) => [...prevMessages, data]);
};

let typingTimeoutId;

// Handle typing response
export const handleTypingResponse = (data, onlineUsers, setUserTyping) => {
  const user = onlineUsers.find((obj) => obj.uid === data);
  setUserTyping(user);

  // Clear the previous timeout if it exists
  if (typingTimeoutId) {
    clearTimeout(typingTimeoutId);
  }

  // Set a new timeout
  typingTimeoutId = setTimeout(() => {
    setUserTyping(false);
  }, 750);

  return typingTimeoutId;
};

// Add socket event listeners
export const addSocketListeners = (
  socket,
  setMessages,
  onlineUsers,
  setUserTyping
) => {
  const handleMessageResponseWrapper = (data) =>
    handleMessageResponse(data, setMessages);
  const handleTelegramMessageWrapper = (data) =>
    handleTelegramMessage(data, setMessages);
  const handleTypingResponseWrapper = (data) => {
    const timeoutId = handleTypingResponse(data, onlineUsers, setUserTyping);
    return () => clearTimeout(timeoutId);
  };

  socket.on("messageResponse", handleMessageResponseWrapper);
  socket.on("telegramMessage", handleTelegramMessageWrapper);
  socket.on("typingResponse", handleTypingResponseWrapper);

  return () => {
    socket.off("messageResponse", handleMessageResponseWrapper);
    socket.off("telegramMessage", handleTelegramMessageWrapper);
    socket.off("typingResponse", handleTypingResponseWrapper);
  };
};
