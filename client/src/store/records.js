import { createSlice } from '@reduxjs/toolkit'
import httpService from '../services/http.service'

const initialState = {
  loading: false,
  errors: {},
  entities: []
}

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    recordRequested: state => {
      state.loading = true
      state.errors = {}
    },
    recordRequestSuccess: (state, { payload }) => {
      state.loading = false
      state.errors = {}
      state.entities[payload.id].push(payload.record)
    },
    recordRequestFail: (state, action) => {
      state.loading = false
      state.errors = action.payload
    },
    recordsSet: (state, action) => {
      state.entities = action.payload
      state.errors = {}
      state.loading = false
    },
    recordsCleared: () => {
      return initialState
    }
  }
})

const { reducer: recordsReducer, actions } = recordsSlice
const { recordsSet, recordsCleared, recordRequested, recordRequestSuccess, recordRequestFail } = actions

export const clearRecords = () => dispatch => {
  dispatch(recordsCleared())
}

export const setRecords = projects => dispatch => {
  const records = projects.reduce((total, p) => ({ ...total, [p._id]: p.records}))
  dispatch(recordsSet(records))
}

export const addRecord = payload => async dispatch => {
  dispatch(recordRequested())

  try {
    const { data } = await httpService.post('records/add', payload)
    dispatch(recordRequestSuccess({ id: payload.projectId, record: data }))
  } catch (e) {
    const data = e?.response?.data
    dispatch(recordRequestFail(data?.errors || e.code))
    return data || { errors: { message: e.code } }
  }
}

export const getProjectRecords = id => state => state.records.entities[id]

export const getRecordLoading = () => state => state.records.loading
export default recordsReducer