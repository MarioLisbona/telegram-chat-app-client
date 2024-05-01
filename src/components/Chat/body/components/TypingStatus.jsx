export default function TypingStatus() {
  return (
    <div className="flex items-center justify-center">
      <span className="relative flex h-3 w-3 ms-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-700"></span>
      </span>
      <div className="text-sm ms-1">typing</div>
    </div>
  );
}
