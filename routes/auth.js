import { Router } from "express";
import session from "express-session";

import User from "../models/User.js";
import { verifyUser } from "./verify.js";

import sendWelcomeEmail from '../utils/nodemailer.js'

const router = Router();

// ------------- GET Routes
router.get('/login', (req, res) => {
    res.render('login', {page: "Login", pageRoute: "login"})
    // res.send('Welcome to Home Page');
})
router.get('/register', (req, res) => {
    res.render('login', {page: "Register", pageRoute: "register"})
})

// ------------- POST Routes
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({email: email});
        if (!user) { res.status(401).json('User not found.') }
        else if (user) {
            if (password === user.password) {

                // Set session variable
                req.session.isLoggedIn = true;
                req.session.user = { id: user._id, email: user.email };

                console.log('------> Successfull login');
                res.redirect('/home')
                // res.status(200).json('You are logged in.');
            } else {
                console.log('------> Incorrect password.');
                res.status(401).json('Incorrect password.');
            }
        }
    } catch (err) {
        console.log('-----------> Error occured: ' + err);
    }

})
router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    
    try {
        const userExists = await User.findOne({$or: [{username}, {email}]});
        if (userExists) {
            if (userExists.username === username) {
                console.log('----> User with that username exists.');
                return res.status(401).json('User already exists.');
            }
            if (userExists.email === email) {
                console.log('----> Email already registered');
                return res.status(401).json('Email already registered.');
            }
        }
        // Create new user
        const user = new User({username, email, password});
        await user.save();

        // Send welcome email (don't await to avoid delaying response)
        sendWelcomeEmail(email, username)
            .catch(err => console.error('Email sending error:', err));

        // Set success flash message
        // req.flash('success', 'Registration successful! Please check your email.');

        return res.redirect('/auth/login');        
    } catch (err) {
        console.log('Registration error! ', err);
        return res.status(500).json('Registration failed! Try again.');
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/home');
})

export default router;