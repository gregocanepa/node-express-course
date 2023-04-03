const express = require('express');
const {
    getPeople,
    addPeople,
    updatePeople,
    deletePeople
} = require('../controllers/people');

const router = express.Router()

router.put('/:id', updatePeople)
router.delete('/:id', deletePeople)
router.get('/', getPeople)
router.post('/', addPeople)

module.exports = router
