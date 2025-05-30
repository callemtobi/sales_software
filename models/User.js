// User Schema
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {type: String, unique: true, required: true},
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false}
    }
)

const User = new mongoose.model('User', userSchema);

export default User;