import ChatFooter from "../footer/ChatFooter";
import ChatMessageReceived from "./components/ChatMessageReceived";
import ChatMessageSent from "./components/ChatMessageSent";
export default function ChatBody({
  messages,
  socket,
  lastMessageRef,
  typingStatus,
}) {
  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {messages.map((message, idx) =>
                message.name === localStorage.getItem("userName") ? (
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
        <ChatFooter socket={socket} typingStatus={typingStatus} />
      </div>
    </div>
  );
}
