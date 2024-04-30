export default function ChatMessageReceived({ message }) {
  const text = message.text;
  const userName = message.name;
  const userInitial =
    message.name.charAt(0) == "(" ? "TG" : message.name.charAt(0).toUpperCase();

  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-col item-center">
        <div className="text-xs mb-1">{userName}</div>
        <div className="flex flex-row items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            {userInitial}
          </div>
          <div className="relative ml-3 text-sm font-medium bg-white py-2 px-4 shadow rounded-xl rounded-tl-none">
            <div>{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
