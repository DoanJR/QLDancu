// dev/quan-ly-dan-cu/routes/dashboard.js
const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const router = express.Router();
const CongDan = require('../models/CongDan');
const HoGiaDinh = require('../models/HoGiaDinh');
const DeNghiKhenThuong = require('../models/DeNghiKhenThuong');
router.get('/', dashboardController.getDashboardStats);
router.get('/', async (req, res) => {
  try {
    const soCongDan = await CongDan.count();
    const soHoGiaDinh = await HoGiaDinh.count();
    const soDeNghi = await DeNghiKhenThuong.count();
    const soDeNghiChoDuyet = await DeNghiKhenThuong.count({
      where: { trang_thai: 'cho_duyet' },
    });

    return res.json({
      success: true,
      data: {
        soCongDan,
        soHoGiaDinh,
        soDeNghi,
        soDeNghiChoDuyet,
      },
    });
  } catch (error) {
    console.error('Lỗi lấy thống kê dashboard:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy dữ liệu dashboard',
    });
  }
});

module.exports = router;
