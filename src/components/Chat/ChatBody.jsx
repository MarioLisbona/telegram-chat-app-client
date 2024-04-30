import ChatFooter from "./ChatFooter";
import ChatMessageReceived from "./ChatMessageReceived";
import ChatMessageSent from "./ChatMessageSent";
export default function ChatBody() {
  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              <ChatMessageReceived />
              <ChatMessageReceived />
              <ChatMessageReceived />
              <ChatMessageReceived />
              <ChatMessageReceived />

              <ChatMessageSent />
              <ChatMessageReceived />
              <ChatMessageSent />
              <ChatMessageReceived />
              <ChatMessageReceived />

              <ChatMessageSent />
              <ChatMessageReceived />
              <ChatMessageReceived />
              <ChatMessageReceived />
            </div>
          </div>
        </div>
        <ChatFooter />
      </div>
    </div>
  );
}
