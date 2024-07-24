import { DispatchProps, RootState } from '@/store'
import { fetchDemoData, resetDemo, setCount } from '@/store/demo'
import Button from '@hi-ui/button'
import React from 'react'
import { connect } from 'react-redux'

interface Data {
  id: number
  title: string
}

interface Demo {
  data: Data[]
  count: number
  loading: boolean
}

type Props = Readonly<
  DispatchProps & {
    demo: Demo
  }
>
type State = Readonly<Record<string, never>>

class ClassEffectDemo extends React.Component<Props, State> {
  fetchData = () => {
    fetchDemoData({
      text: 'xiaomi',
    })
  }

  get data() {
    const { data } = this.props.demo
    return data.filter((item) => item.id % 2 === 1)
  }

  render() {
    const { data } = this
    const { count, loading } = this.props.demo

    return (
      <div>
        <Button type="primary" onClick={this.fetchData}>
          Request
        </Button>
        <Button
          type="primary"
          onClick={() => {
            this.props.dispatch(resetDemo())
          }}
        >
          Clear
        </Button>
        {loading ? <p>Loading...</p> : <p>Your data:</p>}
        {data.map((m, n) => {
          return <h4 key={n}>{m.title}</h4>
        })}
        <br />
        <br />
        <p>You clicked {count} times</p>
        <Button
          type="primary"
          onClick={() => {
            this.props.dispatch(setCount(count + 1))
          }}
        >
          Click
        </Button>
      </div>
    )
  }
}

export default connect((state: RootState) => ({
  demo: state.demo,
}))(ClassEffectDemo)
