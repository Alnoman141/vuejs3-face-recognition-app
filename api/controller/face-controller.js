const { writeFileSync } = require('fs')
const { join } = require('path')
const express = require('express')
const db = require('../models')
const modelRoutes = express.Router()

// folders & model file
const rootFolder = join(__dirname, '../../')
const dataFolder = join(rootFolder, 'data')
const facesFileName = 'faces.json'
const User = db.users

modelRoutes.get('/getAll', (req, res) => {
  res.header('Content-Type', 'application/json')
  User.findAll()
    .then((data) => {
      // console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.'
      })
    })
})

modelRoutes.post('/save', async (req, res) => {
  res.header('Content-Type', 'application/json')
  // const content = JSON.stringify(req.body.faces)
  // Create a user
  const user = {
    id_number: req.body.faces[0].id,
    name: req.body.faces[0].user,
    descriptors: JSON.stringify(req.body.faces[0].descriptors)
  }

  // Save Tutorial in the database
  User.create(user)
    .then((data) => {
      // writeFileSync(join(dataFolder, facesFileName), content)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Tutorial.'
      })
    })
})

module.exports = modelRoutes
