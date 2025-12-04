const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt'); // thêm dòng này

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_id',
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    field: 'username',
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
    field: 'email',
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'password',
  },
  ho_ten: {
    type: DataTypes.STRING(100),
    field: 'ho_ten',
  },
  cccd: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: true,
    field: 'cccd',
  },
  vai_tro: {
    type: DataTypes.ENUM('admin', 'quan_ly', 'user'),
    defaultValue: 'user',
    allowNull: false,
    field: 'vai_tro',
  },
  trang_thai: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'trang_thai',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at',
  },
}, {
  tableName: 'users',
  timestamps: false,
});


module.exports = User;
