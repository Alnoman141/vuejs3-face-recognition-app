module.exports = (app) => {
  const face = require('../controller/face-controller')
  const attendence = require('../controller/attendence-controller')

  const FaceRouter = require('express').Router()
  const AttendenceRouter = require('express').Router()

  // Create a new Face
  FaceRouter.post('/save', face.create)

  // Retrieve all Faces
  FaceRouter.get('/', face.findAll)

  // Create a new attendence
  AttendenceRouter.post('/save', attendence.create)

  // Retrieve all attendence
  AttendenceRouter.get('/', attendence.findAll)

  app.use('/api/face', FaceRouter)

  app.use('/api/attendence', AttendenceRouter)
}
