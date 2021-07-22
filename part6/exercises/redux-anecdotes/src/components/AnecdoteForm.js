import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotificationWith } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = async event => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(anecdote)
        props.setNotificationWith(`${anecdote} was created`, 5)
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const ConnectedAnecdoteForm = connect(
    null,
    {createAnecdote, setNotificationWith}
)(AnecdoteForm)

export default ConnectedAnecdoteForm