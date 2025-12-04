const express = require('express');
const congdanController = require('../controllers/congdanController');

const router = express.Router();

router.get('/', congdanController.getAllCongDan);
router.get('/:cccd', congdanController.getCongDanByCCCD);
router.post('/', congdanController.createCongDan);
router.put('/:cccd', congdanController.updateCongDan);
router.delete('/:cccd', congdanController.deleteCongDan);
module.exports = router;
