const express = require('express');
const router = express.Router();
const { createPerson, getAllPersons,getPersonById, updatePerson, deletePerson } = require('./persons.controller');

router.route('/').get(getAllPersons).post(createPerson)

router.route('/:personId').get(getPersonById).patch(updatePerson).delete(deletePerson);

module.exports = router;

