import React from 'react'
import Grid from '@hi-ui/grid'
import Input from '@hi-ui/input'
import Button from '@hi-ui/button'
import { SearchOutlined } from '@hi-ui/icons'
import './home.scss'

const { Row, Col } = Grid

const Home = () => {
  return (
    <div className="page page-search">
      <div className="search-box">
        <Row justify="center">
          <h3 className="search-guide">Sologn引导文案</h3>
        </Row>
        <Row justify="center">
          <Input
            style={{ maxWidth: '450px' }}
            append={
              <Button type="primary">
                <SearchOutlined />
              </Button>
            }
            placeholder="Search"
          />
        </Row>
        <Row justify="center">
          <Col>热词：</Col>
          <Col>
            <span className="search-hot">关键词</span>
            <span className="search-hot">关键词</span>
            <span className="search-hot">关键词</span>
            <span className="search-hot">关键词</span>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Home
