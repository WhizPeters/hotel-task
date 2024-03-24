import mongoose from "mongoose";

const adminSchema=mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    }
})

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;