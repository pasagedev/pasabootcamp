import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { notificationReducer } from './reducers/notificationReducer'
import { blogReducer } from './reducers/blogReducer'
import App from './App'
import './index.css'
import { userReducer } from './reducers/userReducer'
import { usersReducer } from './reducers/usersReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))