import axios from 'axios'

// backend URL (override with VITE_API_BASE_URL)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export function getErrorMessage(error) {
  if (error.response && error.response.data && error.response.data.detail) {
    return error.response.data.detail
  }
  // no response means the backend is not reachable
  if (error.request && !error.response) {
    return `Cannot reach the server at ${API_BASE_URL}. Make sure the backend is running (uvicorn app.main:app --reload).`
  }
  return error.message || 'Something went wrong. Please try again.'
}

export async function checkHealth() {
  const { data } = await api.get('/api/health')
  return data
}

export async function createConversation(title = null) {
  const { data } = await api.post('/api/conversations', { title })
  return data
}

export async function getMessages(conversationId) {
  const { data } = await api.get(`/api/conversations/${conversationId}/messages`)
  return data
}

export async function sendMessage(conversationId, content) {
  const { data } = await api.post(
    `/api/conversations/${conversationId}/messages`,
    { content },
  )
  return data
}

export async function deleteConversation(conversationId) {
  await api.delete(`/api/conversations/${conversationId}`)
}

export default api
