import anecdoteReducer from './reducers/anecdoteReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import { notificacionReducer } from './reducers/notificationReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificacionReducer
})

export const store = createStore(
    reducer,
    composeWithDevTools()
    )

console.log(store.getState())
  