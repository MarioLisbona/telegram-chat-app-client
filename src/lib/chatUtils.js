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
