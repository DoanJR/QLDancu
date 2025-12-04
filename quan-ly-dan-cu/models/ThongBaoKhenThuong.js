const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ThongBaoKhenThuong = sequelize.define('ThongBaoKhenThuong', {
  ma_thong_bao: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'ma_thong_bao',
  },
  cccd: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cccd',
  },
  noi_dung: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'noi_dung',
  },
  ngay_gui: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'ngay_gui',
  },
  trang_thai: {
    type: DataTypes.ENUM('da_gui', 'da_doc'),
    allowNull: false,
    defaultValue: 'da_gui',
    field: 'trang_thai',
  },
}, {
  tableName: 'thong_bao_khen_thuong',
  timestamps: false,
});

module.exports = ThongBaoKhenThuong;
