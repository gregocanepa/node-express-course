require('dotenv').config

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')


const start = async () => {
    try {
        console.log(process.env.MONGO_URI)
        await connectDB('mongodb+srv://grego:1234@nodeexpressprojects.csznlte.mongodb.net/04-STORE-API?retryWrites=true&w=majority')
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log('Success!!!')
        process.exit(0)
    } catch (err) {
        console.log(err)
    }
}

start()