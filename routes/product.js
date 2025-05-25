import { Router } from "express";
import Product from "../models/Product.js";
import Company from "../models/Company.js";
import { verifyUser } from "./verify.js";
import multer from "multer";
import _ from "lodash";
import fs from 'fs';
import path from 'path';

const router = Router();

// Multer Configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
}) 
const upload = multer({storage : storage});

// ------------- GET Routes
// Get all products
router.get('/', async (req, res) => {
    try {
        const getProducts = await Product.find({});
        res.render('products', {products: getProducts});
        // return res.status(200).json(getProducts)
    } catch(err) {
        return res.status(400).json(err);
    }
})

// Add, Manage and Delete products
// Add Company
router.route('/add')
    .get(verifyUser, async (req, res) => {        
        try {
            const getProducts = await Product.find({});
            const comp = await Company.find();
            res.render('dash', {products: getProducts, comp: comp});
            // return res.status(200).json(getProducts)
        } catch(err) {
            return res.status(400).json(err);
        }        
    })
    .post(upload.single('prodImage'), async (req, res) => {
        const {prodName, prodDesc, prodPrice, prodStock, categories, prodCompany} = req.body;
        const file = req.file;

        const newProduct = new Product({
            name: prodName, 
            desc: prodDesc, 
            price: prodPrice, 
            stock: prodStock, 
            category: categories, 
            img: {
                imgFileName: file.filename, 
                imgData: {
                    data: file.buffer, 
                    contentType: file.mimetype
                }}
        });

        
        try {
            const createProduct = await newProduct.save();
            if (prodCompany) { 
                const updateCompany = await Company.findByIdAndUpdate(
                    prodCompany, 
                    {$push: {products: createProduct._id}},
                    {new: true}
                );
                console.log(updateCompany.products);
            }
            // return res.status(200).json("Product has been created");
            return res.redirect('/products');
        } catch (err) {
            return res.status(400).json(err);
        }
    });

// Get specific product
router.get('/find/:id', async (req, res) => {
    try {
        const searchProduct = await Product.findById(req.params.id)
        // .populate('company');
        return res.status(200).json(searchProduct);
        // if (!searchProduct) {
        //     return res.status(400).json('Product not found');
        // }
    } catch(err) {
        return res.status(400).json(err);
    }
});

// ------------- POST Routes
// Create a product 
// For Postman
// router.post('/post', upload.single('img'), async (req, res) => {
//     const {name, desc, price, stock, category, } = req.body;
//     const file = req.file;
//     const body = req.body;

//     const newProduct = new Product({name, desc, price, stock, category, img: {imgFileName: file.filename, imgData: {data: file.buffer, contentType: file.mimetype}}});
//     try {
//         const postProduct = await newProduct.save()
//         console.log(postProduct);
//         return res.status(200).json('Producted posted');
//     } catch (err) {
//         console.log('--------> Error: ' + err);
//         return res.status(400).json(err);
//     }
// })
// ------------- DELETE Routes
router.post('/delete/:id', async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        console.log('Product deleted');

        if (!deleteProduct) {
            return res.status(400).json('Product not found');
        }

        if (deleteProduct.img.imgFileName) {
            const imagePath = path.join(process.cwd(), 'uploads', deleteProduct.img.imgFileName);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        res.redirect('/products/add');
    } catch (err) {
        return res.status(400).json(err + "Error deleting product");
    }
});
router.post('/update', async (req, res) => {
    res.status(200).json('Hi');
})

router.get('/receipt', async (req, res) => {
    if (!req.session.cart) {
        return res.redirect('/products');
    }
    res.render('receipt', { cart: req.session.cart });
})

router.post('/checkout', async (req, res) => {
    try {
        // Store cart in session
        req.session.cart = req.body.cart;
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
})

export default router;