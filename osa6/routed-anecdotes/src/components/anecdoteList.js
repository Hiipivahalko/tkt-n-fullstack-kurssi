import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image, Menu, Segment } from 'semantic-ui-react'



const AnecdoteList = ({ anecdotes }) => (
  <Table color='inverted black'>
    <Table.Header>Anecdotes</Table.Header>
    <Table.Body>
      {anecdotes.map(anecdote => 
        <Table.Row key={anecdote.id}>
          <Table.Cell>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </Table.Cell>
        </Table.Row>)}
    </Table.Body>  
  </Table>
)

export default AnecdoteList