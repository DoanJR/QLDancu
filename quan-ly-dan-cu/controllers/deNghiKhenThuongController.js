const DeNghiKhenThuong = require('../models/DeNghiKhenThuong');
const PhanThuong = require('../models/PhanThuong');
const CongDan = require('../models/CongDan');
const ThongBaoKhenThuong = require('../models/ThongBaoKhenThuong');

// Lấy tất cả đề nghị
exports.getAllDeNghi = async (req, res) => {
  try {
    const user = req.user; // gắn từ middleware auth
    const where = {};

    // Nếu là user thường -> chỉ xem đề nghị của chính mình
    if (user && user.vai_tro === 'user') {
      // cần đảm bảo payload JWT có trường cccd
      where.cccd = user.cccd;
    }
    // admin / quan_ly không bị giới hạn

    const deNghis = await DeNghiKhenThuong.findAll({
      where,
      include: [
        { model: CongDan, attributes: ['cccd', 'ho_ten'] },
        { model: PhanThuong, attributes: ['ma_phan_thuong', 'ten_phan_thuong'] },
      ],
    });
    res.json(deNghis);
  } catch (error) {
    console.error('Lỗi getAllDeNghi:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Lấy đề nghị theo mã
exports.getDeNghiById = async (req, res) => {
  try {
    const { ma_de_nghi } = req.params;
    const deNghi = await DeNghiKhenThuong.findByPk(ma_de_nghi, {
      include: [
        { model: CongDan, attributes: ['cccd', 'ho_ten'] },
        { model: PhanThuong, attributes: ['ma_phan_thuong', 'ten_phan_thuong'] },
      ],
    });
    if (!deNghi) {
      return res.status(404).json({ message: 'Không tìm thấy đề nghị' });
    }
    res.json(deNghi);
  } catch (error) {
    console.error('Lỗi getDeNghiById:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Tạo đề nghị mới
exports.createDeNghi = async (req, res) => {
  try {
    const deNghi = await DeNghiKhenThuong.create(req.body);
    res.status(201).json(deNghi);
  } catch (error) {
    console.error('Lỗi createDeNghi:', error);
    res.status(400).json({ message: 'Lỗi tạo đề nghị', error: error.message });
  }
};

// Cập nhật trạng thái đề nghị + tạo thông báo
exports.updateDeNghiStatus = async (req, res) => {
  try {
    const { ma_de_nghi } = req.params;
    const { trang_thai, nguoi_duyet } = req.body;

    const deNghi = await DeNghiKhenThuong.findByPk(ma_de_nghi);
    if (!deNghi) {
      return res.status(404).json({ message: 'Không tìm thấy đề nghị' });
    }

    await DeNghiKhenThuong.update(req.body, { where: { Ma_de_nghi: ma_de_nghi } });

    // Tạo thông báo cho công dân
    const maThongBao = `TB-${Date.now()}`;
    let noiDung;

    if (trang_thai === 'duyet') {
      noiDung = `Đề nghị khen thưởng ${deNghi.ma_phan_thuong} của bạn đã được duyệt bởi ${nguoi_duyet || 'hệ thống'}.`;
    } else if (trang_thai === 'tu_choi') {
      noiDung = `Đề nghị khen thưởng ${deNghi.ma_phan_thuong} của bạn đã bị từ chối bởi ${nguoi_duyet || 'hệ thống'}.`;
    }

    if (noiDung) {
      await ThongBaoKhenThuong.create({
        ma_thong_bao: maThongBao,
        cccd: deNghi.cccd,
        noi_dung: noiDung,
        ngay_gui: new Date(),
        trang_thai: 'da_gui',
      });
    }

    res.json({ message: 'Cập nhật trạng thái thành công' });
  } catch (error) {
    console.error('Lỗi updateDeNghiStatus:', error);
    res.status(400).json({ message: 'Lỗi cập nhật', error: error.message });
  }
};

// Xóa đề nghị
exports.deleteDeNghi = async (req, res) => {
  try {
    const { ma_de_nghi } = req.params;
    const deleted = await DeNghiKhenThuong.destroy({
      where: { ma_de_nghi }, // dùng đúng tên field trong model
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy đề nghị' });
    }
    res.json({ message: 'Xóa thành công' });
  } catch (error) {
    console.error('Lỗi deleteDeNghi:', error);
    res.status(400).json({ message: 'Lỗi xóa', error: error.message });
  }
};
