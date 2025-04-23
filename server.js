import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

// -------------------- Import Routes
import homeRoute from './routes/home.js';
import contactRoute from './routes/contact.js';
import Auth from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 8000;


// -------------------- Middleware
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false}));
app.set('view engine', 'ejs');
app.use(express.json());

// -------------------- Database
mongoose.connect("mongodb://localhost:27017/b2bstore");

mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
    console.log("-----> Database connected");
});

// -------------------- Routes
app.use('/', homeRoute);
app.use('/contact', contactRoute);
app.use('/auth', Auth);

// -------------------- Port
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})