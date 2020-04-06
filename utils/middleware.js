const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('method:', request.method)
  logger.info('path:', request.path)
  logger.info('body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknownEndpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  //Broken somehow with error.kind
  if (error.name === 'CastError' && error.path === '_id') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
