import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import noteReducer from './reducers/noteReducer';
import App from './app'
import filterReducer from './reducers/filterReducer';
import { filterChange } from './reducers/filterReducer';
import { createNote } from './reducers/noteReducer';

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
  )

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)




