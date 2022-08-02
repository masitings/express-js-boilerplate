'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    instanceMethods: {
      generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      },
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.password)
      }
    }
  });

  function generateHash(user) {
    if (user === null) {
        throw new Error('No found employee');
    }
    else if (!user.changed('password')) return user.password;
    else {
      if (user.password != null) {
        let salt = bcrypt.genSaltSync(10);
        return user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  }

  user.beforeCreate(generateHash);
  user.beforeUpdate(generateHash);

  return user;
};