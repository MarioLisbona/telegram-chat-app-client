export default function ChatMessageSent({ message }) {
  const text = message.text;
  const userName = message.name;
  const userInitial = message.name.charAt(0).toUpperCase();

  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex flex-col items-end">
        <div className="text-xs mb-1">{userName}</div>
        <div className="flex items-center justify-start flex-row-reverse">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            {userInitial}
          </div>
          <div className="relative mr-3 text-sm text-white font-medium bg-indigo-500 py-2 px-4 shadow rounded-xl rounded-tr-none max-w-1/2">
            <div>{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
