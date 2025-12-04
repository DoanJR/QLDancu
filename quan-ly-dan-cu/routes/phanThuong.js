const express = require('express');
const phanThuongController = require('../controllers/phanThuongController');

const router = express.Router();

router.get('/', phanThuongController.getAllPhanThuong);
router.get('/:ma_phan_thuong', phanThuongController.getPhanThuongById);
router.post('/', phanThuongController.createPhanThuong);
router.put('/:ma_phan_thuong', phanThuongController.updatePhanThuong);
router.delete('/:ma_phan_thuong', phanThuongController.deletePhanThuong);

module.exports = router;
