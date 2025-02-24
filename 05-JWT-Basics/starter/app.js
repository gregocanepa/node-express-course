require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

app.use(express.json());

const mainRouter = require('./routes/main')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use('/api/v1', mainRouter)

// middleware
app.use(express.static('./public'));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
