import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {createBrowserHistory} from 'history'


//declaration of routing

const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter history ={history}>
    <App />
    </BrowserRouter>
  </React.StrictMode>
)


