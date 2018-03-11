import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image, Menu, Segment } from 'semantic-ui-react'

class Create extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.onCreate('YOU HAVE CREATE NEW')
    this.props.history.push("/")
  }

  render() {
    return(
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' 
              value={this.state.content} 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            author
            <input name='author' 
              value={this.state.author} 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            url for more info
            <input name='info' 
              value={this.state.info} 
              onChange={this.handleChange} 
            />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

export default Create