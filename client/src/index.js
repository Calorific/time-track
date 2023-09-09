import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { createStore } from './store/createStore'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-tailwind/react'
import '@fontsource/inter'
import '@fontsource/lato/700.css'
import '@fontsource/roboto/500.css'


const root = ReactDOM.createRoot(document.getElementById('root'))

const store = createStore()

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)


