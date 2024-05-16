import { useNavigate } from "react-router-dom";
import { signOutUser, auth } from "../../../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { fetchChatTitle } from "../../../../lib/generalUtils";

export default function ChatName() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [chatTitle, setChatTitle] = useState("");

  useEffect(() => {
    fetchChatTitle(setChatTitle);
  }, []);
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex flex-row items-center justify-start h-12 w-full">
        <button onClick={() => signOutUser(navigate)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
        </button>

        <div className="ml-2 font-bold text-2xl">{chatTitle && chatTitle}</div>
      </div>
      <div>{user && (user.displayName ? user.displayName : "Anonymous")}</div>
    </div>
  );
}
