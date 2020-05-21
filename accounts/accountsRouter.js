const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
        .then(account => {
            res.json(account)
        })
        .catch(error => {
            res.status(500).json({ message: 'error retrieving posts' })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id })
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({ message: "the account with this ID doesn't exist" })
        })
})

router.post('/', (req, res) => {
    db('accounts').insert(req.body)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({ message: "there was a problem issuing the database" })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts').where({ id }).update(changes)
        .then(accountUpdate => {
            if (accountUpdate) {
                res.status(200).json(accountUpdate)
            } else {
                res.status(404).json({ message: "this project couldn't be found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'error updating the project' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id }).del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'this ID has been deleted'})
            } else {
                res.status(404).json({ message: "this ID doesn't exist"})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'there was an error retrieving this account'})  
        })
})

module.exports = router;