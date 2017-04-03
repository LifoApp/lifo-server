module.exports = (sequelize, DataTypes) => {
  const Identifier = sequelize.define('Identifier', {
    name: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
  }, {
    classMethods: {
      associate: (models) => { // eslint-disable-line
        // associations can be defined here
      },
    },
  });
  return Identifier;
};
