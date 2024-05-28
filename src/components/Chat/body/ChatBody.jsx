import ChatFooter from "../footer/ChatFooter";
import ChatMessageReceived from "./components/ChatMessageReceived";
import ChatMessageSent from "./components/ChatMessageSent";
import { useEffect, useRef } from "react";

import TypingBubble from "./components/TypingBubble";

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
                {/* {messages.map((message, idx) =>
                  message?.name === thisUserObject?.name ? (
                    <ChatMessageSent message={message} key={idx} />
                  ) : (
                    <ChatMessageReceived message={message} key={idx} />
                  )
                )} */}
                {messages.map((message, idx) => {
                  if (message?.name === "telegram-chat-server") {
                    return `Message ${message.text}`;
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
          </div>
        </div>
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
}
