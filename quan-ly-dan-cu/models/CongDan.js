const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CongDan = sequelize.define('CongDan', {
  cccd: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  ma_ho: {
  type: DataTypes.STRING,
  allowNull: true,
  },
  ho_ten: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ngay_sinh: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gioi_tinh: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noi_dk_khaisinh: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  que_quan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dan_toc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ton_giao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quoc_tich: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Việt Nam',
  },
  noi_thuong_tru: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noi_o_hien_tai: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chu_ho_cccd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quan_he_chuho: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'congdan',   // đặt đúng tên bảng trong DB
  timestamps: false,
});

module.exports = CongDan;
