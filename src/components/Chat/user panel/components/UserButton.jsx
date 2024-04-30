export default function UserButton({ user }) {
  const activeUser = user.userName;
  const userInitial = user.userName.charAt(0).toUpperCase();
  // set username
  const chatUser = localStorage.getItem("userName") == user.userName;
  console.log(chatUser);
  return (
    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
      <div
        className={`flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full ${
          chatUser ? "border-2 border-indigo-500" : ""
        }`}
      >
        {userInitial}
      </div>
      <div
        className={`ml-2 text-sm  ${
          chatUser ? "text-indigo-500 font-bold" : "font-semibold"
        }`}
      >
        {activeUser}
      </div>
    </button>
  );
}
