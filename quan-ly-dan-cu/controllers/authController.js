const User = require('../models/User');
const CongDan = require('../models/CongDan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (user) =>
  jwt.sign(
    {
      user_id: user.user_id,
      username: user.username,
      vai_tro: user.vai_tro,
      cccd: user.cccd,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

// Đăng ký: tạo Công dân TRƯỚC, rồi User (để không vướng FK users -> congdan)
exports.register = async (req, res) => {
  const t = await User.sequelize.transaction();
  try {
    const { Op } = require('sequelize');
    const {
      username,
      email,
      password,
      ho_ten,
      cccd,
      ngay_sinh,
      gioi_tinh,
      noi_dk_khaisinh,
      que_quan,
      dan_toc,
      ton_giao,
      noi_thuong_tru,
      noi_o_hien_tai,
      chu_ho_cccd,
      quan_he_chuho,
      ma_ho = null,
    } = req.body;

    const required = [
      username,
      email,
      password,
      ho_ten,
      cccd,
      ngay_sinh,
      gioi_tinh,
      noi_dk_khaisinh,
      que_quan,
      dan_toc,
      noi_thuong_tru,
      noi_o_hien_tai,
      chu_ho_cccd,
      quan_he_chuho,
    ];
    if (required.some((v) => !v)) {
      await t.rollback();
      return res
        .status(400)
        .json({ message: 'Thiếu trường bắt buộc để tạo công dân' });
    }

    const existingUser = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
      transaction: t,
    });
    if (existingUser) {
      await t.rollback();
      return res
        .status(400)
        .json({ message: 'Username hoặc email đã tồn tại' });
    }

    // 1. Tạo công dân trước (thỏa FK: users.cccd -> congdan.cccd)
    await CongDan.create(
      {
        cccd,
        ma_ho,
        ho_ten,
        ngay_sinh,
        gioi_tinh,
        noi_dk_khaisinh,
        que_quan,
        dan_toc,
        ton_giao: ton_giao || null,
        quoc_tich: 'Việt Nam',
        noi_thuong_tru,
        noi_o_hien_tai,
        chu_ho_cccd,
        quan_he_chuho,
      },
      { transaction: t }
    );

    // 2. Tạo user sau, tham chiếu cccd đã có
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create(
      {
        username,
        email,
        password: hashedPassword,
        ho_ten,
        cccd,
        vai_tro: 'user',
      },
      { transaction: t }
    );

    await t.commit();

    const token = generateToken(user);

    return res.status(201).json({
      message: 'Đăng ký thành công',
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        ho_ten: user.ho_ten,
        vai_tro: user.vai_tro,
        cccd: user.cccd,
      },
      token,
    });
  } catch (error) {
    await t.rollback();
    return res
      .status(400)
      .json({ message: 'Lỗi đăng ký', error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Username hoặc password không đúng' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: 'Username hoặc password không đúng' });
    }

    if (!user.trang_thai) {
      return res.status(400).json({ message: 'Tài khoản đã bị khóa' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Đăng nhập thành công',
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        ho_ten: user.ho_ten,
        vai_tro: user.vai_tro,
        cccd: user.cccd,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi đăng nhập', error: error.message });
  }
};

// Lấy thông tin user hiện tại
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User không tồn tại' });
    }
    res.json({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      ho_ten: user.ho_ten,
      vai_tro: user.vai_tro,
      cccd: user.cccd,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Lỗi lấy thông tin', error: error.message });
  }
};

// Đăng xuất
exports.logout = (req, res) => {
  res.json({ message: 'Đăng xuất thành công' });
};

// Lấy danh sách tất cả users (chỉ admin)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.vai_tro !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }

    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi', error: error.message });
  }
};

// Cập nhật vai trò user (chỉ admin)
exports.updateUserRole = async (req, res) => {
  try {
    if (req.user.vai_tro !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }

    const { user_id } = req.params;
    const { vai_tro } = req.body;

    const [updated] = await User.update({ vai_tro }, { where: { user_id } });

    if (!updated) {
      return res.status(404).json({ message: 'User không tồn tại' });
    }

    res.json({ message: 'Cập nhật vai trò thành công' });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: error.message });
  }
};
