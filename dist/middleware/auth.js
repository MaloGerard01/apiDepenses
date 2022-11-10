const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'sj4hOPdqZvxsDClm');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        }
        else {
            next();
        }
    }
    catch (_a) {
        res.status(401).json({
            error: 'Invalid request!'
        });
    }
};
