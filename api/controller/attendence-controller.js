const express = require('express')
const db = require('../models')
const modelRoutes = express.Router()

const Attendence = db.attendence

modelRoutes.get('/getAll', (req, res) => {
  res.header('Content-Type', 'application/json')
  Attendence.findAll()
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
    user_id: req.body.user_id,
    name: req.body.name,
    date: new Date(Date.now()).toLocaleDateString(),
    in_time: new Date(Date.now()).toLocaleTimeString(),
    out_time: new Date(Date.now()).toLocaleTimeString()
  }
  const recentUser = await Attendence.findOne({
    where: { user_id: user.user_id, date: user.date }
  })
  if (recentUser === null) {
    await Attendence.create(user)
      .then((data) => {
        // writeFileSync(join(dataFolder, facesFileName), content)
        res.send({
          message: 'User attendence done',
          status: 200,
          data
        })
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the Tutorial.'
        })
      })
  } else {
    const update = {
      out_time: new Date(Date.now()).toLocaleTimeString()
    }
    await Attendence.update(update, {
      where: { user_id: user.user_id }
    })
      .then((num) => {
        if (num === '1') {
          res.send({
            message: 'Attendence was updated successfully.'
          })
        } else {
          res.send({
            message: 'Cannot update attendence!'
          })
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error updating attendence ' + err.message
        })
      })
  }
})

module.exports = modelRoutes
