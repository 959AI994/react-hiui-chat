// src/components/ChatComponent.js

import React, { useState } from 'react'
import { useWebSocketContext } from '../contexts/WebSocketContext'
import DemoPage from './views/demo-page/index'

function ChatComponent() {
  const { messages, sendMessage } = useWebSocketContext()
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    sendMessage(newMessage)
    setNewMessage('')
  }

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  )
}

export default ChatComponent
