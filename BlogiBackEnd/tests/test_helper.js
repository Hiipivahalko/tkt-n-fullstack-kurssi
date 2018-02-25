const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "testi 1",
      author: "matti meikalainen",
      url: "https://testi1.com/",
      likes: 1,
    },
    {
        title: "testi 2",
        author: "maija meikalainen",
        url: "https://testi2.com/",
        likes: 2,
    },
    {
        title: "testi 3",
        author: "tero meikalainen",
        url: "https://testi3.com/",
        likes: 3,
    }, 
    {
        title: "testi 4",
        author: "arto meikalainen",
        url: "https://testi4.com/",
        likes: 1000,
    }
]

const intialUsers = [
    {
        username: 'ossi',
        name: 'houhouhou',
        password: 'salasana',
        adult: true
    },
    {
        username: 'antwan',
        name: 'anu',
        password: 'salasana2',
        adult: true
    },
    {
        username: 'sekopääallu',
        name: 'ale',
        password: 'salasana3',
        adult: true
    },
    {
        username: 'yungRick',
        name: 'rikupoika',
        password: 'salasass',
        adult: false
    }
]

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs
}

const getFirst = async () => {
    const first = await blogsInDb()
    return first[0]
}

const usersInDb = async () => {
    const users = await User.find({})
    return users
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    getFirst,
    usersInDb,
    intialUsers
}



