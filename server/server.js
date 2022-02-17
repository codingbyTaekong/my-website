const express =require('express');
const app = express();
const defaultRouter = require('./Router/default');

app.use('/api', defaultRouter);

const port = 5000;

app.listen(port, ()=> console.log(`current Port : ${port}`))