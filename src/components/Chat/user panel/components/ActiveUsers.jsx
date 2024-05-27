import UserButton from "./UserButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../lib/firebase";
import { useState, useEffect, useRef } from "react";
import { getOnlineUsers } from "../../../../lib/firebase";

export default function ActiveUser({ socket }) {
  const [user] = useAuthState(auth);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const containerRef = useRef(null);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    getOnlineUsers(setOnlineUsers, user);
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      setUserId(user.uid);
    }
  }, [user]); // Update when user changes

  return (
    <div className="flex flex-col space-y-1 mt-4 overflow-y-auto">
      <button
        className="flex flex-row items-center justify-between bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 shadow rounded-2xl me-2"
        onClick={toggleCollapse}
      >
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500">
          {onlineUsers.length}
        </div>
        <div className="flex flex-col justify-center items-start">
          <div className="ml-2 text-sm">
            <div className="font-semibold">
              {isCollapsed ? "Show users" : "Hide users"}
            </div>
          </div>
        </div>
        {isCollapsed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        )}
      </button>
      <div
        ref={containerRef}
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? "max-h-0" : "max-h-[500px]"
        }`}
        style={{ transitionProperty: "max-height" }}
      >
        {onlineUsers.map((onlineUser, idx) => (
          <UserButton onlineUser={onlineUser} key={idx} socket={socket} />
        ))}
      </div>
    </div>
  );
}
