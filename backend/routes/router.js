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
});

router.post('/createPesron', async (req, res) => {
    try {
        const person = req.body;
        const rowsAffected = await db.createPesron(person);
        res.status(201).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
    res.send('ok')
  });

  router.get('/getUser', async (req, res) => {
    try {
        const persons = await db.getUser;
        res.status(200).json(persons);
    } catch (err) {
        res.status(500).json({ error: err?.message })
    }
});


router.get('/user', (req, res) => {
    const userData = [
        {
            "person_id": 1, 
            "name": "Anders",
            "surname": "kalle",
            "pnr": 22292929,
            "email": "anders@mmail.com",
            "role_id": 1,
            "username": "anders"
        }
    ]

    res.send(userData)
});

router.get('/login', (req, res) => {
    const userData = [
        {
            "person_id": 1, 
            "name": "Anders",
            "surname": "kalle",
            "pnr": 22292929,
            "email": "anders@mmail.com",
            "role_id": 1,
            "username": "anders"
        }
    ]

    if(userData.email === req.body.email) {
        res.send(true)
    } else {
        res.send(false)
    }
});








module.exports = router