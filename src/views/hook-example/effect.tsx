import React from 'react'
import UseEffectDemo, { ClassEffectDemo } from './useEffect-example'

import './index.scss'

export default class HookExample extends React.Component {
  render() {
    return (
      <div className="example-container">
        <h1>This is Hook Examples -- useEffect</h1>
        <h3>Hook:</h3>
        <UseEffectDemo />
        <h3>Class:</h3>
        <ClassEffectDemo />
      </div>
    )
  }
}
