// typing indicator while waiting for the reply
function LoadingMessage() {
  return (
    <div className="message-row message-row-assistant">
      <div className="message-avatar" aria-hidden="true">
        AI
      </div>
      <div className="message-bubble message-bubble-loading" aria-label="Assistant is typing">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  )
}

export default LoadingMessage
