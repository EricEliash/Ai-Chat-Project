import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble.jsx'
import LoadingMessage from './LoadingMessage.jsx'

// example prompts for the empty screen
const EXAMPLE_PROMPTS = [
  {
    title: 'Explain a concept',
    prompt: 'Explain what an API is, using a simple analogy.',
  },
  {
    title: 'Write some code',
    prompt: 'Write a Python function that reverses a string.',
  },
  {
    title: 'Brainstorm ideas',
    prompt: 'Give me 5 project ideas for a full-stack student.',
  },
  {
    title: 'Summarize',
    prompt: 'Summarize the benefits of using React for a beginner.',
  },
]

function ChatWindow({ messages, loading, onExample }) {
  const bottomRef = useRef(null)

  // scroll to the newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const isEmpty = messages.length === 0 && !loading

  if (isEmpty) {
    return (
      <div className="chat-window">
        <div className="welcome">
          <h1 className="welcome-title">AI Chat</h1>
          <p className="welcome-subtitle">
            Ask anything. Your conversation stays in context as you keep chatting.
          </p>
          <div className="example-grid">
            {EXAMPLE_PROMPTS.map((item) => (
              <button
                key={item.title}
                className="example-card"
                onClick={() => onExample(item.prompt)}
              >
                <span className="example-card-title">{item.title}</span>
                <span className="example-card-text">{item.prompt}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id ?? index}
            role={message.role}
            content={message.content}
          />
        ))}
        {loading && <LoadingMessage />}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

export default ChatWindow
