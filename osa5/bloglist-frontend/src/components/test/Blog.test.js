import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from '../Blog/Blog'

describe('<Blog />', () => {
  let blog
  let blogComponent

  beforeAll(() => {
    blog = {
      title: 'simppeli',
      author: 'tauno',
      likes: '999'
    }
  })

  beforeEach(() => {
    blogComponent = shallow(
      <Blog blog={blog} />
    )
  })

  it('aluksi title ja author näkyy', () => {
    const div = blogComponent.find('.content')
    
    expect(div.text()).toContain(blog.title)
    expect(div.text()).toContain(blog.author)

    !expect(div.text()).toContain(blog.likes)
  })

  it('klikkauksen jälkeen laaja näkymä', () => {
    const div = blogComponent.find('.content')

    div.at(0).simulate('click')
    const clickedDiv = blogComponent.find('.content')

    expect(clickedDiv.text()).toContain(blog.title)
    expect(clickedDiv.text()).toContain(blog.author)
    expect(clickedDiv.text()).toContain(blog.likes)
  })
})