const jwt = require('jsonwebtoken')
require('dotenv').config();
const {BadRequestError} = require("../errors")

const login = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        throw new BadRequestError('Please provide email and password.')
    }
    const fakeId = new Date().getDate()
    const token = jwt.sign({fakeId, username}, process.env.JWT_SECRET, {expiresIn:'30d'})
    res.status(200).json({msg: 'user created', token: token})
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json(
        {msg: `Hey ${req.user.username}`, secret: `here's your lucky number: ${luckyNumber}`}
    )
}

module.exports = {login, dashboard}