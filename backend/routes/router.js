const express = require('express');
const router = express.Router();

const { createDatabaseConnection, connect } = require("./../database.js")
const db = createDatabaseConnection()

router.get('/users', (req, res) => {
    const userData = [
        {
            "id": 1, 
            "name": "Anders"
        },
        {
            "id": 2,
            "name": "Johan"
        },
        {
            "id": 3,
            "name": "Kalle"
        }
    ]

    res.send(userData)
})

router.post('/createPesron', async (req, res) => {
    try {
        const person = req.body;
        const rowsAffected = await database.createPesron(person);
        res.status(201).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
  })





module.exports = router