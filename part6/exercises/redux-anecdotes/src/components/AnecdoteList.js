import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotificationWith } from '../reducers/notificationReducer'

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

const AnecdoteList = (props) => {
    const sortedAnecdotes = props.anecdotes.sort((an1, an2) => an2.votes - an1.votes)

    const vote = (anecdote) => {
        props.voteAnecdote(anecdote)
        props.setNotificationWith(`you voted ${anecdote.content}`, 5)
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

const mapStateToProps = ({filter, anecdotes}) => {
    return {
        anecdotes: (filter === null
            ? anecdotes
            : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())))
        }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotificationWith,    
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList