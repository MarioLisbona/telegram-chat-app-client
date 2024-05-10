import UserButton from "./UserButton";
// import { sortArrayByUsername } from "../../../../lib/chatUitls";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../../lib/firebase";
import { useState, useEffect } from "react";
import { getOnlineUsers } from "../../../../lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function ActiveUser({ socket }) {
  const [user] = useAuthState(auth);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const q = query(collection(db, "users"), where("online", "==", true));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const updatedOnlineUsers = [];
        snapshot.forEach((doc) => {
          updatedOnlineUsers.push(doc.data());
        });
        setOnlineUsers(updatedOnlineUsers);
      });
      return unsubscribe;
    };

    getUsers();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if (user && user.uid) {
      setUserId(user.uid);
    }
  }, [user]); // Update when user changes
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
