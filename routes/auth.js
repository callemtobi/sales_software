import { Router } from "express";
import session from "express-session";

import User from "../models/User.js";
import { verifyUser } from "./verify.js";

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
    const user = new User({username, email, password});

    try {
        const userExists = await User.findOne({$or: [{username: user.username}, {email: user.email}]});

        if(!userExists) {
            await User.insertOne(user);
            console.log('----> User registered');
            // return res.status(200).json('You have been registered.');
            return res.redirect('/auth/login');
        } else if (userExists.username === user.username) {
            console.log('----> User with that username exists.');
            return res.status(401).json('User with that username exists.');
            // return res.redirect('/auth/register');
        } else if (userExists.email === user.email) {
            console.log('----> User with that email exists.');
            return res.status(401).json('User with that email exists.');
            // return res.redirect('/auth/register');
        } else { 
            console.log('-------->Error')
            // return res.status(401).json('Error has been occured.');
            // return res.redirect('/auth/register');
        }
    } catch (err) {
        console.log('Error occured: ' + err);
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/home');
})

export default router;