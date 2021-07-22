import { applyMiddleware, combineReducers, createStore } from "redux"
import filterReducer, {filterChange} from "./reducers/filterReducer"
import noteReducer, {createNote} from "./reducers/noteReducer"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer
  })
  
const store = createStore(
    reducer,
    composeWithDevTools(
    applyMiddleware(thunk)
    )
)

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

export default store
  