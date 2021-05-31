import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const totalAnecdotes = props.anecdotes.length
  const initialVotes = Array(totalAnecdotes).fill(0)

  const [votes, setVotes] = useState(initialVotes)

  const getRandomNumber = (max) => Math.floor(Math.random() * max) 
  const handleClickNext = () => setSelected(getRandomNumber(totalAnecdotes))
  const handleClickVote = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    console.log(newVotes)
    setVotes(newVotes)
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <div>      
        <button onClick = {handleClickNext}>next anecdote</button>
        <button onClick = {handleClickVote}>vote</button>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
