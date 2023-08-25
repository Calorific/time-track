import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import userReducer from './user'

const rootReducers = combineReducers({
  auth: authReducer,
  user: userReducer
})

export const createStore = () => configureStore({
  reducer: rootReducers,
})