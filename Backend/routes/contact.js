import { Router } from "express";

const router = Router();

// ------------- GET Routes
router.get('/', (req, res) => {
    res.render('contact')
    // res.send('Welcome to Home Page');
})

// ------------- POST Routes

export default router;