
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
      const token = getTokenFrom(request)
      const decodedToken = jwt.verify(token, process.env.SECRET)

      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

      if (body.title === undefined) {
        return response.status(400).json({ error: 'title missing'})
      } else if (body.url === undefined) {
        return response.status(400).json({ error: 'url missing' })
      }


      const user = await User.findById(decodedToken.id)
      const newblog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if (newblog.likes === undefined) {
      newblog.likes = 0
    }

    const savedBlog = await newblog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json( Blog.format(newblog) )
    } catch (exception) {
      if (exception.name === 'JsonWebTokenError' ) {
        response.status(401).json({ error: exception.message })
      } else {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
      }
    }
    
})

blogRouter.delete('/:id',validateToken, async (request, response) => {
  /*try {
    const blogId = req.params.id
    const user = await User.findById(req.token.id)
    
    await Blog.findByIdAndRemove(blogId)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }*/

  const blogId = request.params.id
	const user = await User.findById(request.token.id)

	if (!isUsersBlog(user, blogId)) {
		res.status(401).send({error: 'u can only rmv ur own blogs'})
	}

	try {
		await removeBlogFromUser(user, blogId)
		await Blog.findByIdAndRemove(blogId)
		res.status(204).end()
	} catch (exception) {
		res.status(400).send({error: 'malformatted id'})
	}
  

})

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

const addBlogToUser = async (user, blog) => {
	user.blogs = user.blogs.concat(blog)
	await user.save()
}

const isUsersBlog = (user, blogId) => {
	return 1 >= user.blogs.reduce((found, blog) =>
		blog._id === blogId ? found + 1 : found + 0 , 0)
}

const removeBlogFromUser = async (user, blogId) => {
	user.blogs = user.blogs.filter(blog => blog.id !== blogId)
	await user.save()
}

module.exports = blogRouter


