// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import randomColor from "randomcolor";
import nearestColor from "nearest-color";
import { colors } from "../../../../lib/colorsUtils";

const nc = nearestColor.from(colors);

export default function UserButton({ userId, onlineUser, socket }) {
  const [showTypingStatus, setShowTypingStatus] = useState(false);

  // useEffect to set timeout for rendering component when user is typing
  useEffect(() => {
    socket.on("typingResponse", (data) => {
      if (data === onlineUser.uid) {
        setShowTypingStatus(true);
        const timeoutId = setTimeout(() => {
          setShowTypingStatus(false);
        }, 2000);
        return () => clearTimeout(timeoutId);
      }
    });

    return () => {
      socket.off("typingResponse");
    };
  }, [socket]);

  // variable to grab User intiial
  const userInitial = onlineUser.name.charAt(0).toUpperCase();
  // used for conditional styling to highlight this user
  const thisUser = onlineUser.uid === userId;

  // Create random hex string based on username and map to tailwindcss colors object
  const bgColorHex = randomColor({ seed: onlineUser.name });
  const bgColorName = nc(bgColorHex).name;

  return (
    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
      <div
        className={`flex items-center justify-center h-8 w-8 rounded-full ${bgColorName}`}
      >
        {showTypingStatus ? (
          <span className="relative flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          </span>
        ) : (
          userInitial
        )}
      </div>
      <div className="flex flex-col justify-center items-start">
        <div className="ml-2 text-sm">
          <div className={"font-semibold"}>{onlineUser.name}</div>
        </div>
        {showTypingStatus && <div className="text-xs ml-2">typing</div>}
      </div>
    </button>
  );
}
