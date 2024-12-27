const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is require"]
    },
    email:{
        type: String,
        required: [true, "email is require"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, "password is require"]
    },
}, { timestamps: true })

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;