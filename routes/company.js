import { Router } from "express";
import _ from 'lodash';
import Product from "../models/Product.js";
import Company from "../models/Company.js";

const router = Router();

// ------------- GET Routes
router.get('/', async (req, res) => {

    // try{
    //     const comp = await Company.findOne({name: companyName});

    //     if (comp) {
    //         res.render('company', {companyName: companyName || "Company Name"})
    //         // res.status(200).json(comp);
    //     } else {res.status(400).json('Company not found')}
    // } catch(err) {
    //     console.log('-----------> Error occured: ' + err);
    //     res.status(401).json('There has been an error!!!' + err)
    // }

    res.redirect('/products');
})

router.get('/:compID', async (req, res) => {
    
    const companyID = req.params.compID;
    console.log(`Company ID: ${companyID}`);
    
    try{
        const comp = await Company.findById(companyID)
        .populate('products');

        if (comp) {
            res.render('company', {comp: comp, products: comp.products});
            // res.status(200).json(comp);
        } else {res.status(404).json('Company not found')}
    } catch(err) {
        console.log('-----------> Error occured: ' + err);
        res.status(500).json('There has been an error!!!' + err)
    }
})

// ------------- POST Routes
// router.route('/add')
//     .get(async (req, res) => {
//         res.render('companyDash');
//     })
    // .post(async (req, res) => {
        // const {compName, compDesc, compImg, coreProd } = req.body;

        // const newCompany = new Company({compName, compDesc, compImg, coreProd});

        // try {
            // const addCompany = await newCompany.save();
        //     res.status(200).json(addCompany);
        // } catch(err) {
        //     res.status(404).json(err);
        // }
    // })


export default router;