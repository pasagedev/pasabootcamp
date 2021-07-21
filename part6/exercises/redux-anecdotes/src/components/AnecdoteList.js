import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'

const Anecdote = ({anecdote, handleClick}) => {
    return (
        <div>
            {anecdote.content}
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const sortedAnecdotes = anecdotes.sort((an1, an2) => an2.votes - an1.votes)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
            <Anecdote 
                key={anecdote.id} 
                anecdote={anecdote} 
                handleClick = {() => vote(anecdote.id)}/>
            )}
        </div>
      )
}

export default AnecdoteList