// controllers/hoGiaDinhController.js
const HoGiaDinh = require('../models/HoGiaDinh');

function isQuanTri(user) {
  return user && (user.vai_tro === 'admin' || user.vai_tro === 'quan_ly');
}

// Lấy tất cả hộ gia đình
exports.getAllHoGiaDinh = async (req, res) => {
  try {
    const hoGiaDinhs = await HoGiaDinh.findAll();
    res.json(hoGiaDinhs);
  } catch (error) {
    console.error('Lỗi getAllHoGiaDinh:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Lấy hộ gia đình theo mã hộ
exports.getHoGiaDinhById = async (req, res) => {
  try {
    const { ma_ho } = req.params;
    const hoGiaDinh = await HoGiaDinh.findByPk(ma_ho);
    if (!hoGiaDinh) {
      return res.status(404).json({ message: 'Không tìm thấy hộ gia đình' });
    }
    res.json(hoGiaDinh);
  } catch (error) {
    console.error('Lỗi getHoGiaDinhById:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Tạo hộ gia đình – chỉ admin / quan_ly
exports.createHoGiaDinh = async (req, res) => {
  try {
    if (!isQuanTri(req.user)) {
      return res.status(403).json({ message: 'Bạn không có quyền thêm hộ gia đình' });
    }

    const hoGiaDinh = await HoGiaDinh.create(req.body);
    res.status(201).json(hoGiaDinh);
  } catch (error) {
    console.error('Lỗi createHoGiaDinh:', error);
    res.status(400).json({ message: 'Lỗi tạo hộ gia đình', error: error.message });
  }
};

// Cập nhật hộ gia đình – nếu cũng muốn giới hạn quyền thì mở comment
exports.updateHoGiaDinh = async (req, res) => {
  try {
    // nếu muốn chỉ admin/quan_ly được sửa thì bật đoạn sau:
    // if (!isQuanTri(req.user)) {
    //   return res.status(403).json({ message: 'Bạn không có quyền sửa hộ gia đình' });
    // }

    const { ma_ho } = req.params;
    const [updated] = await HoGiaDinh.update(req.body, {
      where: { ma_ho },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy hộ gia đình' });
    }
    res.json({ message: 'Cập nhật thành công' });
  } catch (error) {
    console.error('Lỗi updateHoGiaDinh:', error);
    res.status(400).json({ message: 'Lỗi cập nhật', error: error.message });
  }
};

// Xóa hộ gia đình – nếu cũng muốn giới hạn quyền thì mở comment
exports.deleteHoGiaDinh = async (req, res) => {
  try {
    // if (!isQuanTri(req.user)) {
    //   return res.status(403).json({ message: 'Bạn không có quyền xóa hộ gia đình' });
    // }

    const { ma_ho } = req.params;
    const deleted = await HoGiaDinh.destroy({
      where: { ma_ho },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy hộ gia đình' });
    }
    res.json({ message: 'Xóa thành công' });
  } catch (error) {
    console.error('Lỗi deleteHoGiaDinh:', error);
    res.status(400).json({ message: 'Lỗi xóa', error: error.message });
  }
};
