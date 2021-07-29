import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { notificationReducer } from './reducers/notificationReducer'
import App from './App'
import './index.css'

const store = createStore(notificationReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))