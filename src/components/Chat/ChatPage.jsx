import { useEffect, useState } from "react";
import ChatBody from "./body/ChatBody";
import ChatUserPanel from "./user panel/ChatUserPanel";
import { getOnlineUsers } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { fetchMessages } from "../../lib/chatUtils";

export default function ChatPage({ socket }) {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userTyping, setUserTyping] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    getOnlineUsers(setOnlineUsers, user);
  }, [user]);

  useEffect(() => {
    fetchMessages(setMessages); // Call fetchMessages when component mounts

    // Event listeners for socket messages
    const handleMessageResponse = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    const handleTelegramMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    const handleTypingResponse = (data) => {
      const user = onlineUsers.find((obj) => obj.uid === data);
      console.log("Inside handleTypingResponse", user);
      setUserTyping(user);

      const timeoutId = setTimeout(() => {
        setUserTyping(false);
      }, 2000);

      return () => clearTimeout(timeoutId); // Clear timeout for this specific event listener
    };

    // callbacks for telegram and client responses received on socket
    // wait for socket to be iniitalised
    if (socket) {
      console.log("socket loaded");
      socket.on("messageResponse", handleMessageResponse);
      socket.on("telegramMessage", handleTelegramMessage);
      socket.on("typingResponse", handleTypingResponse);

      // Clean up event listeners when component unmounts
      return () => {
        socket.off("messageResponse", handleMessageResponse);
        socket.off("telegramMessage", handleTelegramMessage);
        socket.off("typingResponse", handleTypingResponse);
      };
    } else {
      // potentially render a loading window
      console.log("loading socket....");
    }
  }, [socket, onlineUsers, userTyping]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <ChatUserPanel socket={socket} />
        <ChatBody
          messages={messages}
          socket={socket}
          onlineUsers={onlineUsers}
          userTyping={userTyping}
        />
      </div>
    </div>
  );
}
