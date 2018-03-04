import React from 'react'
import Blog from './components/Blog/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
//import './index.css'
import Login from './components/Login'
import NewBlog from './components/newBlog'
import Togglable from './components/Togglable'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      notification: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggetUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggetUserJSON) {
      const user = JSON.parse(loggetUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  } 

  login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ 
        username:'',
        password:'',
        user
      })
      console.log('onnistuit')
      this.setState({ notification: 'login succecful'})
    } catch (exception) {
      this.setState({ notification: 'käyttäjätunnus tai salasana väärin'})
    }
    setTimeout(() => {
      this.setState({ notification: null })
    }, 3000)
    console.log('login in with', this.state.username, this.state.password)
  }

  addBlog = async (event) => {
    event.preventDefault()

    try {
      const blogObject = {
        title: this.state.newTitle,
        author: this.state.newAuthor,
        url: this.state.newUrl
      }
      console.log(blogObject.title)
      console.log(blogObject.author)
      console.log(blogObject.url)
      const newBlog = await blogService.create(blogObject)
      console.log(newBlog)
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        newTitle: '',
        newAuthor: '',
        newUrl: '',
      })
      this.setState({ notification: `new blog '${blogObject.title}' by ${blogObject.author} added`})
    } catch (exception) {
      console.log('you failed')
      this.setState({ notification: 'your new blog launch failed'})
    }

    setTimeout(() => {
      this.setState({ notification: null })
    }, 3000)
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  removeUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ user: null })

    this.setState({ notification: 'logget out' })

      setTimeout(() => {
        this.setState({ notification: null })
      }, 3000)
  }

  giveBlogOneLike = async (event) => {
    event.preventDefault()
    const blogi = JSON.parse(event.target.value)
    blogi.likes = blogi.likes + 1

    try {
      const update = await blogService.update(blogi)

      this.setState({ 
        notification: 'you add like',
        blogs: this.state.blogs.map(blog => blog._id !== update._id ? blog : update)
      })
      

    } catch (exception) {
      this.setState({ notification: 'update did not work' })
    }
    setTimeout(() => {
      this.setState({ notification: null })
    }, 3000)
  }

  /*deleteBlog = async (event) => {
    event.preventDefault()
    
    const blogi = JSON.parse(event.target.value)

    try {
      await blogService.remove(blogi)

      this.setState({
        blogs: this.state.blogs.filter(blog => blog._id !== blogi._id),
        notification: 'blog revomed'
      })
    } catch (exception) {
      this.setState({ notification: 'removed failed'})
    }

    setTimeout(() => {
      this.setState({ notification: null })
    }, 3000)
  }*/

  deleteBlog = async (event) => {
    event.preventDefault()
    const removeBlog = JSON.parse(event.target.value)
    try {
      await blogService.remove(removeBlog)

      //this.setNotification('blog removed')
      this.setState({
        blogs: this.state.blogs.filter( b => 
          b.id !== removeBlog.id),
        notification: 'delte work'
      })
    } catch (e) {
      //this.setNotification('error happened during blog removal')
      this.setState({ notification: 'delete not work'})
    } 

    setTimeout(() => {
      this.setState({ notification: null })
    }, 3000)
  }

  render() {

    const logout = () => {
      
      return (
        <div>
          <p>
          {this.state.user.name} logged in <button onClick={this.removeUser}>logout</button>
          </p>
        </div>
      )
    }

    const sortedBlogs = this.state.blogs.sort((a, b) => b.likes - a.likes) 

    return (
      <div>

        {this.state.user === null ?
          <Login 
            handleSubmit = {this.login}
            handleChange = {this.handleLoginFieldChange}
            username = {this.state.username}
            password = {this.state.password}
          />/*loginForm()*/ :
          <div>
            <h2>blogs</h2>
            <Notification message={this.state.notification}/>
            {logout()}
            <Togglable buttonLabel="create">
              <NewBlog
                handleSubmit={this.addBlog}
                handleChange={this.handleLoginFieldChange}
                title={this.state.newTitle}
                author={this.state.newAuthor}
                url={this.state.newUrl}
              />
            </Togglable>
            {sortedBlogs.map(blogi => 
              <Blog 
                key={blogi._id} 
                blog={blogi}
                doLike={this.giveBlogOneLike}
                deleteThis={this.deleteBlog}
                author={this.state.user}
              />
            )}
          </div>
        }

      </div>
    )
  }
}

export default App;
