export const fetchMessages = async (setMessages) => {
  try {
    const response = await fetch("http://localhost:4000/messages");
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

// Handle typing response
export const handleTypingResponse = (data, onlineUsers, setUserTyping) => {
  const user = onlineUsers.find((obj) => obj.uid === data);
  console.log("Inside handleTypingResponse", user);
  setUserTyping(user);

  const timeoutId = setTimeout(() => {
    setUserTyping(false);
  }, 2000);

  return timeoutId;
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
