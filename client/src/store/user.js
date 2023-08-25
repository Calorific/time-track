import { createSlice } from '@reduxjs/toolkit'
import httpService from '../services/http.service'

const initialState = {
  currentUser: null,
  loading: false,
  errors: {}
}


const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequested: (state, action) => {
      state.loading = true
    },
    userRequestSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
    },
    userRequestFailed: (state, action) => {
      state.errors = action.payload
      state.loading = false
    },
    userLoggedOut: state => {
      state.currentUser = null
    }
  }
})

const { reducer: userReducer, actions } = usersSlice
const { userRequested, userRequestSuccess, userRequestFailed, userLoggedOut } = actions

export const clearUserData = () => dispatch => {
  dispatch(userLoggedOut())
}

export const addUserData = payload => dispatch => {
  dispatch(userRequestSuccess(payload))
}

export const loadCurrentUserData = () => async dispatch => {
  dispatch(userRequested())
  try {
    const { data } = await httpService.get('user/data')
    dispatch(userRequestSuccess(data))
  } catch (e) {
    const data = e?.response?.data
    dispatch(userRequestFailed(data?.errors || e.code))
    return data || { errors: { message: e.code } }
  }
}

export const getCurrentUser = () => state => state.user.currentUser

export const getUserErrors = () => state => state.user.errors

export default userReducer