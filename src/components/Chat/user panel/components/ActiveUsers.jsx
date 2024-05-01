import UserButton from "./UserButton";
import { sortArrayByUsername } from "../../../../lib/chatUitls";
export default function ActiveUser({ users, socket }) {
  // assign current chat user and sort users array with current user at top
  const chatUser = localStorage.getItem("userName");
  const sortedUsers = sortArrayByUsername(users, chatUser);
  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Active Conversations</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {users.length}
        </span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {sortedUsers.map((user, idx) => (
          <UserButton user={user} key={idx} socket={socket} />
        ))}
      </div>
      <div className="flex flex-row items-center justify-between text-xs mt-6">
        <span className="font-bold">Archivied</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          7
        </span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2">
        <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
          <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
            H
          </div>
          <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
        </button>
      </div>
    </div>
  );
}
