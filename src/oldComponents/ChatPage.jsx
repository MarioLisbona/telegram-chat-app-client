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
      // spread new message object into messages array
      setMessages([...messages, data]);
    };

    // Function to handle incoming Telegram messages
    const handleTelegramMessage = (data) => {
      // create new message object with telegram message data
      const telegramMessage = {
        text: data.text,
        name: `(telegram) ${data.from.first_name} ${data.from.last_name}`,
        id: `${data.chat.id}-${data.chat.date}-${data.message_id}`,
        socketID: "unknown",
      };

      // spread new telegram message object into messages array
      setMessages([...messages, telegramMessage]);
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

  // receiving the typing status from the server
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
