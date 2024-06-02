import ChatFooter from "../footer/ChatFooter";
import ChatMessageReceived from "./components/ChatMessageReceived";
import ChatMessageSent from "./components/ChatMessageSent";
import { useEffect, useRef, useState } from "react";

import TypingBubble from "./components/TypingBubble";
import UserJoinLeave from "./components/UserJoinLeave";
import DataGrid from "./components/DataGrid";
import { fetchTokenData } from "../../../lib/chatUtils";

export default function ChatBody({
  messages,
  socket,
  onlineUsers,
  userTyping,
}) {
  const [tokenQuery, setTokenQuery] = useState(false);
  const [token, setToken] = useState("");
  const chatBodyRef = useRef(null);

  // UserObject data for this user from firestore
  const thisUserObject = onlineUsers[0];

  // Scroll to the bottom of the chat window when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, tokenQuery]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.text) {
      const match = lastMessage.text.match(/\$([a-zA-Z0-9]+)/);
      if (match) {
        fetchTokenData(match, setToken);
        setTokenQuery(true);
      }
    }
  }, [messages]);

  console.log("tokenQuery", tokenQuery);

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
            {tokenQuery && (
              <div>
                <button
                  type="button"
                  className=" bg-white border border-gray-300 rounded-full p-2 my-2 hover:bg-gray-200 focus:outline-none"
                  onClick={() => setTokenQuery(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600 hover:text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <DataGrid token={token} />
              </div>
            )}
          </div>
        </div>
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
}
