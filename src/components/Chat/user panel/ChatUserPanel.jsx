import ChatName from "./components/ChatName";
// import UserProfile from "./components/UserProfile";
import ActiveUsers from "./components/ActiveUsers";
import { useState, useEffect } from "react";

export default function ChatUserPanel({ socket, chatTitle }) {
  const [users, setUsers] = useState([]);

  console.log("inside ChatUserPanel", chatTitle);
  // receive the array of active users
  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-80 bg-white flex-shrink-0">
      <ChatName chatTitle={chatTitle} />
      {/* <UserProfile /> */}
      <ActiveUsers users={users} socket={socket} />
    </div>
  );
}
