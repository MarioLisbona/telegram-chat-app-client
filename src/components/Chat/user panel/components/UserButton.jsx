import React from "react";

export default function UserButton({ user }) {
  const activeUser = user.userName;
  const userInitial = user.userName.charAt(0).toUpperCase();
  console.log({ user });
  return (
    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
      <div className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full">
        {userInitial}
      </div>
      <div className="ml-2 text-sm font-semibold">{activeUser}</div>
    </button>
  );
}
