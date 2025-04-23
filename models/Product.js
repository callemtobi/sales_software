// User Schema
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        desc: {type: String, required: true},
        price: {type: Number, required: true},
        img: {data: Buffer, contentType: String, required: true},
        Stock: {type: String, required: true},
        category: {type: Array}
    }
)

const Product = new mongoose.model('Product', productSchema);

export default Product;