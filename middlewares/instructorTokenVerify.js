const { response } = require('express');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const verification = (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ valid: false, error: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, secret);
        req.user = decode;
        console.log('decode', decode);
        res.status(200).json({ valid: true, user: req.user });
    } catch (error) {
        console.log('verification failed');
        return res.status(401).json({ valid: false, error: 'Unauthorized' });
    }
}

module.exports = verification;