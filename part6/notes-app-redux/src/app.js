import { useEffect } from "react"
import { useDispatch } from "react-redux"
import NewNote from "./components/newNote"
import Notes from './components/notes'
import VisibilityFilter from "./components/VisibilityFilter"
import { initializeNotes } from "./reducers/noteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(initializeNotes())
  }, [dispatch])

  
    return(
      <div>
        <NewNote />
        <VisibilityFilter />
        <Notes />
      </div>
    )
  }

  export default App

  