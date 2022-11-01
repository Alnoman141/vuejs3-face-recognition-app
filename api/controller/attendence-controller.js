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

/**
 * attendence data save
 * logic: first in, last out
 */

// modelRoutes.post('/save', async (req, res) => {
//   res.header('Content-Type', 'application/json')
//   // const content = JSON.stringify(req.body.faces)
//   // Create a user
//   const user = {
//     user_id: req.body.user_id,
//     name: req.body.name,
//     date: new Date(Date.now()).toLocaleDateString(),
//     in_time: new Date(Date.now()).toLocaleTimeString(),
//     out_time: new Date(Date.now()).toLocaleTimeString()
//   }
//   const recentUser = await Attendence.findOne({
//     where: { user_id: user.user_id, date: user.date }
//   })
//   if (recentUser === null) {
//     await Attendence.create(user)
//       .then((data) => {
//         // writeFileSync(join(dataFolder, facesFileName), content)
//         res.send({
//           message: 'User attendence done',
//           status: 200,
//           data
//         })
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message || 'Some error occurred while creating the Tutorial.'
//         })
//       })
//   } else {
//     const update = {
//       out_time: new Date(Date.now()).toLocaleTimeString()
//     }
//     await Attendence.update(update, {
//       where: { user_id: user.user_id }
//     })
//       .then((num) => {
//         if (num === '1') {
//           res.send({
//             message: 'Attendence was updated successfully.'
//           })
//         } else {
//           res.send({
//             message: 'Cannot update attendence!'
//           })
//         }
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: 'Error updating attendence ' + err.message
//         })
//       })
//   }
// })

const saveData = async (req, res, user) => {
  await Attendence.create(user)
    .then((data) => {
      res.send({
        message: 'User attendence done',
        status: 200,
        data
      })
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message:
          err.message || 'Some error occurred while creating the Tutorial.'
      })
    })
}

modelRoutes.post('/save', async (req, res) => {
  res.header('Content-Type', 'application/json')
  // Create a user
  const user = {
    user_id: req.body.user_id,
    name: req.body.name,
    date: new Date(Date.now()).toLocaleDateString(),
    time: new Date(Date.now()).toLocaleTimeString(),
    status: 'in'
  }

  const recentSameUser = await Attendence.findOne({
    where: { date: user.date, user_id: user.user_id },
    order: [['createdAt', 'DESC']]
  })

  if (!recentSameUser) {
    saveData(req, res, user)
  } else if (recentSameUser.user_id === user.user_id) {
    user.status = recentSameUser.status === 'in' ? 'out' : 'in'
    const fiveMinutesLater =
      new Date(recentSameUser.createdAt).getTime() + 5 * 60 * 1000
    if (fiveMinutesLater > new Date(Date.now()).getTime()) {
      res.status(310).send({
        status: 310,
        message: 'Attendence taken!'
      })
    } else {
      saveData(req, res, user)
    }
  } else {
    saveData(req, res, user)
  }
})

module.exports = modelRoutes
