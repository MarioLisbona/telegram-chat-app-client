import { formatChatCreatedAt } from "../../../../lib/generalUtils";
export default function UserJoinLeave({ message }) {
  const text = message.text;
  const left = text.includes("left");
  const userName = message.name;
  const timeSent = formatChatCreatedAt(message.createdAt);
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex flex-col items-end">
        <div className="text-xs mb-1">{userName}</div>
        <div className="flex items-start justify-end">
          <div className="flex row-reverse">
            <div
              className={`relative mr-3 text-sm text-black font-medium py-2 px-4 shadow rounded-xl rounded-tr-none max-w-1/2 flex-grow whitespace-pre-wrap ${
                left ? " bg-rose-400" : " bg-emerald-400"
              }`}
            >
              <div>{text}</div>
            </div>
            <div
              className={`flex-shrink-0 top-0 right-0 flex items-center justify-center h-10 w-10 rounded-full ${
                left ? " bg-rose-400" : " bg-emerald-400"
              }`}
            >
              {"T"}
            </div>
          </div>
        </div>
        <div className="text-xs mt-1">{timeSent}</div>
      </div>
    </div>
  );
}
