const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./models'); // để chạy associations
const sequelize = require('./config/database');
const congdanRoutes = require('./routes/congdan');
const hoGiaDinhRoutes = require('./routes/hoGiaDinh');
const phanThuongRoutes = require('./routes/phanThuong');
const deNghiKhenThuongRoutes = require('./routes/deNghiKhenThuong');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
// Trang chủ
app.get('/', (req, res) => {
  res.json({
    message: 'Ứng dụng quản lý dân cư và cấp phần thưởng',
    version: '1.0.0',
    endpoints: {
      congdan: {
        getAll: 'GET /api/congdan',
        getById: 'GET /api/congdan/:cccd',
        create: 'POST /api/congdan',
        update: 'PUT /api/congdan/:cccd',
        delete: 'DELETE /api/congdan/:cccd',
      },
      hoGiaDinh: {
        getAll: 'GET /api/ho-gia-dinh',
        getById: 'GET /api/ho-gia-dinh/:ma_ho',
        create: 'POST /api/ho-gia-dinh',
        update: 'PUT /api/ho-gia-dinh/:ma_ho',
        delete: 'DELETE /api/ho-gia-dinh/:ma_ho',
      },
      phanThuong: {
        getAll: 'GET /api/phan-thuong',
        getById: 'GET /api/phan-thuong/:ma_phan_thuong',
        create: 'POST /api/phan-thuong',
        update: 'PUT /api/phan-thuong/:ma_phan_thuong',
        delete: 'DELETE /api/phan-thuong/:ma_phan_thuong',
      },
      deNghiKhenThuong: {
        getAll: 'GET /api/de-nghi-khen-thuong',
        getById: 'GET /api/de-nghi-khen-thuong/:ma_de_nghi',
        create: 'POST /api/de-nghi-khen-thuong',
        updateStatus: 'PUT /api/de-nghi-khen-thuong/:ma_de_nghi',
        delete: 'DELETE /api/de-nghi-khen-thuong/:ma_de_nghi',
      },
    }
  });
});

// Routes
app.use('/api/congdan', congdanRoutes);
app.use('/api/ho-gia-dinh', hoGiaDinhRoutes);
app.use('/api/phan-thuong', phanThuongRoutes);
app.use('/api/de-nghi-khen-thuong', deNghiKhenThuongRoutes);

// Kết nối database
const PORT = process.env.PORT || 3000;

// Thêm dòng này để kiểm tra xem code có chạy đến đây không
console.log('--- Đang bắt đầu kết nối đến Database... ---');
console.log(`--- DB Info: Host=${process.env.DB_HOST}, User=${process.env.DB_USER}, DB=${process.env.DB_NAME} ---`);

sequelize.authenticate().then(() => {
  console.log('Kết nối Database THÀNH CÔNG!');
  app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('KẾT NỐI DATABASE THẤT BẠI!');
  console.error('Lỗi chi tiết:', err.message); 
  // process.exit(1); 
});
