'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Channel.belongsTo(models.Team, {
        foreignKey: 'teamId'
      })
      Channel.belongsToMany(models.User, {
        through: 'channel_member',
        foreignKey: 'channelId'
      })
    }
  };
  Channel.init({
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Channel',
    tableName: 'channels',
    underscored: true
  });
  return Channel;
};