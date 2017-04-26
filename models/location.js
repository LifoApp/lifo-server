module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    radius: DataTypes.DOUBLE,
  }, {
    classMethods: {
      associate: (models) => { // eslint-disable-line
        // associations can be defined here
      },
    },
  });
  return Location;
};
