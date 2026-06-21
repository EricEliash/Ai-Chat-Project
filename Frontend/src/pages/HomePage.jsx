import { useState } from 'react'
import ChatWindow from '../components/ChatWindow.jsx'
import MessageInput from '../components/MessageInput.jsx'
import {
  createConversation,
  sendMessage,
  getErrorMessage,
} from '../api/chatApi.js'

// main chat page (state resets on refresh, messages stay saved in the DB)
function HomePage() {
  const [messages, setMessages] = useState([])
  const [conversationId, setConversationId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSend = async (text) => {
    if (loading) return
    setError(null)

    // show the user message right away
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setLoading(true)

    try {
      // create the conversation on the first message
      let activeId = conversationId
      if (activeId === null) {
        const conversation = await createConversation()
        activeId = conversation.id
        setConversationId(activeId)
      }

      // send to the backend and get the AI reply
      const assistantMessage = await sendMessage(activeId, text)
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  // start a new chat
  const handleNewChat = () => {
    setMessages([])
    setConversationId(null)
    setError(null)
    setLoading(false)
  }

  return (
    <div className="chat-page">
      <div className="chat-header">
        <span className="chat-header-status">
          {conversationId ? 'Conversation in progress' : 'New conversation'}
        </span>
        <button className="new-chat-btn" onClick={handleNewChat}>
          + New Chat
        </button>
      </div>

      <ChatWindow messages={messages} loading={loading} onExample={handleSend} />

      {error && <div className="error-banner">{error}</div>}

      <MessageInput onSend={handleSend} disabled={loading} />
    </div>
  )
}

export default HomePage
