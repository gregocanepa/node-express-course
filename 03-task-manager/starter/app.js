const express = require('express');
const connectDB = require('./db/connect')
require('dotenv').config()
const tasksRouter = require('./routes/tasks');
const notFound = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

app = express()
app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/tasks', tasksRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
    } catch (error) {
        console.log(error)
    }
}

app.listen(3000, () => {
    console.log('server is listening on port 3000')
})

start()