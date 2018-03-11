import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image, Menu, Segment } from 'semantic-ui-react'

const SingleAnecdote = ({ anecdote }) => {
  return (

  <div>
    <p>{anecdote.content}</p>
  </div>
  )
  
}

export default SingleAnecdote