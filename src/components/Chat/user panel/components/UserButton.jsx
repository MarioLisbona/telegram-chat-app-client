import TypingStatus from "../../body/components/TypingStatus";
import { useState, useEffect } from "react";

export default function UserButton({ user, socket }) {
  const [showTypingStatus, setShowTypingStatus] = useState(false);

  // useEffect to set timeout for rendering component when user is typing
  useEffect(() => {
    socket.on("typingResponse", (data) => {
      if (data === user.userName) {
        setShowTypingStatus(true);
        const timeoutId = setTimeout(() => {
          setShowTypingStatus(false);
        }, 3000);
        return () => clearTimeout(timeoutId);
      }
    });

    return () => {
      socket.off("typingResponse");
    };
  }, [socket, user.userName]);

  const userInitial = user.userName.charAt(0).toUpperCase();
  const chatUser = localStorage.getItem("userName") == user.userName;

  return (
    <div className="flex flex-col items-start justify-center">
      <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
        <div
          className={`flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full ${
            chatUser ? "border-2 border-indigo-500" : ""
          }`}
        >
          {userInitial}
        </div>

        <div
          className={`ml-2 text-sm  ${
            chatUser ? "text-indigo-500 font-bold" : "font-semibold"
          }`}
        >
          {showTypingStatus ? <TypingStatus /> : user.userName}
        </div>
      </button>
    </div>
  );
}
