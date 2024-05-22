import { useEffect, useState } from "react";
import ChatBody from "./body/ChatBody";
import ChatUserPanel from "./user panel/ChatUserPanel";
import { getOnlineUsers } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { fetchMessages, addSocketListeners } from "../../lib/chatUtils";

export default function ChatPage({ socket }) {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userTyping, setUserTyping] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    // connect the socket on component mount - User has logged in successfully
    socket.connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getOnlineUsers(setOnlineUsers, user);
      } catch (error) {
        console.error("Error fetching online users:", error);
        // Handle the error appropriately
      }
    };

    // Only fetch data if user exists
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    fetchMessages(setMessages); // Call fetchMessages when component mounts

    if (socket) {
      console.log("addSocketListeners in ChatPage component");

      const cleanupListeners = addSocketListeners(
        socket,
        setMessages,
        onlineUsers,
        setUserTyping
      );

      // Clean up event listeners when component unmounts
      return cleanupListeners;
    } else {
      // potentially render a loading window
      console.log("loading socket....");
    }
  }, [socket, onlineUsers]);

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
