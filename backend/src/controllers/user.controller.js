const jwt = require('jsonwebtoken');
const { createUser, getUser, generateAuthToken, createNewSession, updateTokenExpiration } = require('../services/user.service');

const loginUser = async (req, res) => {
    try {
        let user = await getUser(req.body);
        if (!user) {
            user = await createUser(req.body);
        }
        else {
            user = await createNewSession(user._id, req.body.startedAt);
        }
        const tokenInfo = await generateAuthToken(user);
        res.status(201).send({ tokenInfo });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

}

const verifyAuthToken = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET, async (error, payload) => {
            if (error) {
                console.log(error);
                const payload = jwt.verify(token, process.env.SECRET, { ignoreExpiration: true });
                const { expiredAt } = error;
                await updateTokenExpiration({ expiredAt, sessionId: payload.sessionId })
                return res.status(403).send({ message: error.message });
            }
            res.status(200).send({message: "Continue Session"})
        });
    }
    else res.sendStatus(401);
}




module.exports = { loginUser, verifyAuthToken }