const jwt = require('jsonwebtoken')
const { castObject } = require('../../../ai-engine/models/User')
const JWT_SECRET = process.env.JWT_SECRET || 'SALON_SECRET_CODE'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success: false,
            error: 'Access denied'
        })
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        req.user = decoded
        next()
    }catch(error){
        return res.status(403).json({
            success: false,
            error: 'Invalid or expired token'
        })
    }
}

const verifyRole = (rolesArray) => {
    return (req, res, next) => {
        if(!req.user || !rolesArray.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                error: 'Access forbidden'
            })
        }
        next()
    }
}

module.exports = {
    verifyToken,
    verifyRole
}