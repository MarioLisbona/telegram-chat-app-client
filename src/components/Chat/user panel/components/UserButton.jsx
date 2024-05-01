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
        }, 2000);
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
    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
      <div
        className={
          "flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full"
        }
      >
        {showTypingStatus ? (
          <span className="relative flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          </span>
        ) : (
          userInitial
        )}
      </div>
      <div className="flex flex-col justify-center items-start">
        <div className="ml-2 text-sm">
          <div
            className={`${
              chatUser ? "text-indigo-500 font-bold" : "font-semibold"
            }`}
          >
            {user.userName}
          </div>
        </div>
        {showTypingStatus && <div className="text-xs ml-2">typing</div>}
      </div>
    </button>
  );
}
