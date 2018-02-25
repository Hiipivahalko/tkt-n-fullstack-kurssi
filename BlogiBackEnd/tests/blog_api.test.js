const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, nonExistingId, blogsInDb, getFirst} = require('./test_helper')

beforeEach(async () => {
    const jo = await Blog.remove({}) 

    const blogsObjects = initialBlogs.map(blog => new Blog(blog))
    //const promiseArray = blogsObjects.map(blog => blog.save())
    await Promise.all(blogsObjects.map(b => b.save()))
    //const noteObjects = initialNotes.map(n => new Note(n))
    //await Promise.all(noteObjects.map(n => n.save()))
})

//testit

describe('API testit', () => {
    test('blogs are returned as json', async () => {
        const testi = await blogsInDb()
        
        const response = await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(testi.length)
    })
      
    test('kokeillaan toimiiko POST metodi', async () => {
        const newBlog = {
            title: "Testi blogi",
            author: "testi",
            url: "https://testiurliiiiiiiiiiiiii.fi/",
            likes: 7
        }
      
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
      
        const response = await api
            .get('/api/blogs')
      
        const contents = response.body.map(r => r.title)
        const pituus = initialBlogs.length + 1
        //console.log(pituus)
        expect(response.body.length).toBe(pituus)
        expect(contents).toContain('Testi blogi')
    })

    test('Jos likes ei ole määritelty asetetaan nolla', async () => {
        const newBlog = {
            title: "Testi blogi",
            author: "testi",
            url: "https://testiurliiiiiiiiiiiiii.fi/"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')    

        const contents = response.body.map(r => r.likes)
        const pituus = initialBlogs.length + 1
        //console.log(pituus)
        expect(response.body.length).toBe(pituus)
        expect(contents).toContain(0)
    })

    test('Title tai url puuttuvat -> status koodi 400', async () => {
    const newBlog = {
        author: "testi",
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    })

    test('Kokeillaan toimiiko delete metodi', async () => {
        const addedBlog = new Blog ({
            title: 'poista mut',
            author: 'RA',
            url: 'ra lähe menee',
            likes: 0
        })

        await addedBlog.save()
        const blogsAtStart = await blogsInDb()

        await api
            .delete(`/api/blogs/${addedBlog._id}`)
            .expect(204)

        const blogsAfterAll = await blogsInDb()

        const contents = blogsAfterAll.map(r => r.title)
        expect(contents).not.toContain(addedBlog.title)
        expect(blogsAfterAll.length).toBe(blogsAtStart.length - 1)
    })

    describe('put test', () => {
        test('lets update blog', async () => {

            const allBlogs = await blogsInDb()

            //const intial = allBlogs[0].likes
            const first = allBlogs[0]

            const update = {
                title: first.title,
                author: first.author,
                url: first.url,
                likes: first.likes + 1
            }

            await api 
                .put(`/api/blogs/${first._id}`)
                .send(update)
                .expect(200)

            const testi = await getFirst()
            expect(testi.likes).toBe(first.likes + 1)
    
        })
    })
    
      
    afterAll(() => {
        server.close()
    })
})


