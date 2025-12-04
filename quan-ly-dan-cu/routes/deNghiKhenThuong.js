const express = require('express');
const deNghiKhenThuongController = require('../controllers/deNghiKhenThuongController');

const router = express.Router();

router.get('/', deNghiKhenThuongController.getAllDeNghi);
router.get('/:ma_de_nghi', deNghiKhenThuongController.getDeNghiById);
router.post('/', deNghiKhenThuongController.createDeNghi);
router.put('/:ma_de_nghi', deNghiKhenThuongController.updateDeNghiStatus);
router.delete('/:ma_de_nghi', deNghiKhenThuongController.deleteDeNghi);

module.exports = router;
