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
    time: {
      type: Sequelize.TEXT
    },
    status: {
      type: Sequelize.ENUM('in', 'out')
    }
    // in_time: {
    //   type: Sequelize.TEXT
    // },
    // out_time: {
    //   type: Sequelize.TEXT
    // }
  })

  return Attendence
}
