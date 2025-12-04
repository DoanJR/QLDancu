const express = require('express');
const khenThuongController = require('../controllers/khenThuongController');

const router = express.Router();

router.get('/de-nghi', khenThuongController.getAllDeNghi);
router.post('/de-nghi', khenThuongController.createDeNghi);
router.put('/de-nghi/:ma_de_nghi', khenThuongController.updateDeNghiStatus);

router.get('/phan-thuong', khenThuongController.getAllPhanThuong);
router.post('/phan-thuong', khenThuongController.createPhanThuong);

module.exports = router;
