const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const DeNghiKhenThuong = require('./DeNghiKhenThuong');

const QuyetDinhKhenThuong = sequelize.define('QuyetDinhKhenThuong', {
  Ma_quyet_dinh: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'ma_quyet_dinh',
  },
  Ma_de_nghi: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'ma_de_nghi',
  },
  Ngay_quyet_dinh: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'ngay_quyet_dinh',
  },
  Ket_qua: {
    type: DataTypes.ENUM('duyet', 'tu_choi'),
    allowNull: false,
    field: 'ket_qua',
  },
  Ghi_chu: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'ghi_chu',
  },
}, {
  tableName: 'quyet_dinh_khen_thuong',
  timestamps: false,
});

module.exports = QuyetDinhKhenThuong;
