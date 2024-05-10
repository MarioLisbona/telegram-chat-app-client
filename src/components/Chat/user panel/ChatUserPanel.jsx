import ChatName from "./components/ChatName";
// import UserProfile from "./components/UserProfile";
import ActiveUsers from "./components/ActiveUsers";
import { useState, useEffect } from "react";

export default function ChatUserPanel({ socket }) {
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-80 bg-white flex-shrink-0">
      <ChatName />
      {/* <UserProfile /> */}
      <ActiveUsers socket={socket} />
    </div>
  );
}
