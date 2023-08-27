import { createSlice } from '@reduxjs/toolkit'
import httpService from '../services/http.service'
import { clearProjects, setProjects } from './projects'
import { clearRecords, setRecords } from './records'

const initialState = {
  currentUser: null,
  loading: false,
  errors: {}
}


const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequested: (state) => {
      state.loading = true
      state.errors = {}
    },
    userRequestSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.errors = {}
    },
    userRequestFail: (state, action) => {
      state.errors = action.payload
      state.loading = false
    },
    currentProjectChanged: (state, action) => {
      state.currentUser.currentProject = action.payload
    },
    userLoggedOut: state => {
      state.currentUser = null
      state.errors = {}
      state.loading = false
    }
  }
})

const { reducer: userReducer, actions } = usersSlice
const { userRequested, userRequestSuccess, userRequestFail, userLoggedOut, currentProjectChanged } = actions

export const clearUserData = () => dispatch => {
  dispatch(userLoggedOut())
  dispatch(clearProjects())
  dispatch(clearRecords())
}

export const addUserData = payload => dispatch => {
  const { projects, ...user } = payload

  dispatch(userRequestSuccess(user))
  dispatch(setProjects(projects))
  dispatch(setRecords(projects))
}

export const changeCurrentProject = projectId => async dispatch => {
  dispatch(currentProjectChanged(projectId))
  try {
    await httpService.patch('/user', { currentProject: projectId })
  } catch (e) {
    const data = e?.response?.data
    dispatch(userRequestFail(data?.errors || e.code))
    return data || { errors: { message: e.code } }
  }
}


export const loadCurrentUserData = () => async dispatch => {
  dispatch(userRequested())
  try {
    const { data } = await httpService.get('user/data')
    dispatch(addUserData(data))
  } catch (e) {
    const data = e?.response?.data
    dispatch(userRequestFail(data?.errors || e.code))
    return data || { errors: { message: e.code } }
  }
}

export const getCurrentUser = () => state => state.user.currentUser
export const getCurrentProjectId = () => state => state.user.currentUser?.currentProject

export default userReducer