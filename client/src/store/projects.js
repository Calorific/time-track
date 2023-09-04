import { createSlice } from '@reduxjs/toolkit'
import httpService from '../services/http.service'
import { changeCurrentProject } from './user'
import { clearProjectRecords } from './records'

const initialState = {
  loading: false,
  errors: {},
  entities: []
}

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    projectsSet: (state, action) => {
      state.entities = action.payload
      state.errors = {}
      state.loading = false
    },
    projectsCleared: state => {
      return initialState
    },
    projectRequested: (state) => {
      state.loading = true
      state.errors = {}
    },
    projectRequestSuccess: (state, action) => {
      if (Array.isArray(state.entities))
        state.entities.push(action.payload)
      else
        state.entities = [action.payload]
      state.loading = false
      state.errors = {}
    },
    projectEditSuccess: (state, action) => {
      state.entities[action.payload.projectIdx] = action.payload.project

      state.loading = false
      state.errors = {}
    },
    projectDeleted: (state, action) => {
      state.entities = state.entities?.filter(p => p._id !== action.payload)
    },
    projectRequestFail: (state, action) => {
      state.errors = action.payload
      state.loading = false
    },
  }
})


const { reducer: projectsReducer, actions } = projectSlice
const { projectsSet, projectsCleared, projectRequested, projectRequestSuccess, projectRequestFail, projectDeleted, projectEditSuccess } = actions

export const setProjects = entities => dispatch => {
  const projects = entities.map(p => {
    const { records, ...project} = p
    return project
  })
  dispatch(projectsSet(projects))
}

export const clearProjects = () => dispatch => {
  dispatch(projectsCleared())
}

export const addProject = ({ navigate, payload }) => async dispatch => {
  dispatch(projectRequested())

  try {
    const { data } = await httpService.post('/projects/add', payload)
    dispatch(projectRequestSuccess(data))
    dispatch(changeCurrentProject(data._id))
    navigate('/')
  } catch (e) {
    const data = e?.response?.data
    dispatch(projectRequestFail(data?.errors || { message: e.code }))
    return data || { errors: { message: e.code } }
  }
}

export const editProject = ({ navigate, id, payload }) => async dispatch => {
  dispatch(projectRequested())

  try {
    const { data } = await httpService.post('/projects/edit', { projectId: id, ...payload })
    dispatch(projectEditSuccess(data))
    dispatch(changeCurrentProject(data.project._id))
    navigate('/')
  } catch (e) {
    const data = e?.response?.data
    dispatch(projectRequestFail(data?.errors || { message: e.code }))
    return data || { errors: { message: e.code } }
  }
}

export const deleteProject = projectId => async dispatch => {
  dispatch(projectDeleted(projectId))
  dispatch(clearProjectRecords(projectId))
  try {
    await httpService.delete(`/projects/remove/${projectId}`)
  } catch (e) {
    const data = e?.response?.data
    dispatch(projectRequestFail(data?.errors || { message: e.code }))
    return data || { errors: { message: e.code } }
  }
}

export const getProjectsList = () => state => state.projects.entities || []

export const getProject = id => state => state.projects.entities.find(p => p._id === id)

export const getProjectsLoading = () => state => state.projects.loading

export const getProjectsErrors = () => state => state.projects.errors

export default projectsReducer