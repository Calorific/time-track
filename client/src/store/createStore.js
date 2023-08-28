import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import userReducer from './user'
import projectsReducer from './projects'
import recordsReducer from './records'

const rootReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  projects: projectsReducer,
  records: recordsReducer
})

export const createStore = () => configureStore({
  reducer: rootReducers
})