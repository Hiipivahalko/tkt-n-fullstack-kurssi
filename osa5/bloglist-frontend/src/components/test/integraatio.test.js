import React from 'react'
import { mount } from 'enzyme'
import App from '.../App'
import Blog from '..Blog/Blog'
import Login from '../Login'
jest.mock(".../services/blogs")

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App/>)
    })

    it('only login form is rendered', () => {
      app.update()
      expect(app.find(Login)).toHaveLength(1)
      expect(app.find(App.Blogs)).toHaveLength(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'simppeli',
        token: '586934585235',
        name: 'simppeli ukko'
      }
      
      localStorage.setItem('loggedUser', JSON.stringify(user))
      app = mount(<App/>)
    })

    it('all notes are rendered', () => {
      app.update()
      expect(app.find(Login)).toHaveLength(0)
      expect(app.find(App.Blogs)).toHaveLength(1)
    })
  })
})