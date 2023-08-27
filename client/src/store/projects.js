import { createSlice } from '@reduxjs/toolkit'

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
    }
  }
})


const { reducer: projectsReducer, actions } = projectSlice
const { projectsSet, projectsCleared } = actions

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

export const getProjects = () => state => state.projects.entities || []

export const getCurrentProject = id => state => state.projects.entities.find(p => p._id === id)

export default projectsReducer