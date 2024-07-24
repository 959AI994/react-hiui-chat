import React, { useState } from 'react'
import Button from '@hi-ui/button'

// hook 形式
const StateDemo = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <Button
        type="primary"
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click
      </Button>
    </div>
  )
}

type Props = Readonly<Record<string, never>>
type State = Readonly<typeof initialState>

const initialState = {
  count: 0,
}

// class 形式
class ClassStateDemo extends React.Component<Props, State> {
  state = initialState

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <Button
          type="primary"
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            })
          }}
        >
          Click
        </Button>
      </div>
    )
  }
}

export default StateDemo
export { ClassStateDemo }
