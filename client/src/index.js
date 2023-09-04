import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { createStore } from './store/createStore'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'


const root = ReactDOM.createRoot(document.getElementById('root'))

const store = createStore()

root.render(
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <div className='dark:bg-slate-800 dark:text-stone-200'><Toaster position='top-right' /></div>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
)


