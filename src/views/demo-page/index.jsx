import React, { useState, useEffect, useRef } from 'react'
import { Avatar } from '@hi-ui/hiui'
import Input from '@hi-ui/input'
import { ExpressionOutlined, AudioOutlined } from '@hi-ui/icons'
import { v4 as uuidv4 } from 'uuid' // 导入uuid生成函数
import './DemoPage.css'
// import Avatar from "@hi-ui/avatar"

const DemoPage = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const wsRef = useRef(null) // 用于保存 WebSocket 实例
  const currentUser = useRef(generateUserId()) // 假设每个用户有一个独一无二的ID
  const receivedMessageIds = useRef(new Set()) // 用于存储收到消息的ID，避免重复消息

  function generateUserId() {
    return 'user_' + uuidv4() // 使用uuid生成唯一用户ID
  }

  const handleWebSocketMessage = (event) => {
    const message = event.data

    if (message instanceof Blob) {
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const result = JSON.parse(reader.result)
          if (!receivedMessageIds.current.has(result.id)) {
            receivedMessageIds.current.add(result.id)
            setMessages((prevMessages) => [...prevMessages, { ...result, isLocal: false }])
          }
        } catch (error) {
          console.error('Failed to parse message as JSON:', error)
        }
      }
      reader.onerror = (error) => {
        console.error('Error reading the blob:', error)
      }
      reader.readAsText(message)
    } else {
      try {
        const result = JSON.parse(message)
        if (!receivedMessageIds.current.has(result.id)) {
          receivedMessageIds.current.add(result.id)
          setMessages((prevMessages) => [...prevMessages, { ...result, isLocal: false }])
        }
      } catch (error) {
        console.error('Failed to parse message as JSON:', error)
      }
    }
  }

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:8080')

    wsRef.current.onopen = () => {
      console.log('WebSocket connection established')
    }

    wsRef.current.onmessage = handleWebSocketMessage

    wsRef.current.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      wsRef.current.close()
    }
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageObject = {
        text: newMessage,
        user: currentUser.current,
        isLocal: true,
        id: uuidv4(), // 使用uuid生成唯一的消息ID
        Avatar: 'https://avatars.githubusercontent.com/u/810438?v=4',
      }
      wsRef.current.send(JSON.stringify(messageObject))
      setMessages((prevMessages) => [...prevMessages, messageObject])
      setNewMessage('')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
        <h1>Chat通信聊天</h1>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {messages.map((msg) => (
          <div
            className={msg.isLocal ? 'message-right' : 'message-left'}
            key={msg.id}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} // 调整样式以适配左右消息
          >
            {/* 当消息不是本地发送时，在左侧显示头像 */}
            {!msg.isLocal && (
              <Avatar
                // src={msg.avatar}
                src={
                  msg.avatar ||
                  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp'
                } // 使用 msg.avatar 或默认头像
                initials={msg.user.charAt(0)}
                shape="circle"
                style={{ marginRight: '10px' }} // 左侧消息头像和文本间距
              />
            )}

            <div className={msg.isLocal ? 'message-text-right' : 'message-text-left'}>
              {msg.text}
            </div>

            {/* 当消息是本地发送时，在右侧显示头像 */}
            {msg.isLocal && (
              <Avatar
                // src={msg.avatar}
                src={
                  msg.avatar ||
                  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp'
                }
                initials={msg.user.charAt(0)}
                shape="circle"
                style={{ marginLeft: '10px' }} // 右侧消息头像和文本间距
              />
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: '10px', borderTop: '1px solid #ddd' }}>
        <Input
          size="md"
          clearable
          placeholder="请输入"
          prepend={<ExpressionOutlined />}
          suffix={<AudioOutlined />}
          append={
            <div onClick={handleSendMessage} style={{ cursor: 'pointer' }}>
              Send
            </div>
          }
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}

export default DemoPage
