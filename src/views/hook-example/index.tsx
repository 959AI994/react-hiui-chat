import React from 'react'
import UseStateExample, { ClassStateDemo } from './useState-example'

import './index.scss'

export default class HookExample extends React.Component {
  render() {
    return (
      <div className="example-container">
        <h1>This is Hook Examples!!!</h1>
        <h3>Hook:</h3>
        <UseStateExample />
        <pre>
          {`
  const stateDemo = () => {
    const [count, setCount] = useState(0)

    return (
      <div>
        <p>You clicked {count} times</p>
        <Button
          type='primary'
          onClick={() => {
          setCount(count + 1)
          }}
        >
          Click
        </Button>
      </div>
    )
  }
      `}
        </pre>
        <h3>Class:</h3>
        <ClassStateDemo />
        <pre>
          {`
  class ClassStateDemo extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        count: 0
      }
    }
    render() {
      return <div>
        <p>You clicked {this.state.count} times</p>
        <Button
          type='primary'
          onClick={() => {
            this.setState({
              count: this.state.count + 1
            })
          }}
        >
          Click
        </Button>
      </div>
    }
  }
          `}
        </pre>
      </div>
    )
  }
}
