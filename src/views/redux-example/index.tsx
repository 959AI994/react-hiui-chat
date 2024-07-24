import React from 'react'
import ReduxClassExample from './class-example'
import ReduxHookExample from './hook-example'

export default class ReduxExample extends React.Component {
  render() {
    return (
      <div className="redux-example-container">
        <h1>This is Redux Examples!!!</h1>
        <h3>Hook:</h3>
        <ReduxHookExample />
        <br />
        <br />
        <h3>Class:</h3>
        <ReduxClassExample />
      </div>
    )
  }
}
