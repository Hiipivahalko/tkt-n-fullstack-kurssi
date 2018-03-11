import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes
          .sort((a,b) => b.votes - a.votes)
          .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              on {anecdote.votes} ääntä 
              <button onClick={() => 
                this.props.vote(anecdote)
              }>
                äänestä
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const AnecdotesToShow = (anecdotes, filter) => {

  if (filter === '') return anecdotes
  return anecdotes.filter(anet => anet.content.includes(filter))

}

export default connect(
  (state) => ({
    anecdotes: AnecdotesToShow(state.anecdotes, state.filter)
  }), { vote }
)(AnecdoteList)
