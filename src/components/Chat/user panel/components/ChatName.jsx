import { handleLeaveChat } from "../../../../lib/chatUitls";
import { useNavigate } from "react-router-dom";

export default function ChatName({ chatTitle }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center justify-start h-12 w-full">
      <button onClick={() => handleLeaveChat(navigate)}>
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

      <div className="ml-2 font-bold text-2xl">
        {chatTitle ? chatTitle : "Chat title"}
      </div>
    </div>
  );
}
