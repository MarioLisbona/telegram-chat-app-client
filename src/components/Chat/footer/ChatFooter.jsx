import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";
import { getOnlineUsers } from "../../../lib/firebase";
import { formatDateTime } from "../../../lib/generalUtils";

export default function ChatFooter({ socket }) {
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [user] = useAuthState(auth);

  // This is working right now.
  // TODO: create function to return This user object
  useEffect(() => {
    getOnlineUsers(setOnlineUsers, user);
  }, [user]);

  // UserObject data for this user from firestore
  const thisUserObject = onlineUsers[0];

  // create now instnace and return formatted datetime
  const now = new Date();
  const formattedDateTime = formatDateTime(now);

  // // send message to server on click event send button
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", {
        text: message,
        name: thisUserObject.name,
        userId: thisUserObject.uid,
        socketID: socket.id,
        datetime: formattedDateTime,
      });
    }
    // clear chat text box
    setMessage("");
  };

  // emit message when users is typing - used with onKeyDown in component
  const handleTyping = (e) => {
    // dont emit for enter button
    if (e.key === "Enter") {
      socket.emit("stoppedTyping", user.uid);
    } else {
      socket.emit("typing", user.uid);
    }
  };

  return (
    <form onSubmit={(e) => handleSendMessage(e)}>
      <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
        <div></div>
        <div className="flex-grow ml-4">
          <div className="relative w-full">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleTyping}
              type="text"
              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            />
          </div>
        </div>
        <div className="ml-4">
          <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
            <span>Send</span>
            <span className="ml-2">
              <svg
                className="w-4 h-4 transform rotate-45 -mt-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
