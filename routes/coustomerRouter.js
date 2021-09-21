const express = require('express')
const coustomer = require('../models/coustomer-model')
const router = express()
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    try {
        const { name } = req.body

        const newCoustomer = new coustomer({ name })
        const savedCoustomer = await newCoustomer.save()

        res.json(savedCoustomer)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router