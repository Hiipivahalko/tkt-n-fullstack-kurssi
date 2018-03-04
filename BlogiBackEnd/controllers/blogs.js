
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const validateToken = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})
  response.json(blogs)
})


  
blogRouter.post('/', async (request, response) => {
  const body = request.body

  try {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if(body.title === undefined || body.title.length < 1) {
    return response.status(400).json({ error: "title missing"})
  } else if (body.url === undefined || body.url.length < 1) {
    return response.status(400).json({ error: "url missing"})
  }

  if(body.likes === undefined) {
    body.likes = 0
  }

  const user = await User.findById(decodedToken.id)
  console.log(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(Blog.format(savedBlog))
} catch(exception) {
  if (exception.name === 'JsonWebTokenError' ) {
    response.status(401).json({ error: exception.message })
  } else {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
}
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  console.log(blog.author + " koooooooooooooooooooooookkkkkkkkk")

  try {

    if (blog.author === '') {
      await blog.remove()
      return response.status(204).end()
    }

    

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    console.log(blog.user, decodedToken.id)

    if (decodedToken.id.toString() !== blog.user.toString()) {
      return response.status(400).json({ error: 'only creator can delete a blog' })
    }

    if (blog) {
      await blog.remove()
    }
    
    response.status(204).end()
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

const isUsersBlog = (user, blogId) => {
  return 1 >= user.blogs.reduce((found, blog) =>
    blog._id === blogId ? found + 1 : found + 0 , 0)
}

const removeBlogFromUser = async (user, blogId) => {
  user.blogs = user.blogs.filter(blog => blog.id !== blogId)
  await user.save()
}

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  //console.log(body)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updateB = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updateB)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})



module.exports = blogRouter


