const express = require('express')
const router = express()
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {


    try {
        const { email, password, verifyPassword } = req.body

        // Valudation 
        if (!email || !password || !verifyPassword) {
            res.status(400).json({ message: "please fill all required fields" })
            return
        }

        if (password.length < 6) {
            res.status(400).json({ message: "password must contain 6 charecter" })
            return
        }

        if (password !== verifyPassword) {
            res.status(400).json({ message: "please enter the same password twice" })
            return
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            res.status(400).json({ message: "email already exist" })
            return
        }

        // Hasing

        const salt = bcrypt.genSaltSync()
        const passwordHash = await bcrypt.hash(password, salt)
        console.log(passwordHash)

        //save to DB

        const newUser = new User({ email, passwordHash })
        const savedUser = await newUser.save()

        // Log the user in

        const token = jwt.sign(
            { user: savedUser._id }, process.env.JWT_SECRET
        )

        res.cookie('token', token, { httpOnly: true }).send()

    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // Valudate
        if (!email || !password) {
            res.status(400).json({ message: "please fill all required fields" })
            return
        }

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            res.status(401).json({ message: "Wrong email or password" })
            return
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash)

        if (!passwordCorrect) {
            res.status(401).json({ message: "Wrong email or password" })
            return
        }

        // Log the user in

        const token = jwt.sign(
            { user: existingUser._id }, process.env.JWT_SECRET
        )

        res.cookie('token', token, { httpOnly: true }).send()


    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router