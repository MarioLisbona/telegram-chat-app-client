import { formatChatCreatedAt } from "../../../../lib/generalUtils";
export default function UserJoinLeave({ message }) {
  const text = message.text;
  const left = text.includes("left");
  const userName = message.name;
  const timeSent = formatChatCreatedAt(message.createdAt);
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex flex-col items-start">
        <div className="flex items-start justify-end">
          <div className="flex row-reverse justify-center items-center">
            <div
              className={`relative text-xs font-medium bg-white px-4 py-1 shadow rounded-xl flex-grow border-solid border-2 ${
                left ? " border-rose-400" : " border-emerald-400"
              }`}
            >
              <div>{`${timeSent} - ${text}`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
