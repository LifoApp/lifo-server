/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addIndex('Identifiers', [
    'timestamp',
    'latitude',
    'longitude',
  ]),

  down: (queryInterface, Sequelize) => queryInterface.removeIndex('Identifiers', [
    'timestamp',
    'latitude',
    'longitude',
  ]),
};
