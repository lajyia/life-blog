const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const subscribersRouter = require('./routers/subscribersRouter');


const postRouter = require('./routers/postRouter');
const feedRouter = require('./routers/feedRouter');
const profileRouter = require('./routers/profileRouter');
const registrationRouter = require('./routers/registrationRouter');


const PORT = process.env.PORT || 4001;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

app.use(cors());

app.use(express.json());
app.use('/users', express.static('uploads/users'));
app.use('/posts', express.static('uploads/posts'));
mongoose.set('strictQuery', false);

app.use('/api/post', postRouter);
app.use('/api/feed', feedRouter);
app.use('/api/profile', profileRouter);
app.use('/api/registration', registrationRouter );
app.use('/api/subscribers', subscribersRouter);



const start = async() => {
    try {
        app.listen(PORT, () => console.log('listening to port 4000'));
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cibweps.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
    }
    catch (e) {
        console.log(e);
    }
}

start();