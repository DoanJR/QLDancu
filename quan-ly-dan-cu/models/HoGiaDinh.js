// dev/quan-ly-dan-cu/models/HoGiaDinh.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HoGiaDinh = sequelize.define('HoGiaDinh', {
  ma_ho: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  chu_ho_cccd: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dia_chi_thuong_tru: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  so_thanh_vien: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'hogiadinh', // đúng tên bảng trong DB
  timestamps: false,
});

module.exports = HoGiaDinh;
