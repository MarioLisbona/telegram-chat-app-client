import "./TypingBubble.css";
import { returnBgColor } from "../../../../lib/colorsUtils";
export default function TypingBubble({ userTyping }) {
  const name = userTyping.name;
  const userInitial = userTyping.name.charAt(0);
  const bgColorName = returnBgColor(name);
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-col items-start">
        <div className="flex items-start justify-start">
          <div className="flex">
            <div
              className={`flex-shrink-0 top-0 left-0 flex items-center justify-center h-10 w-10 rounded-full ${bgColorName}`}
            >
              {userInitial}
            </div>
          </div>
          <div className="flex justify-center align-items-center">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
