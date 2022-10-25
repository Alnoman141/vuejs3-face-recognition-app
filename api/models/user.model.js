module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    id_number: {
      type: Sequelize.STRING
    },
    descriptors: {
      type: Sequelize.TEXT("long")
    }
  });

  return User;
};
