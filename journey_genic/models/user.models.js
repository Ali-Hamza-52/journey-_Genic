import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 256
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    profileImage: {
        type: String,
        default: undefined,
    },
    phoneNumber: {
        type: String,
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    }
},
    { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;