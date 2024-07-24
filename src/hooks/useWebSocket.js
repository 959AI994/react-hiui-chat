// src/useWebSocket.js
import { useEffect, useRef, useState } from 'react'
import WebSocketClient from 'websocket'

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const wsRef = useRef(null)

  useEffect(() => {
    const client = new WebSocketClient(url)

    client.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message.utf8Data])
    })

    client.on('error', (error) => {
      console.error('WebSocket error:', error)
    })

    client.connect()
    setSocket(client)

    return () => {
      client.close()
    }
  }, [url])

  const sendMessage = (message) => {
    if (socket && socket.socket.readyState === WebSocket.OPEN) {
      socket.send(message)
    }
  }

  return {
    messages,
    sendMessage,
  }
}

export default useWebSocket
