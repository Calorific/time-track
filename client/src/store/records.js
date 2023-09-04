import { createSlice } from '@reduxjs/toolkit'
import httpService from '../services/http.service'

const initialState = {
  loading: false,
  errors: {},
  entities: {}
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
      if (Array.isArray(state.entities[payload.id]))
        state.entities[payload.id].push(payload.record)
      else state.entities[payload.id] = [payload.record]
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
    projectRecordsCleared: (state, action) => {
      delete state.entities[action.payload]
    },
    recordIsDeleting: (state, { payload }) => {
      state.entities[payload.projectId].find(r => r._id === payload.recordId).isDeleting = true
    },
    recordDeleteCancelled: (state, { payload }) => {
      state.entities[payload.projectId].find(r => r._id === payload.recordId).isDeleting = false
    },
    recordDeleted: (state, { payload }) => {
      state.entities[payload.projectId] = state.entities[payload.projectId].filter(r => r._id !== payload.recordId)
    },
    recordsCleared: () => {
      return initialState
    }
  }
})

const { reducer: recordsReducer, actions } = recordsSlice
const { recordsSet, recordsCleared, recordRequested, recordRequestSuccess, recordRequestFail, projectRecordsCleared, recordDeleted, recordIsDeleting, recordDeleteCancelled } = actions

export const clearRecords = () => dispatch => {
  dispatch(recordsCleared())
}

export const clearProjectRecords = id => dispatch => {
  dispatch(projectRecordsCleared(id))
}

export const deletingRecord = payload => dispatch => {
  dispatch(recordIsDeleting(payload))
}

export const cancelRecordDelete = payload => dispatch => {
  dispatch(recordDeleteCancelled(payload))
}

export const setRecords = projects => dispatch => {
  const records = projects.reduce((total, p) => ({ ...total, [p._id]: p.records}), {})
  dispatch(recordsSet(records))
}

export const addRecord = payload => async dispatch => {
  dispatch(recordRequested())

  try {
    const { data } = await httpService.post('records/add', payload)
    dispatch(recordRequestSuccess({ id: payload.projectId, record: data }))
  } catch (e) {
    const data = e?.response?.data
    dispatch(recordRequestFail(data?.errors || { message: e.code }))
    return data || { errors: { message: e.code } }
  }
}

export const deleteRecord = payload => async dispatch => {
  dispatch(recordDeleted(payload))

  try {
    await httpService.delete(`/records/remove/${payload.projectId}/${payload.recordId}`)
  } catch (e) {
    const data = e?.response?.data
    dispatch(recordRequestFail(data?.errors || { message: e.code }))
    return data || { errors: { message: e.code } }
  }
}

export const getRecords = () => state => state.records.entities

export const getProjectRecords = id => state => state.records.entities[id]

export const getRecordLoading = () => state => state.records.loading

export const getRecordsErrors = () => state => state.records.errors
export default recordsReducer