// src/contexts/WebSocketContext.js

import React, { createContext, useContext } from 'react'
import { useWebSocket } from '../hooks/useWebSocket'
import DemoPage from './views/demo-page/index'

const WebSocketContext = createContext(null)

export const useWebSocketContext = () => useContext(WebSocketContext)

export const WebSocketProvider = ({ children, accessToken, requestName }) => {
  const { socket, send } = useWebSocket(accessToken, requestName)

  return <WebSocketContext.Provider value={{ socket, send }}>{children}</WebSocketContext.Provider>
}
