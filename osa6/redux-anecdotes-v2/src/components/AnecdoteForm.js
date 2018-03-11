import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.create(content)
  }

   render() {

     return (
      <div>
      <h2>tee uusi</h2>
        <form onSubmit={this.handleSubmit}>
          <input name='anecdote'/>
          <button>luo</button> 
        </form>
      </div>
     )
   }
}

export default connect(null, { create })(AnecdoteForm)
