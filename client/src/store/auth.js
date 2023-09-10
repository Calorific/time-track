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
    authRequestFail: (state, action) => {
      state.errors = action.payload
      state.loading = false
    }
  }
})

const { reducer: authReducer, actions } = authSlice
const { authRequested, authRequestSuccess, authRequestFail } = actions

export const signUp = ({ payload, navigate }) => async dispatch => {
  dispatch(authRequested())

  try {
    const { data } = await authService.register(payload)
    dispatch(authRequestSuccess(true))
    dispatch(addUserData(data))
    navigate('/')
  } catch (e) {
    const data = e?.response?.data
    dispatch(authRequestFail(data?.errors || { message: e.code }))
    return data || { errors: { message: e.code } }
  }
}

export const logIn = ({ payload, navigate, referer }) => async dispatch => {
  dispatch(authRequested())

  try {
    const { data } = await authService.logIn(payload)
    dispatch(authRequestSuccess(true))
    dispatch(addUserData(data))
    setTimeout(() => navigate(referer?.pathname || '/'))
  } catch (e) {
    const data = e?.response?.data
    dispatch(authRequestFail(data?.errors || { message: e.code }))
    return data || { errors: { message: e.code } }
  }
}

export const logOut = navigate => async dispatch => {
  try {
    await authService.logOut()
    dispatch(authRequestSuccess(false))
    dispatch(clearUserData())
    cookieService.deleteAllCookies(['theme'])

    navigate('/auth/login')
  } catch (e) {
    const data = e?.response?.data
    dispatch(authRequestFail(data?.errors || { message: e.code }))
    return data || { errors: { message: e.code } }
  }
}

export const getAuthLoading = () => state => state.auth.loading

export const getAuthErrors = () => state => state.auth.errors

export default authReducer