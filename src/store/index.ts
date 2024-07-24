import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import demo from './demo'

const rootReducer = combineReducers({
  // Add other reducers here like the `demo` reducer
  demo,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store

// store types
export type AppDispatch = typeof store.dispatch
export type AppGetState = typeof store.getState
export type RootState = ReturnType<typeof rootReducer>
export type AppSelector<T> = (state: RootState) => T
export type DispatchProps = { dispatch: AppDispatch }
