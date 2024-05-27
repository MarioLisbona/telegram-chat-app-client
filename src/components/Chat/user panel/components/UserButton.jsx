import { returnBgColor } from "../../../../lib/colorsUtils";

export default function UserButton({ onlineUser }) {
  // variable to grab User initial
  const userInitial = onlineUser.name.charAt(0).toUpperCase();

  const name = onlineUser.name;
  const bgColorName = returnBgColor(name);

  return (
    <button className="flex flex-row items-center hover:bg-gray-100 rounded-2xl px-4 py-2 w-full">
      <div
        className={`flex items-center justify-center h-8 w-8 rounded-full ${bgColorName}`}
      >
        {userInitial}
      </div>
      <div className="flex flex-col justify-center items-start">
        <div className="ml-2 text-sm">
          <div className="font-semibold">{name}</div>
        </div>
      </div>
    </button>
  );
}
