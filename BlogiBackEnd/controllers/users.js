const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')

userRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs')
    response.json(users.map(User.format))
})

userRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const existingUser = await User.find({username: body.username})
        if (existingUser.length>0) {
            return response.status(400).json({ error: 'username must be unique' })
        } else if (body.password.length < 3) {
            return response.status(400).json({ error: 'password must be atleast lenght of 3'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            adult: body.adult
        })

        const savedUser = await user.save()

        response.json(User.format(savedUser))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong'})
    }


})

module.exports = userRouter
