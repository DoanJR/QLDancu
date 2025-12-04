const DeNghiKhenThuong = require('../models/DeNghiKhenThuong');
const PhanThuong = require('../models/PhanThuong');

// Lấy tất cả đề nghị khen thưởng
exports.getAllDeNghi = async (req, res) => {
  try {
    const deNghis = await DeNghiKhenThuong.findAll({
      include: [
        { model: PhanThuong, attributes: ['Ten_phan_thuong', 'Mo_ta'] },
      ],
    });
    res.json(deNghis);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Tạo đề nghị khen thưởng
exports.createDeNghi = async (req, res) => {
  try {
    const deNghi = await DeNghiKhenThuong.create(req.body);
    res.status(201).json(deNghi);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi tạo đề nghị', error: error.message });
  }
};

// Cập nhật trạng thái đề nghị (duyệt/từ chối)
exports.updateDeNghiStatus = async (req, res) => {
  try {
    const { ma_de_nghi } = req.params;
    const { Trang_thai, Nguoi_duyet, Ghi_chu } = req.body;
    
    const [updated] = await DeNghiKhenThuong.update(
      {
        Trang_thai,
        Nguoi_duyet,
        Ngay_duyet: new Date(),
        Ghi_chu,
      },
      { where: { Ma_de_nghi: ma_de_nghi } }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy đề nghị' });
    }
    res.json({ message: 'Cập nhật trạng thái thành công' });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: error.message });
  }
};

// Lấy danh mục phần thưởng
exports.getAllPhanThuong = async (req, res) => {
  try {
    const phanThuongs = await PhanThuong.findAll();
    res.json(phanThuongs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Tạo loại phần thưởng
exports.createPhanThuong = async (req, res) => {
  try {
    const phanThuong = await PhanThuong.create(req.body);
    res.status(201).json(phanThuong);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi tạo phần thưởng', error: error.message });
  }
};
