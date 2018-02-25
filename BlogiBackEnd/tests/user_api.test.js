const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { usersInDb, intialUsers } = require('./test_helper')

beforeEach(async () => {
    await User.remove({})
    const users = intialUsers.map(user => new User(user))
    await Promise.all(users.map(u => u.save()))
    //Promise.all(blogsObjects.map(b => b.save()))
})

describe('user api tests', () => {
    test('let see that there can be only one same username in db', async () => {
        const userAtStart = await usersInDb()

        const newUser = {
            username: 'ossi',
            name: 'juppi ukko',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'username must be unique'})

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(userAtStart.length)
    })

    test('password must be at least lenght of 3', async () => {
        const userAtStart = await usersInDb()

        const newUser = {
            username: 'joulupukki',
            name: 'juppi ukko',
            password: 'jo'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'password must be atleast lenght of 3'})

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(userAtStart.length)
    })
})

afterAll(() => {
    server.close()
})