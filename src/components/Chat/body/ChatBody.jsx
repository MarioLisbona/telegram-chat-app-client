import ChatFooter from "../footer/ChatFooter";
import ChatMessageReceived from "./components/ChatMessageReceived";
import ChatMessageSent from "./components/ChatMessageSent";
import { useEffect, useRef } from "react";

import TypingBubble from "./components/TypingBubble";
import UserJoinLeave from "./components/UserJoinLeave";
import DataGrid from "./components/DataGrid";

export default function ChatBody({
  messages,
  socket,
  onlineUsers,
  userTyping,
}) {
  const chatBodyRef = useRef(null);

  // UserObject data for this user from firestore
  const thisUserObject = onlineUsers[0];

  // Scroll to the bottom of the chat window when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const files = [
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
      source:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
      source:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
      source:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
      source:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
      source:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    },
    // More files...
  ];

  const nofiles = [];

  return (
    <div className="flex flex-col flex-auto h-full p-6 ">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 ">
        <div
          ref={chatBodyRef}
          className="flex flex-col h-full overflow-x-auto mb-4"
        >
          <div className="flex flex-col h-full">
            <div className="relative">
              <div className="grid grid-cols-12 gap-y-2">
                {messages.map((message, idx) => {
                  if (message?.name === "telegram-chat-server") {
                    return <UserJoinLeave message={message} key={idx} />;
                  } else if (message?.name === thisUserObject?.name) {
                    return <ChatMessageSent message={message} key={idx} />;
                  } else {
                    return <ChatMessageReceived message={message} key={idx} />;
                  }
                })}
              </div>

              {userTyping && (
                <div className="absolute bottom-0 left-0 bg-slate-300 p-2 inline-block rounded-lg">
                  <TypingBubble userTyping={userTyping} />
                </div>
              )}
            </div>
            <DataGrid files={files} />
          </div>
        </div>
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
}
