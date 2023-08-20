import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user'

const rootReducers = combineReducers({
  user: userReducer
})

export const createStore = () => configureStore({
  reducer: rootReducers,
})