'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsToMany(models.User, {
        through: 'member',
        foreignKey: 'teamId'
      })
      Team.belongsTo(models.User, {
        foreignKey: 'owner',
        onDelete: "CASCADE",
        onUpdate: 'CASCADE' 
      })
    }
  };
  Team.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Team',
    tableName: 'teams',
    underscored: true
  });
  return Team;
};