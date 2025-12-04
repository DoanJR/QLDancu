// dev/quan-ly-dan-cu/models/index.js
const sequelize = require('../config/database');
const CongDan = require('./CongDan');
const HoGiaDinh = require('./HoGiaDinh');
const PhanThuong = require('./PhanThuong');
const DeNghiKhenThuong = require('./DeNghiKhenThuong');
const User = require('./User');

// Công dân - Hộ gia đình
HoGiaDinh.hasMany(CongDan, {
  foreignKey: 'ma_ho',
  sourceKey: 'ma_ho',
});
CongDan.belongsTo(HoGiaDinh, {
  foreignKey: 'ma_ho',
  targetKey: 'ma_ho',
});

// Đề nghị khen thưởng - Công dân (một đề nghị thuộc về 1 công dân)
DeNghiKhenThuong.belongsTo(CongDan, {
  foreignKey: 'cccd',      // cột FK trong bảng de_nghi_khen_thuong
  targetKey: 'cccd',       // PK bên bảng congdan
});
CongDan.hasMany(DeNghiKhenThuong, {
  foreignKey: 'cccd',
  sourceKey: 'cccd',
});

// Đề nghị khen thưởng - Phần thưởng (một đề nghị gắn với 1 phần thưởng)
DeNghiKhenThuong.belongsTo(PhanThuong, {
  foreignKey: 'ma_phan_thuong',
  targetKey: 'ma_phan_thuong',
});
PhanThuong.hasMany(DeNghiKhenThuong, {
  foreignKey: 'ma_phan_thuong',
  sourceKey: 'ma_phan_thuong',
});

// User - Công dân: mỗi user gắn với 1 công dân qua CCCD
User.belongsTo(CongDan, {
  foreignKey: 'cccd',
  targetKey: 'cccd',
});
CongDan.hasOne(User, {
  foreignKey: 'cccd',
  sourceKey: 'cccd',
});

module.exports = {
  sequelize,
  CongDan,
  HoGiaDinh,
  PhanThuong,
  DeNghiKhenThuong,
  User,
};
