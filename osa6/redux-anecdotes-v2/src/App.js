import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { initAnecdotes } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { Container } from 'semantic-ui-react'

class App extends React.Component {
  componentDidMount () {
    this.props.initAnecdotes()
  }

  render() {

    return (
      <div>
        <h1>Anecdotes</h1>
        <Filter/>
        <Notification/>
        <AnecdoteList/>
        <AnecdoteForm/>
      </div>
    )
  }
}

export default connect (null, { initAnecdotes })(App)