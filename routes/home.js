import { Router } from "express";

const router = Router();

// ------------- GET Routes
router.get('/home', (req, res) => {
    res.render('home')
    // res.send('Welcome to Home Page');
})

// ------------- POST Routes

export default router;