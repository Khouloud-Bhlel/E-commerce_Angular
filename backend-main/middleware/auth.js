const jwt = require('jsonwebtoken');
require('dotenv').config()

/**
 * 
 * Middleware function that check if user has token and can access or not
 *  
 * @param {string} token - Authorization token provided by request sender 
 *  
 * @return 
 * @status 403 No token provided
 * @Status 403 Invalid token
 * 
 */

const verifyToken = (req, res, next) => {

    const header = req.headers['authorization'];
    const token = header && header.split('Bearer ')[1];
    console.log("TOKEN :",token)
    if (!token) return res.status(403).send({ success: false, message: 'No token provided' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

        if (err) return res.status(403).send({ success: false, message: 'Invalid token' });
        req.user = {}
        req.user.id = decoded.iduser
        req.user.role = decoded.role
        next()
    })
}


module.exports = { verifyToken }