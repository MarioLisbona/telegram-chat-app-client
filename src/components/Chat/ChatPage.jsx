import ChatName from "./ChatName";
import UserProfile from "./UserProfile";
import ActiveUsers from "./ActiveUsers";
import ChatBody from "./ChatBody";

export default function ChatPage() {
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <ChatName />
          <UserProfile />
          <ActiveUsers />
        </div>
        <ChatBody />
      </div>
    </div>
  );
}
