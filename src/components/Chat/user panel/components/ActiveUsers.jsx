import UserButton from "./UserButton";
// import { sortArrayByUsername } from "../../../../lib/chatUitls";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../lib/firebase";
import { useState, useEffect } from "react";
import { getOnlineUsers } from "../../../../lib/firebase";

export default function ActiveUser({ socket }) {
  const [user] = useAuthState(auth);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userId, setUserId] = useState("");

  // set he state for onlineUsers with the returned array of users from firestore db
  // need to create an async function inside use effect and then call it
  useEffect(() => {
    async function getUsers() {
      const returnedUsers = await getOnlineUsers();
      setOnlineUsers(returnedUsers);
    }

    getUsers();
  }, []);

  // create a variable with the email address of the user using this client connection
  // used to find this clients user in the onlineUsers array
  // Check if the user is logged in before accessing user.uid
  useEffect(() => {
    if (user && user.uid) {
      setUserId(user.uid);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Active Conversations</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {onlineUsers.length}
        </span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
        {onlineUsers &&
          onlineUsers.map((onlineUser, idx) => (
            <UserButton
              userId={userId}
              onlineUser={onlineUser}
              key={idx}
              socket={socket}
            />
          ))}
      </div>
    </div>
  );
}
