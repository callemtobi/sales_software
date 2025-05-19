import { Router } from "express";
import Company from "../models/Company.js";
import _ from 'lodash';

const router = Router();
let isLoggedIn = true;

// ------------- GET Routes
router.get('/home', async (req, res) => {
    // res.render('indexOne') // Page with login/signup

    try {
        const comp = await Company.find({});
        // console.log('Data retrieved [companies]: ' + comp);
        res.render('home', {isLoggedIn, compArray: comp})
    } catch(err) {
        console.log('-----------> Error occured: ' + err);
        res.status(401).json('There has been an error!!!' + err)
    }

    // res.render('home', {isLoggedIn, coreProduct: 'Soft Drinks', compName: 'Lays', compDesc: 'Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.'});
})

// ------------- POST Routes

export default router;