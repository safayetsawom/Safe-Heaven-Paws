const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is require"],
    },
    email: {
        type: String,
        required: [true, "email is require"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "password is require"]
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);

// Remove the problematic index if it exists
(async () => {
    try {
        await userModel.collection.dropIndex('username_1');
        console.log('Index dropped successfully');
    } catch (error) {
        // If index doesn't exist, that's fine
        console.log('No index to drop or already dropped');
    }
})();

module.exports = userModel;