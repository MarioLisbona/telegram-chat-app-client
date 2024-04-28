import { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Function to handle incoming messages
    const handleMessageResponse = (data) => {
      setMessages([...messages, data]);
    };

    // Function to handle incoming Telegram messages
    const handleTelegramMessage = (data) => {
      console.log("Logging telegram msg data", data);
    };

    socket.on("messageResponse", handleMessageResponse);
    socket.on("telegramMessage", handleTelegramMessage);

    // Clean up event listeners when component unmounts
    return () => {
      socket.off("messageResponse", handleMessageResponse);
      socket.off("telegramMessage", handleTelegramMessage);
    };
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
