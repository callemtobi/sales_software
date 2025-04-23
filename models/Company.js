// User Schema
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        img: {data: Buffer, contentType: String, required: true},
        des: {type: String, required: true}
    }
)

const Company = new mongoose.model('Company', companySchema);

export default Company;