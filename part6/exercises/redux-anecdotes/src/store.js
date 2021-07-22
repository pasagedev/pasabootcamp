import anecdoteReducer from './reducers/anecdoteReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { notificacionReducer } from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificacionReducer,
    filter: filterReducer
})

export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
    )

console.log(store.getState())
  