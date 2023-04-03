const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later.'
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id: ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }
  if (err.name === 'ValidationError') {
    console.log(Object.keys(err.errors))
    console.log(Object.values(err.errors))
    customError.msg = Object.values(err.errors).map((item) => item.properties.message).join('. ')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for "${err.keyValue.email}" field, please choose another value.`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
