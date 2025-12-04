const PhanThuong = require('../models/PhanThuong');

exports.getAllPhanThuong = async (req, res) => {
  try {
    const phanThuongs = await PhanThuong.findAll();
    res.json(phanThuongs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.getPhanThuongById = async (req, res) => {
  try {
    const { ma_phan_thuong } = req.params;
    const phanThuong = await PhanThuong.findByPk(ma_phan_thuong);
    if (!phanThuong) {
      return res.status(404).json({ message: 'Không tìm thấy phần thưởng' });
    }
    res.json(phanThuong);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.createPhanThuong = async (req, res) => {
  try {
    const phanThuong = await PhanThuong.create(req.body);
    res.status(201).json(phanThuong);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi tạo phần thưởng', error: error.message });
  }
};

exports.updatePhanThuong = async (req, res) => {
  try {
    const { ma_phan_thuong } = req.params;
    const [updated] = await PhanThuong.update(req.body, {
      where: { Ma_phan_thuong: ma_phan_thuong },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy phần thưởng' });
    }
    res.json({ message: 'Cập nhật thành công' });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: error.message });
  }
};

exports.deletePhanThuong = async (req, res) => {
  try {
    const { ma_phan_thuong } = req.params;
    const deleted = await PhanThuong.destroy({
      where: { Ma_phan_thuong: ma_phan_thuong },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy phần thưởng' });
    }
    res.json({ message: 'Xóa thành công' });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi xóa', error: error.message });
  }
};
