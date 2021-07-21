import reducer from './reducers/anecdoteReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'


export const store = createStore(
    reducer,
    composeWithDevTools()
    )
  