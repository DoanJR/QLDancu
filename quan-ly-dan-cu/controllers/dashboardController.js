// controllers/dashboardController.js
const CongDan = require('../models/CongDan');
const HoGiaDinh = require('../models/HoGiaDinh');
const DeNghiKhenThuong = require('../models/DeNghiKhenThuong');
const PhanThuong = require('../models/PhanThuong');

exports.getDashboardStats = async (req, res) => {
  try {
    const soCongDan = await CongDan.count();
    const soHoGiaDinh = await HoGiaDinh.count();
    const soDeNghi = await DeNghiKhenThuong.count();
    const soDeNghiChoDuyet = await DeNghiKhenThuong.count({
      where: { trang_thai: 'cho_duyet' },
    });
    const soPhanThuong = await PhanThuong.count();

    res.json({
      success: true,
      data: {
        soCongDan,
        soHoGiaDinh,
        soDeNghi,
        soDeNghiChoDuyet,
        soPhanThuong,
      },
    });
  } catch (err) {
    console.error('Lỗi dashboard:', err);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};
