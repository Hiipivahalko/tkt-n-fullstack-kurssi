const jwt = require('jsonwebtoken')

const logger = (request, response, next) => {
    if (process.env.NODE_ENV === 'test') {
      return next()
    }
    
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  
  const error = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }



const getTokenFrom = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

const validateToken = (req, res, next) => {
  if (!req.token) {
    res.status(401).send({ error: 'no token' })
  }

  const token = jwt.verify(req.token, process.env.SECRET)
  if (!token.id) {
    res.status(401).send({ error: 'unauthorized token' })
  }
   
  req.token = token
  next()
}

  
  module.exports = {
    logger,
    error,
    getTokenFrom,
    validateToken
  }