const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const User = require('./model/userModel');

dotenv.config();

const userRouter = require('./routes/userRoute');
const viewRouter = require('./routes/viewRoute');

const app = express();

app.set('view engine', 'ejs');

const port = 3000;
const mongodbUrl = 'mongodb://localhost:27017/problem6';

app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(mongodbUrl).then(() => {
    console.log('Success to connect with mongoDB!');
}).catch((error) => {
    console.log(error);
});

app.use('/api/users', userRouter);

app.use('/', viewRouter);

// app.use('/', (req, res, next) => {
//     console.log(req.body);
// })


app.listen(port, () => {
    console.log('Server is running on port ' + port);
});