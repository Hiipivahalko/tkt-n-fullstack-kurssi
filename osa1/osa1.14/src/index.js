import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: anecdotes.map(anecdote => 0)
    }
  }

  

    clickHandler = () => {
      return () => {
        const random = Math.floor(Math.random() * Math.floor(anecdotes.length))
        const result = random
        this.setState({
            selected: result
        })
      }
    }

  clickVote = (index) => {
    
    return () => {
        let newVotes = this.state.votes.slice();
        newVotes[index] = this.state.votes[index] + 1;

        this.setState({
            votes: newVotes
        })
    }
  }

  hasNoVotes = () => {
      for (let i = 0; i < this.state.votes.length; i++) {
          if (this.state.votes[i] > 0) {
              return false;
          }
      }

      return true;
  }

  mostVotes = () => {
      const { votes } = this.state;

      let maxIndex = 0;
      let max = votes[0];

      for (let i = 0; i < votes.length; i++) {
          if (votes[i] > max) {
              maxIndex = i;
              max = votes[i];
          }
      }

      return maxIndex;
  }

  render() {
    

    let showVotes = null;

    if (this.hasNoVotes()) {
      showVotes = <span>no votes yet</span>
    } else {
      showVotes = <span>
        {this.props.anecdotes[this.mostVotes()]}<br />
        ({this.state.votes[this.mostVotes()]} votes)
      </span>
    }

    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p>({this.state.votes[this.state.selected]} votes)</p>
        <button onClick={this.clickVote(this.state.selected)}>vote</button>
        <button onClick={this.clickHandler()}>
        next anecdote
        </button>
        
        <h2>anecdote with most votes:</h2>
        {showVotes}

      </div>
      
    )
  }
}

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