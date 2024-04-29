import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  const navigate = useNavigate();

  // remove username from localStorage, relocate and reload window
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  // set username
  const chatUser = localStorage.getItem("userName");

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <div>
          <p>{chatUser}</p>
          <button className="leaveChat__btn" onClick={handleLeaveChat}>
            LEAVE CHAT
          </button>
        </div>
      </header>

      <div className="message__container">
        {/* map messages array */}
        {messages.map((message, idx) =>
          // if element username equals username for this client then display the message as sender
          // (right side - green)
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={idx}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            // else display the message as receivers (left side - red)
            <div className="message__chats" key={idx}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        {/* used to scroll to bottom of element on new message received */}
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
