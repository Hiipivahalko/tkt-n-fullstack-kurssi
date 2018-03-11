import anecdoteService from '../services/anecdotes'
import { notify } from '../reducers/notificationReducer'



const anecdoteReducer = (store = [], action) => {

  if (action.type==='VOTE') {

    const justVoted = store.find(a => a.id === action.id)
    const previous = store.filter(a => a.id !== action.id)

    return [...previous, { ...justVoted, votes: justVoted.votes+1} ]
    
  } else if (action.type === 'CREATE') {

    return [...store, {...action.data}]

  } else if (action.type === 'INIT') {
    return action.anecdotes
  }
  return store
}

export const create = (content) => {
  return async (dispatch) => {
    const response = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: response  
    })

    dispatch({
      type: 'NOTIFY',
      message: `u created ${response.content}`
    })

    setTimeout(() => dispatch({
      type: 'CLEAR'
    }), 4000)  
  }
}



export const vote = (anecdote) => {

  return async (dispatch) => {
    const response = await anecdoteService.vote(anecdote)

    dispatch({
      type: 'VOTE',
      id: response.id  
    })

    dispatch({
      type: 'NOTIFY',
      message: `u voted anecote: ${response.content}`
    })

    setTimeout(() => dispatch({
      type: 'CLEAR'
    }), 4000)
  }
}



export const initAnecdotes = () => {

  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    
    dispatch({
      type: 'INIT',
      anecdotes
    })
  }
}

export default anecdoteReducer