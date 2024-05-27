import UserButton from "./UserButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../lib/firebase";
import { useState, useEffect } from "react";
import { getOnlineUsers } from "../../../../lib/firebase";

export default function ActiveUser({ socket }) {
  const [user] = useAuthState(auth);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getOnlineUsers(setOnlineUsers, user);
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      setUserId(user.uid);
    }
  }, [user]); // Update when user changes

  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row items-center justify-start text-xs mx-1">
        <span className="flex items-center justify-center bg-gray-300 h-6 w-6 rounded-full ">
          {onlineUsers.length}
        </span>
        <span className="font-bold mx-2">Active Users</span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
        {onlineUsers &&
          onlineUsers.map((onlineUser, idx) => (
            <UserButton onlineUser={onlineUser} key={idx} socket={socket} />
          ))}
      </div>
    </div>
  );
}
