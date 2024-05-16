import "./TypingBubble.css";
export default function TypingBubble({ userTyping }) {
  const name = userTyping.name;

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center justify-start">
        <div className="text-xs">{`${name} is typing`}</div>
        <div className="flex justify-center items-center h-full ms-1">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
}
