import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { createStore } from './store/createStore'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = createStore()

root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
)


