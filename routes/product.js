import { Router } from "express";
import Product from "../models/Product.js";
import multer from "multer";

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
    res.render('product');
    // try {
    //     const getProducts = await Product.find({});
    //     return res.status(200).json(getProducts)
    // } catch(err) {
    //     return res.status(400).json(err);
    // }
})
// Get specific product
router.get('/find/:id', async (req, res) => {
    try {
        const searchProduct = await Product.findById(req.params.id);
        if (!searchProduct) {
            return res.status(400).json('Product not found');
        }
        return res.status(200).json(searchProduct);
    } catch(err) {
        return res.status(400).json(err);
    }
})

// ------------- POST Routes
// Create a product
router.post('/add', async (req, res) => {
    const {name, desc, price, stock, category} = req.body;
    const newProduct = new Product({name, desc, price, stock, category});
    
    try {
        createProduct = await newProduct.save();
        return res.status(200).json("Product has been created");
    } catch (err) {
        return res.status(400).json(err);
    }
    
})
router.post('/post', upload.single('img'), async (req, res) => {
    const {name, desc, price, stock, category, } = req.body;
    const file = req.file;
    const body = req.body;

    const newProduct = new Product({name, desc, price, stock, category, img: {imgFileName: file.filename, imgData: {data: file.buffer, contentType: file.mimetype}}});

    try {
        const postProduct = await newProduct.save()
        console.log(postProduct);
        return res.status(200).json('Producted posted');
    } catch (err) {
        console.log('--------> Error: ' + err);
        return res.status(400).json(err);
    }
})
// ------------- POST Routes
router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deleteProduct) {
            return res.status(400).json('Product not found');
        }
        return res.status(200).json('Product deleted');
    } catch (err) {
        return res.status(400).json(err);
    }
    
})


export default router;