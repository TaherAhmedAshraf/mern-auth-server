const express = require('express')
const router = express()
const User = require('../models/user-model')

router.post('/', async (req, res) => {


    try {
        const { email, password, verifyPassword } = req.body

        if (!email || !password || !verifyPassword) {
            res.status(400).json({ message: "please fill all required fields" })
        }

        if (password.length < 6) {
            res.status(400).json({ message: "password must contain 6 charecter" })
        }

        if (password !== verifyPassword) {
            res.status(400).json({ message: "please enter the same password twice" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            res.status(400).json({ message: "email already exist" })
        }

    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router