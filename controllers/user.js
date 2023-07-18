import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = req.body
        const userWithEmail = await User.findOne({ email: user.email })
        if(!userWithEmail) {
            return res.status(404).json({ message: "Email dosn't exist!" })
        }
        if(userWithEmail.password != user.password) {
            return res.status(404).json({ message: "Password dosn't match!" })
        }
        res.json(userWithEmail)
    } catch (error) {
        res.json({ message: error.message })
    }

}

export const registerUser = async (req, res) => {
    try {
        const user = req.body
        const userWithEmail = await User.findOne({ email: user.email })
        if(userWithEmail) {
            return res.status(404).json({ message: "Email already exists" })
        }
        const newUser = new User(user)
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}