// User Schema
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        coreProduct: {type: String, required: true},
        desc: {type: String, required: true},
        img: {type: String, required: true},
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }]
    }
)

const Company = new mongoose.model('Company', companySchema);

export default Company;