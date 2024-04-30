import ChatName from "./components/ChatName";
import UserProfile from "./components/UserProfile";
import ActiveUsers from "./components/ActiveUsers";

export default function ChatUserPanel() {
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      <ChatName />
      <UserProfile />
      <ActiveUsers />
    </div>
  );
}
