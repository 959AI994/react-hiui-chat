import React, { useCallback } from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@hi-ui/button'
import { fetchDemoData, setCount, resetDemo, demoSelector } from '@/store/demo'

// Selectors can compute derived data and memoizing,
// allowing Redux to store the minimal possible state.
// https://react-redux.js.org/next/api/hooks#using-memoizing-selectors
const selector = createSelector(demoSelector, (demo) => ({
  ...demo,
  data: demo.data.filter((item) => item.id % 2 === 1),
}))

const ReduxHookDemo = () => {
  const dispatch = useDispatch()
  const { data, count, loading } = useSelector(selector)
  const sendRequest = useCallback(() => {
    dispatch(
      fetchDemoData({
        text: 'xiaomi',
      })
    )
  }, [dispatch])

  return (
    <div>
      <Button type="primary" onClick={sendRequest}>
        Request
      </Button>
      <Button
        type="primary"
        onClick={() => {
          dispatch(resetDemo())
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
          dispatch(setCount(count + 1))
        }}
      >
        Click
      </Button>
    </div>
  )
}

export default ReduxHookDemo
