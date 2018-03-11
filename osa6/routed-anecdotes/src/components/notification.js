import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image, Menu, Segment } from 'semantic-ui-react'

const Notification = ({ notification }) => {
  const style = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 20
  }

  return (
    <div style={style}>
      <h2>{notification}</h2>
    </div>
  )
}

export default Notification