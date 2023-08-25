import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import cookieService from '../services/cookie.service'
import { addUserData, clearUserData } from './user'

const initialState = {
  loading: false,
  errors: {},
  isLoggedIn: false
}

const keepLoggedIn = cookieService.getKeepLoggedIn() && cookieService.getAccessToken()

if (keepLoggedIn) {
  initialState.isLoggedIn = true
  initialState.loading = true
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequested: (state) => {
      state.errors = {}
      state.loading = true
    },
    authRequestSuccess: (state, action) => {
      state.isLoggedIn = action.payload
      state.loading = false
      state.errors = {}
    },
    authRequestFailed: (state, action) => {
      state.errors = action.payload
      state.loading = false
    }
  }
})

const { reducer: authReducer, actions } = authSlice
const { authRequested, authRequestSuccess, authRequestFailed } = actions

export const signUp = ({ payload, navigate }) => async dispatch => {
  dispatch(authRequested())
  try {
    const { data } = await authService.register(payload)
    dispatch(authRequestSuccess(true))
    dispatch(addUserData(data))
    navigate('/')
  } catch (e) {
    const data = e?.response?.data
    dispatch(authRequestFailed(data?.errors || e.code))
    return data || { errors: { message: e.code } }
  }
}

export const logIn = ({ payload, navigate }) => async dispatch => {
  dispatch(authRequested())
  try {
    const { data } = await authService.logIn(payload)
    dispatch(authRequestSuccess(true))
    dispatch(addUserData(data))
    navigate('/')
  } catch (e) {
    const data = e?.response?.data
    dispatch(authRequestFailed(data?.errors || e.code))
    return data || { errors: { message: e.code } }
  }
}

export const logOut = navigate => async dispatch => {
  try {
    await authService.logOut()
    dispatch(authRequestSuccess(false))
    dispatch(clearUserData())
    navigate('/auth/login')
  } catch (e) {
    const data = e?.response?.data
    dispatch(authRequestFailed(data?.errors || e.code))
    return data || { errors: { message: e.code } }
  }
}

export const getAuthLoading = () => state => state.auth.loading

export default authReducer