import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { createStore } from './store/createStore'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from "@material-tailwind/react"
import "@fontsource/lato/700.css"
import "@fontsource/roboto/500.css"

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = createStore()

root.render(
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <Toaster position='top-right' />
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
)


