import { useEffect, useState, useRef } from "react";
import ChatBody from "./body/ChatBody";
import ChatUserPanel from "./user panel/ChatUserPanel";

export default function ChatPage({ socket }) {
  const [messages, setMessages] = useState([]);
  const [chatTitle, setChatTitle] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Function to handle incoming messagesResponse from server
    const handleMessageResponse = (data) => {
      // spread new message object into messages array
      setMessages([...messages, data]);
    };

    // Function to handle incoming Telegram messages
    const handleTelegramMessage = (data) => {
      // create new message object with telegram message data
      const telegramMessage = {
        chat: data.chat.title,
        text: data.text,
        name: `(telegram) ${data.from.first_name} ${data.from.last_name}`,
        id: `${data.chat.id}-${data.chat.date}-${data.message_id}`,
        socketID: "unknown",
      };

      // spread new telegram message object into messages array
      setMessages([...messages, telegramMessage]);
      setChatTitle(data.chat.title);
    };

    // callbacks for different responses received on socket
    socket.on("messageResponse", handleMessageResponse);
    socket.on("telegramMessage", handleTelegramMessage);

    // Clean up event listeners when component unmounts
    return () => {
      socket.off("messageResponse", handleMessageResponse);
      socket.off("telegramMessage", handleTelegramMessage);
    };
  }, [socket, messages]);

  // 👇️ scroll to bottom every time messages change
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <ChatUserPanel socket={socket} chatTitle={chatTitle} />
        <ChatBody
          messages={messages}
          socket={socket}
          lastMessageRef={lastMessageRef}
        />
      </div>
    </div>
  );
}
