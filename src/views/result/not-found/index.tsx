import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@hi-ui/button'
import '../index.scss'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="result-page">
      <div className="result-page__container">
        <div className="result--not-found" />
        <div className="result-page__title">抱歉，您访问的页面不存在！</div>
        <Button
          type="primary"
          onClick={() => {
            navigate('/home')
          }}
        >
          返回首页
        </Button>
      </div>
    </div>
  )
}

export default NotFound
