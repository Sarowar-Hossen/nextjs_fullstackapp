import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: [true, "please provide a username"],
        unique: [true, "This name is already token"]
    },
    email:{
        type: String,
        required: [true, "Please provide a email"],
        unique: [true, "This email is already used"]
    },
    password:{
        type: String,
        required: [true, "Must be provide a password"]
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User