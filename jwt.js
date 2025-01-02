const jwt = require('jsonwebtoken');

const jwt_auth_middleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ error: 'No token provided' });
    }
    console.log(authorization)
    const token = authorization.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized, token missing' });
    }

    // Validate the token format before proceeding
    const jwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+$/;
    if (!jwtRegex.test(token)) {
        return res.status(401).json({ error: 'Malformed token' });
    }

    try {
        // Verify the token
        const payload = jwt.verify(token, process.env.JWT_SECRET, { ignoreNotBefore: true });
        req.user = payload;
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

const generate_token = (user_data) => {
    return jwt.sign({ user_data }, process.env.JWT_SECRET, { expiresIn: '5m' });
};

module.exports = { jwt_auth_middleware, generate_token };
