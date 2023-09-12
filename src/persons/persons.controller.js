const Person = require('../models/Person.model');
const mongoose = require('mongoose')

async function createPerson(req, res) {
  try{
    const { name } = req.body;
    if(!name){
      return res.status(400).json({ error: 'please include name' })
    }
    if(typeof name !== 'string'){
      return res.status(400).json({ error: `name must be a string`})
    }
    const person = await Person.create({
      name
    });
    res.status(201).json(person)
  } catch(err) {
    console.log(err)
    res.status(500).json({ error: 'internal server error' })
  }
}
async function getAllPersons(req, res) {
  try {
    const queryOject = {};
    const { name } = req.query;

    if(name){
      queryOject.name = {$regex:name, $options:'i'};
    }
    const persons = await Person.find(queryOject).select('-__v');
    res.status(200).json(persons)
    return;
  } catch(err) {
    console.log(err)
    res.status(500).send(err)
  } 
}

async function getPersonById(req, res) {
  try {
    const id = req.params.personId;
    if(!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: `id is not valid` })
    }

    const person = await Person.findOne({_id: id}).select('-__v');
    if(!person) {
      res.status(400).json({ error: `no person exists with id ${id}` })
      return
    }

    res.status(200).json(person)
  }catch(err) {
    console.log(err)
    res.status(500).json({ error: 'internal server error' })
  }
}

async function updatePerson(req, res) {
  try{
    const id = req.params.personId;
    const { name } = req.body;
    if(!name){
      return res.status(400).json({ error: `name property is required for this request` })
    }
    if(typeof name !== 'string'){
      return res.status(400).json({ error: `name must be a string` })
    }
    if(!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: `id is not valid` })
    }

    const person = await Person.findById(id).select('-__v');
    if(!person) {
      return res.status(400).json({ error: `no person exists with id ${id}` })
    }
    person.name = name;
    await person.save();
    res.status(200).json(person)
  } catch(err) {
    res.status(500).json({ error: 'internal server error' })
  }
}
async function deletePerson(req, res) {
  try{
    const id = req.params.personId;
    if(!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: `id is not valid` })
    }
    const person = await Person.findOneAndDelete({_id: id}).select('-__v')
    if(!person){
      return res.status(400).json({ error: `no person exists with id ${id}` })
    }
    res.status(200).json({msg: 'person deleted successfully'})
  } catch(err) {
    res.status(500).json({ error: 'internal server error' })
  }
}

module.exports = {
  createPerson, getAllPersons, getPersonById, updatePerson, deletePerson
}