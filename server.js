import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import session from 'express-session';
import multer from 'multer';

// -------------------- Import Routes
import homeRoute from './routes/home.js';
import contactRoute from './routes/contact.js';
import Auth from './routes/auth.js';
import productRoute from './routes/product.js';
import companyRoute from './routes/company.js';
import adminRoute from './routes/dash.js';

const app = express();
const PORT = process.env.PORT || 8000;


// -------------------- Middleware
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.use(express.json());

// Express session middleware --------- [1]
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}))

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    next();
});

// -------------------- Database
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
    console.log("-----> Database connected");
});



// -------------------- Routes
app.get('/', async (req, res) => {
    res.send(`
        <h2>Routes:</h2>
        <h3>/home</h3>
        <h3>/auth</h3>
        <h3>/contact</h3>
        <h3>/products</h3>
        <h3>/company</h3>
        `)
})
app.use('/', homeRoute);
app.use('/auth', Auth);
app.use('/contact', contactRoute);
app.use('/products', productRoute);
app.use('/company', companyRoute);
app.use('/admin', adminRoute);

// -------------------- Port
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})