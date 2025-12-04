// routes/hoGiaDinh.js
const express = require('express');
const hoGiaDinhController = require('../controllers/hoGiaDinhController');

const router = express.Router();

// Lấy tất cả hộ gia đình
router.get('/', hoGiaDinhController.getAllHoGiaDinh);

// Lấy 1 hộ gia đình theo mã
router.get('/:ma_ho', hoGiaDinhController.getHoGiaDinhById);

// Tạo hộ gia đình
router.post('/', hoGiaDinhController.createHoGiaDinh);

// Cập nhật hộ gia đình
router.put('/:ma_ho', hoGiaDinhController.updateHoGiaDinh);

// Xóa hộ gia đình
router.delete('/:ma_ho', hoGiaDinhController.deleteHoGiaDinh);

module.exports = router;
