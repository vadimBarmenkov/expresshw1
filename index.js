const express = require('express')
const { v4: uuid } = require('uuid')

const logger = require('./middleware/logger');
const error404 = require('./middleware/err-404');
const indexRouter = require('./routes/index');

const app = express();

app.use(logger);

app.use('/public', )
app.use('/', indexRouter);


app.use(error404);


const PORT = process.env.PORT || 3000
app.listen(PORT)