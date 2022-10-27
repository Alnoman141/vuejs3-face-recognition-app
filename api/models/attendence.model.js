module.exports = (sequelize, Sequelize) => {
  const Attendence = sequelize.define('attendence', {
    user_id: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    in_time: {
      type: Sequelize.TEXT
    },
    out_time: {
      type: Sequelize.TEXT
    }
  })

  return Attendence
}
