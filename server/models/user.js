// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    score:{type:Number},
    name: { type: String, required: true } ,
    roundData: {
        round1: {
            status: { type: Boolean, default: true },
            time: { type: Number, default: 0 }
        },
        round2: {
            status: { type: Boolean, default: false },
            time: { type: Number, default: 0 }
        },
        round3: {
            status: { type: Boolean, default: false },
            time: { type: Number, default: 0 }
        },
        round4: {
            status: { type: Boolean, default: false },
            time: { type: Number, default: 0 }
        },
        round5: {
            status: { type: Boolean, default: false },
            time: { type: Number, default: 0 }
        }
    }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
