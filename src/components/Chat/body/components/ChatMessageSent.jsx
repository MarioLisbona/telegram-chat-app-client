export default function ChatMessageSent({ message }) {
  const text = message.text;
  const userInitial = message.name.charAt(0).toUpperCase();
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          {userInitial}
        </div>
        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
}