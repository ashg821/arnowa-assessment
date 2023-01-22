const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (error, payload) => {
            if (error) {
                return res.sendStatus(403);
            }
            req.userId = payload.sub;
            req.sessionId = payload.sessionId;
            next();
        });
    }
    else res.sendStatus(401);
}

module.exports = authToken;