const authService = require('../services/authService')
const User = require('../models/User')

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

const getCurrentUser = async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')

        if(!user){
            return res.status(404).json({
                'message': 'User not found!'
            })
        }
        res.json({
            email: user.email,
            role: user.role
        })
    }catch(error){
        res.status(500).json({
            'message': "Server error" + error.message
        })
    }
}

module.exports = {
    register,
    login,
    getCurrentUser
}