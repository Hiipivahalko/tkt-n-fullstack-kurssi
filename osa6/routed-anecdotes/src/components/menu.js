import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image, Menu, Segment } from 'semantic-ui-react'

const MainMenu = () => {
  const style = {
    width: 300,
    border: 25,
    padding: 25,
    margin: 25
  }
  return (
  <Segment inverted>
    <Menu inverted pointing secondary>
      <Menu.Item>
        <NavLink to="/">home</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/create">create</NavLink> 
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/about">about</NavLink>
      </Menu.Item>
    </Menu>
  </Segment>
  )
}

export default MainMenu