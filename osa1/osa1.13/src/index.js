import React from 'react'
import ReactDOM from 'react-dom'

    
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      vote: 0
    }
  }

  

    clickHandler = (amount) => {
      return () => {
        this.setState({
            selected: amount,
            vote: votes[amount]
        })
      }
    }

  clickVote = (index) => {
    
    return () => {
      votes[this.state.selected] = votes[this.state.selected] + 1
        this.setState({
          vote: votes[this.state.selected]
        })
    }
  }

  render() {
    const random = Math.floor(Math.random() * Math.floor(anecdotes.length))
    const result = random
    console.log(this.state.selected)
    console.log(result)

    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p>has {this.state.vote} votes</p>
        <button onClick={this.clickVote(result)}>vote</button>
        <button onClick={this.clickHandler(result)}>
        next anecdote
        </button>
      </div>
      
    )
  }
}

const votes = [0,0,0,0,0,0]

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)