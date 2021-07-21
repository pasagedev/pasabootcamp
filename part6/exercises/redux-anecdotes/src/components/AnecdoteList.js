import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationWith, removeNotification } from '../reducers/notificationReducer'

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
    const anecdotes = useSelector(({filter, anecdotes}) => {
        return filter === null
            ? anecdotes
            : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())) 
    })
    const sortedAnecdotes = anecdotes.sort((an1, an2) => an2.votes - an1.votes)
    const dispatch = useDispatch()

    const vote = ({id, content}) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotificationWith(`you voted ${content}`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
        }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
            <Anecdote 
                key={anecdote.id} 
                anecdote={anecdote} 
                handleClick = {() => vote(anecdote)}/>
            )}
        </div>
      )
}

export default AnecdoteList