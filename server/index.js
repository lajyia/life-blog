const express = require('express');
const app = express();
const PORT = 4000;

const mongoose = require('mongoose');

const postRouter = require('./routers/postRouter');
const feedRouter = require('./routers/feedRouter');
const profileRouter = require('./routers/profileRouter');
const registrationRouter = require('./routers/registrationRouter');

app.use(express.json());
mongoose.set('strictQuery', false);


app.use('/post', postRouter);
app.use('/feed', feedRouter);
app.use('/profile', profileRouter);
app.use('/registration', registrationRouter );


const start = async() => {
    try {
        app.listen(PORT, () => {
            console.log('listening to port 4000');
        });
        await mongoose.connect('mongodb+srv://qwerty_123:qwerty_123@cluster0.cibweps.mongodb.net/life-blog?retryWrites=true&w=majority')
        
    }
    catch (e) {
        console.log(e);
    }
}

start();