import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch ({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
  
}
export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
      })
  }
}

export const voteAnecdote = ({id, ...anecdote}) => {
  return async dispatch => {
    const anecdoteWithVote = {...anecdote, votes: anecdote.votes+1}
    await anecdoteService.update(id, anecdoteWithVote)
    
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  } 
  
}

const reducer = (state = [], action) => {

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const anecdoteWithVote = {
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes+1
      }
      return state.map(anecdote => anecdote.id === id ? anecdoteWithVote : anecdote)
    }
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    default:
      return state

  }

}

export default reducer