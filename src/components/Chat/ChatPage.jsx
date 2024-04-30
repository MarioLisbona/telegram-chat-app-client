import ChatBody from "./body/ChatBody";
import ChatUserPanel from "./user panel/ChatUserPanel";

export default function ChatPage() {
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <ChatUserPanel />
        <ChatBody />
      </div>
    </div>
  );
}
