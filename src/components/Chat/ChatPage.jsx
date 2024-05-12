import { useEffect, useState } from "react";
import ChatBody from "./body/ChatBody";
import ChatUserPanel from "./user panel/ChatUserPanel";

export default function ChatPage({ socket }) {
  const [messages, setMessages] = useState([]);
  const [chatTitle, setChatTitle] = useState("");

  useEffect(() => {
    // Function to handle incoming messagesResponse from server
    const handleMessageResponse = (data) => {
      // spread new message object into messages array
      setMessages([...messages, data]);
    };

    // Function to handle incoming Telegram messages
    const handleTelegramMessage = (data) => {
      // spread new message object into messages array
      setMessages([...messages, data]);
      setChatTitle(data.title);
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
  }, [socket, messages]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <ChatUserPanel socket={socket} chatTitle={chatTitle} />
        <ChatBody messages={messages} socket={socket} />
      </div>
    </div>
  );
}
