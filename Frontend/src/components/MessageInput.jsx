import { useState } from 'react'

// Enter sends, Shift+Enter adds a new line
function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState('')

  const submit = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <div className="message-input">
      <textarea
        className="message-input-field"
        placeholder="Send a message..."
        value={text}
        rows={1}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        className="message-input-send"
        onClick={submit}
        disabled={disabled || text.trim().length === 0}
        aria-label="Send message"
      >
        {disabled ? '...' : 'Send'}
      </button>
    </div>
  )
}

export default MessageInput
