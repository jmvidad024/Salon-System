const authService = require('../services/authService')

const register = async(req, res) => {
    try{
        const user = await authService.registerUser(req.body)
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user
        })
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

const login = async(req, res) => {
    try{
        const {email, password} = req.body
        const result = await authService.loginUser(email, password)
        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            ...result
        })
    }catch(error){
        res.status(401).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    register,
    login
}