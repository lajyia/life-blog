const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');


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
mongoose.set('strictQuery', false);

app.use('/post', postRouter);
app.use('/feed', feedRouter);
app.use('/profile', profileRouter);
app.use('/registration', registrationRouter );


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