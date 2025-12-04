const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CongDan = require('./CongDan');

const TamTru = sequelize.define('TamTru', {
  Ma_tamtru: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'ma_tamtru',
  },
  CCCD: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cccd',
  },
  Noi_tamtru: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'noi_tamtru',
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
  tableName: 'tamtru',
  timestamps: false,
});

module.exports = TamTru;
