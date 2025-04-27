// User Schema
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        desc: {type: String, required: true, default: ''},
        price: {type: Number, required: true},
        img: { 
            imgFileName: {type: String},
            imgData: {data: Buffer, contentType: String}
         },
        stock: {type: Number},
        category: {type: Array}
    }
)

const Product = new mongoose.model('Product', productSchema);

export default Product;

// -------------> What req.file contains:
// fieldname:
// originalname:
// encoding:
// mimetype:
// destination:
// filename:    
// path: