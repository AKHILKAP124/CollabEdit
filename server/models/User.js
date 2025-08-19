import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    picture: {
        type: String,
        required: true,
    },
    isPro: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;