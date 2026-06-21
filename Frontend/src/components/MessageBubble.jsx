function MessageBubble({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`message-row ${isUser ? 'message-row-user' : 'message-row-assistant'}`}>
      <div className="message-avatar" aria-hidden="true">
        {isUser ? 'You' : 'AI'}
      </div>
      <div className="message-bubble">{content}</div>
    </div>
  )
}

export default MessageBubble
