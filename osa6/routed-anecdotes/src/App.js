import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image, Menu, Segment } from 'semantic-ui-react'
import MainMenu from './components/menu'
import SingleAnecdote from './components/singe'
import Notification from './components/notification'
import Footer from './components/footer'
import About from './components/about'
import Create from './components/create'
import AnecdoteList from './components/anecdoteList'




class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setMessage('added new')
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ 
      anecdotes 
    })
  }

  setMessage = (notification) => {
    this.setState({ 
      notification 
    })
    setTimeout(() => this.clearMessage(), 10000)
  }

  clearMessage = () => {
    this.setState({ 
      notification: '' 
    })
  }

  render() {
    return (
      <div>
        <Router>
          <Container>
            <h1>Software anecdotes</h1>
              <MainMenu />
              <Notification notification={this.state.notification} />
              <Route exact path="/" render={() => 
                <AnecdoteList anecdotes={this.state.anecdotes} />} 
              />
              <Route exact path="/create" render={({history}) => 
                <Create history={history} addNew={this.addNew} onCreate={this.setMessage} />}
              />
              <Route exact path="/anecdotes/:id" render={({match}) => 
                <SingleAnecdote anecdote={this.anecdoteById(match.params.id)} />} 
              />
              <Route exact path="/about" render={() => 
                <About />} 
              />  
          </Container>
        </Router>
        <Container textAlign='justified'>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default App;
