import React from 'react'
import Button from '@hi-ui/button'
import '../index.scss'

const ServerError = () => {
  return (
    <div className="result-page">
      <div className="result-page__container">
        <div className="result--server-error" />
        <div className="result-page__title">抱歉，服务器出错了！</div>
        <Button type="primary">返回首页</Button>
      </div>
    </div>
  )
}

export default ServerError
