const jwt = require('jsonwebtoken');
const { findOneAndUpdate } = require('../models/user.model');

const User = require('../models/user.model');

const createUser = async ({ name, email, mobile, startedAt }) => {
    const user = new User({
        name,
        email,
        mobile,
        sessions: [{ messages: [], startedAt }]
    });
    return await user.save();
}

const getUser = async ({ name, email, mobile }) => {
    const user = await User.findOne({ name, email, mobile });
    return user;
}


const createNewSession = (userId, startedAt) => {
    const user = User.findOneAndUpdate({ _id: userId }, { $push: { sessions: { messages: [], startedAt } } }, { new: true });
    return user;

}

const generateAuthToken = async (user) => {
    const iat = user.sessions[user.sessions.length - 1]['startedAt'];
    const sessionId = user.sessions[user.sessions.length - 1]['_id']
    const accessTokenExpires =
        Math.floor(iat.getTime() / 1000) + 5 * 60;
    const token = jwt.sign({ sub: user._id, sessionId, iat: Math.floor(iat.getTime() / 1000), exp: accessTokenExpires, type: 'ACCESS' }, process.env.SECRET);

    return { token, expires: new Date(accessTokenExpires * 1000) }


}


const updateTokenExpiration = async ({ expiredAt, sessionId }) => {
    await User.findOneAndUpdate({ "sessions._id": sessionId }, { $set: { "sessions.$.endedAt": expiredAt } });
}


const updateMessage = async (userId, sessionId, message) => {
    const user = await User.findOneAndUpdate({ _id: userId, "sessions._id": sessionId }, { $push: { "sessions.$.messages": message } }, { new: true });
    return user;
}

module.exports = { createUser, getUser, generateAuthToken, createNewSession, updateTokenExpiration, updateMessage }