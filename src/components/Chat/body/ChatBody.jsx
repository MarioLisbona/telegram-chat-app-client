import ChatFooter from "../footer/ChatFooter";
import ChatMessageReceived from "./components/ChatMessageReceived";
import ChatMessageSent from "./components/ChatMessageSent";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";
import { getOnlineUsers } from "../../../lib/firebase";
export default function ChatBody({ messages, socket, lastMessageRef }) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [user] = useAuthState(auth);

  // This is working right now.
  // TODO: create function to return This user object
  useEffect(() => {
    getOnlineUsers(setOnlineUsers, user);
  }, []);

  // UserObject data for this user from firestore
  const thisUserObject = onlineUsers[0];

  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {messages.map((message, idx) =>
                message.name === thisUserObject.name ? (
                  <ChatMessageSent message={message} key={idx} />
                ) : (
                  <ChatMessageReceived message={message} key={idx} />
                )
              )}
            </div>
          </div>
          {/* used to scroll to bottom of element on new message received */}
          <div ref={lastMessageRef} />
        </div>
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
}
