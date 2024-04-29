import { useState } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  // emit message when users is typing - used with onKeyDown in component
  const handleTyping = () =>
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);

  // send message to server on click event send button
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    // clear chat text box
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
