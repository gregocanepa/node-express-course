const jwt = require('jsonwebtoken')
require('dotenv').config();
const {UnauthenticatedError} = require("../errors")

const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided')
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {fakeId, username} = decoded
        req.user = {fakeId, username}
        next()
    } catch(error) {
        throw new UnauthenticatedError('No token provided')
    }
}

module.exports = authenticationMiddleware