const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CongDan = require('./CongDan');

const TamVang = sequelize.define('TamVang', {
  Ma_tamvang: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'ma_tamvang',
  },
  CCCD: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cccd',
  },
  Ly_do: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'ly_do',
  },
  Ngay_batdau: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'ngay_batdau',
  },
  Ngay_ketthuc: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'ngay_ketthuc',
  },
}, {
  tableName: 'tamvang',
  timestamps: false,
});

module.exports = TamVang;
