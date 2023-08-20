import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'


const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  auth: null
}

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authRequested: (state, action) => {
      state.error = null
      state.loading = true
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
      state.loading = false
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  }
})

const { reducer: userReducer, actions } = usersSlice
const { authRequested, authRequestSuccess, authRequestFailed } = actions

export const signUp = ({ payload, navigate }) => async dispatch => {
  dispatch(authRequested())
  try {
    const data = await authService.register(payload)
    dispatch(authRequestSuccess({ userId: payload.userId }))
    localStorage.setItem('data', JSON.stringify(data))
    navigate('/')
  } catch (e) {
    dispatch(authRequestFailed(e))
  }
}

export const getAuthLoading = () => state => state.user.loading

export default userReducer