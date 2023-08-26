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
    currentProjectChanged: (state, action) => {
      state.currentUser.currentProject = action.payload
    },
    userLoggedOut: state => {
      state.currentUser = null
    }
  }
})

const { reducer: userReducer, actions } = usersSlice
const { userRequested, userRequestSuccess, userRequestFailed, userLoggedOut, currentProjectChanged } = actions

export const clearUserData = () => dispatch => {
  dispatch(userLoggedOut())
}

export const changeCurrentProject = projectId => async dispatch => {
  dispatch(currentProjectChanged(projectId))
  await httpService.patch('/user', { currentProject: projectId })
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

export const getUserProjects = () => state => state.user.currentUser?.projects
export const getCurrentProject = () => state => state.user.currentUser?.projects?.find(p =>
    p._id === state.user.currentUser.currentProject)

export default userReducer