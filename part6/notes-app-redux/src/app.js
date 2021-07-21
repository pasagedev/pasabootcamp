import NewNote from "./components/newNote"
import Notes from './components/notes'
import VisibilityFilter from "./components/VisibilityFilter"

const App = () => {
    return(
      <div>
        <NewNote />
        <VisibilityFilter />
        <Notes />
      </div>
    )
  }

  export default App

  