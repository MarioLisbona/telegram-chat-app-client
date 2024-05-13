import { useEffect, useState } from "react";
import ChatBody from "./body/ChatBody";
import ChatUserPanel from "./user panel/ChatUserPanel";

export default function ChatPage({ socket }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages when component mounts
    const fetchMessages = async () => {
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

    fetchMessages(); // Call fetchMessages when component mounts

    // Event listeners for socket messages
    const handleMessageResponse = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    const handleTelegramMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    // callbacks for telegram and client responses received on socket
    // wait for socket to be iniitalised
    if (socket) {
      socket.on("messageResponse", handleMessageResponse);
      socket.on("telegramMessage", handleTelegramMessage);

      // Clean up event listeners when component unmounts
      return () => {
        socket.off("messageResponse", handleMessageResponse);
        socket.off("telegramMessage", handleTelegramMessage);
      };
    } else {
      // potentially render a loading window
      console.log("loading socket....");
    }
  }, [socket]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <ChatUserPanel socket={socket} />
        <ChatBody messages={messages} socket={socket} />
      </div>
    </div>
  );
}
