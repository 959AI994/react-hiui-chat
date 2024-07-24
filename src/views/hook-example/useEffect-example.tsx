import request from '@/utils/request'
import Button from '@hi-ui/button'
import React, { useEffect, useState } from 'react'

interface Data {
  title: string
}

// hook 形式
const EffectDemo = () => {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    // 可执行任何有副作用的代码，如：数据请求、日志操作等等
    console.log('effect 执行')
    request<Data[]>('/select/options', {
      method: 'GET',
      params: {
        text: 'xiaomi',
      },
    })
      .then((res) => {
        if (res.code === 200 && res.data) {
          setData(res.data)
        }
      })
      .catch(console.log)
  }, [])
  return (
    <div>
      {data.map((m, n) => {
        return <h4 key={n}>{m.title}</h4>
      })}
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
  data: [] as Data[],
}

// class 形式
class ClassEffectDemo extends React.Component<Props, State> {
  state = initialState

  componentDidMount() {
    request<Data[]>('/select/options', {
      method: 'GET',
      params: {
        text: 'xiaomi',
      },
    })
      .then((res) => {
        if (res.code === 200 && res.data) {
          this.setState({
            data: res.data,
          })
        }
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        {this.state.data.map((m, n) => {
          return <h4 key={n}>{m.title}</h4>
        })}
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

export default EffectDemo
export { ClassEffectDemo }
