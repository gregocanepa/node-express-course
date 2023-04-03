const User = require('../models/User')
const {UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')
require('dotenv').config

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userID: payload.userID}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
}

module.exports = auth