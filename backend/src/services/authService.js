const User = require('../../../ai-engine/models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'SALON_SECRET_CODE'

const registerUser = async(userData) => {
    const {name, email, password, role} = userData

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new Error("User already exist with this email")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        name, 
        email, 
        password: hashedPassword, 
        role: role || 'client'
    })

    await newUser.save()

    return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    }

}

const loginUser = async(email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error("Invalid email or password")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Invalid email or password")
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role}, 
        JWT_SECRET,
        {
            expiresIn: '1d'
        }
    )

    return {token, user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }}
}

module.exports = {
    registerUser,
    loginUser
}