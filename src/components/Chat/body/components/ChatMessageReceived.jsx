import { returnBgColor } from "../../../../lib/colorsUtils";
import { formatChatDateTime } from "../../../../lib/generalUtils";
export default function ChatMessageReceived({ message }) {
  const text = message.text;
  const userName = message.name;
  const userInitial =
    message.name.charAt(0) == "(" ? "TG" : message.name.charAt(0).toUpperCase();
  const timeSent = formatChatDateTime(message.datetime);
  const bgColorName = returnBgColor(userName);

  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-col items-start">
        <div className="text-xs mb-1">{userName}</div>
        <div className="flex items-start justify-start">
          <div className="flex">
            <div
              className={`flex-shrink-0 top-0 left-0 flex items-center justify-center h-10 w-10 rounded-full ${bgColorName}`}
            >
              {userInitial}
            </div>
          </div>
          <div className="relative ml-3 text-sm font-medium bg-white py-2 px-4 shadow rounded-xl rounded-tl-none flex-grow whitespace-pre-wrap">
            <div>{text}</div>
          </div>
        </div>
        <div className="text-xs mt-1">{timeSent}</div>
      </div>
    </div>
  );
}
