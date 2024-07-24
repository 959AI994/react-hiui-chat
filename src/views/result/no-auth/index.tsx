import React from 'react'
import Button from '@hi-ui/button'
import '../index.scss'

const NoAuth = () => {
  return (
    <div className="result-page">
      <div className="result-page__container">
        <div className="result--no-auth" />
        <div className="result-page__title">抱歉，您暂无访问权限！</div>
        <Button type="primary">申请权限</Button>
      </div>
    </div>
  )
}

export default NoAuth
