const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sessionSchema = new Schema({
    messages: { type: Array, default: [] },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date, default: null }
}, { timestamps: true });

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    mobile: { type: Number, required: true },
    sessions: [sessionSchema]
});

module.exports = mongoose.model('user', userSchema);