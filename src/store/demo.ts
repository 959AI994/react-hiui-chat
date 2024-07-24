import { AppSelector, AppDispatch } from './index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import request from '@/utils/request'

interface DemoData {
  id: number
  title: string
}

// a string that is used as the prefix for generated action types
const SLICE_NAME = 'demo'

// the initial state value for the reducer
const initialState = {
  loading: false,
  error: false,
  count: 0,
  data: [] as DemoData[],
}

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    // The keys will become action type strings with `SLICE_NAME` here,
    // and the functions are reducers that will be run
    // when that action type is dispatched.
    // So, the `setTableData` case reducer function will be run
    // when an action with the type "demo/setTableData" is dispatched.
    setTableData(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    setCount(state, action) {
      // you can write code that "mutates" the state inside an reducer,
      // and Immer will safely return a correct immutably updated result.
      state.count = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    resetDemo() {
      return { ...initialState }
    },
  },
})

export type DemoState = typeof initialState
export const demoSelector: AppSelector<DemoState> = (state) => state.demo
// exported action creators
export const { setLoading, setError, setCount, setTableData, resetDemo } = slice.actions

interface FetchDemoDataParams {
  text: string
}

/**
 * async action for request data
 * @param params
 */
export const fetchDemoData = (params: FetchDemoDataParams) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true))
  dispatch(setError(false))

  try {
    const ret = await request<DemoData>('/select/options', {
      method: 'GET',
      params,
    })
    dispatch(setLoading(false))

    if (ret && ret.code === 200 && ret.data) {
      dispatch(
        setTableData({
          data: ret.data,
        })
      )
    } else {
      dispatch(setError(true))
    }
  } catch (e) {
    dispatch(setLoading(false))
    dispatch(setError(true))
  }
}

export default slice.reducer
