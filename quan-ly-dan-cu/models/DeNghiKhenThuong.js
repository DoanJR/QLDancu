const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CongDan = require('./CongDan');
const PhanThuong = require('./PhanThuong');

const DeNghiKhenThuong = sequelize.define('DeNghiKhenThuong', {
  ma_de_nghi: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  cccd: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: CongDan,
      key: 'cccd',
    },
  },
  ma_phan_thuong: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: PhanThuong,
      key: 'ma_phan_thuong',
    },
  },
  ngay_de_nghi: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  trang_thai: {
    type: DataTypes.ENUM('cho_duyet', 'duyet', 'tu_choi'),
    defaultValue: 'cho_duyet',
    allowNull: false,
  },
  nguoi_duyet: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ngay_duyet: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  ghi_chu: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'de_nghi_khen_thuong',
  timestamps: false,
});

module.exports = DeNghiKhenThuong;
