const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PhanThuong = sequelize.define('PhanThuong', {
  ma_phan_thuong: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  ten_phan_thuong: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mo_ta: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tieu_chi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'phan_thuong',
  timestamps: false,
});

module.exports = PhanThuong;
