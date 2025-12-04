const CongDan = require('../models/CongDan');

// Lấy tất cả công dân
exports.getAllCongDan = async (req, res) => {
  try {
    console.log('🔵 getAllCongDan được gọi'); // log để chắc API được gọi
    const congDans = await CongDan.findAll();
    console.log('✅ Lấy được:', congDans.length, 'công dân');
    res.json(congDans);
  } catch (error) {
    console.error('❌ Lỗi getAllCongDan:', error.message);
    console.error(error.stack);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Lấy công dân theo CCCD
exports.getCongDanByCCCD = async (req, res) => {
  try {
    const { cccd } = req.params;
    const congDan = await CongDan.findByPk(cccd);
    if (!congDan) {
      return res.status(404).json({ message: 'Không tìm thấy công dân' });
    }
    res.json(congDan);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Tạo công dân mới
exports.createCongDan = async (req, res) => {
  try {
    const congDan = await CongDan.create(req.body);
    res.status(201).json(congDan);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi tạo công dân', error: error.message });
  }
};

// Cập nhật công dân
exports.updateCongDan = async (req, res) => {
  try {
    const { cccd } = req.params;
    const [updated] = await CongDan.update(req.body, {
      where: { cccd }, // dùng đúng tên field trong model
    });
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy công dân' });
    }
    res.json({ message: 'Cập nhật thành công' });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: error.message });
  }
};

// Xóa công dân
exports.deleteCongDan = async (req, res) => {
  try {
    const { cccd } = req.params;
    const result = await CongDan.destroy({ where: { cccd } });
    if (result === 0) {
      return res.status(404).json({ error: 'Không tìm thấy công dân cần xóa' });
    }
    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Lỗi server khi xóa công dân' });
  }
};
