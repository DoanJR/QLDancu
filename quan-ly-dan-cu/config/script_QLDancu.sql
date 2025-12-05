-- --- PHẦN 1: DỌN DẸP (Xóa hết bảng cũ nếu có để làm lại từ đầu) ---
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS THONG_BAO_KHEN_THUONG CASCADE;
DROP TABLE IF EXISTS QUYET_DINH_KHEN_THUONG CASCADE;
DROP TABLE IF EXISTS DE_NGHI_KHEN_THUONG CASCADE;
DROP TABLE IF EXISTS PHAN_THUONG CASCADE;
DROP TABLE IF EXISTS NGUOIKHAIBAO CASCADE;
DROP TABLE IF EXISTS QUANHE_GIADINH CASCADE;
DROP TABLE IF EXISTS TAMVANG CASCADE;
DROP TABLE IF EXISTS TAMTRU CASCADE;
DROP TABLE IF EXISTS CONGDAN CASCADE;
DROP TABLE IF EXISTS HOGIADINH CASCADE;

-- --- PHẦN 2: TẠO BẢNG (Cấu trúc database) ---

-- 1. Tạo bảng CONGDAN (Chưa khóa ngoại vội)
CREATE TABLE CONGDAN (
    CCCD VARCHAR(20) PRIMARY KEY,
    Ho_ten VARCHAR(100) NOT NULL,
    Ngay_sinh VARCHAR(20) NOT NULL,
    Gioi_tinh VARCHAR(10) NOT NULL,
    Noi_dk_khaisinh VARCHAR(200) NOT NULL,
    Que_quan VARCHAR(200) NOT NULL,
    Dan_toc VARCHAR(50) NOT NULL,
    Ton_giao VARCHAR(50),
    Quoc_tich VARCHAR(50) NOT NULL,
    Tinh_trang_hon_nhan VARCHAR(50),
    Noi_thuong_tru VARCHAR(200) NOT NULL,
    Noi_tam_tru VARCHAR(200),
    Tinh_trang_tam_vang VARCHAR(50),
    Noi_o_hien_tai VARCHAR(200) NOT NULL,
    Quan_he_chuho VARCHAR(50) NOT NULL,
    Nhom_mau VARCHAR(10),
    Cha_CCCD VARCHAR(20),
    Me_CCCD VARCHAR(20),
    VoChong_CCCD VARCHAR(20),
    Chu_ho_CCCD VARCHAR(20) NOT NULL,
    Ngay_mat VARCHAR(20)
);

-- 2. Tạo bảng HOGIADINH
CREATE TABLE HOGIADINH (
    Ma_ho VARCHAR(50) PRIMARY KEY,
    Chu_ho_CCCD VARCHAR(20) NOT NULL REFERENCES CONGDAN(CCCD),
    Dia_chi_thuong_tru VARCHAR(200) NOT NULL,
    So_thanh_vien INTEGER NOT NULL,
    CONSTRAINT unique_chu_ho UNIQUE (Chu_ho_CCCD)
);

-- 3. Cập nhật liên kết giữa CONGDAN và HOGIADINH
ALTER TABLE CONGDAN ADD COLUMN ma_ho VARCHAR(20) REFERENCES HOGIADINH(ma_ho);

-- 4. Bảng tạm trú
CREATE TABLE TAMTRU (
    Ma_tamtru VARCHAR(50) PRIMARY KEY,
    CCCD VARCHAR(20) NOT NULL REFERENCES CONGDAN(CCCD),
    Noi_tamtru VARCHAR(200) NOT NULL,
    Ngay_batdau TIMESTAMP NOT NULL,
    Ngay_ketthuc TIMESTAMP
);

-- 5. Bảng tạm vắng
CREATE TABLE TAMVANG (
    Ma_tamvang VARCHAR(50) PRIMARY KEY,
    CCCD VARCHAR(20) NOT NULL REFERENCES CONGDAN(CCCD),
    Ly_do VARCHAR(200) NOT NULL,
    Ngay_batdau TIMESTAMP NOT NULL,
    Ngay_ketthuc TIMESTAMP
);

-- 6. Bảng quan hệ gia đình
CREATE TABLE QUANHE_GIADINH (
    Chu_ho_CCCD VARCHAR(20) PRIMARY KEY REFERENCES HOGIADINH(Chu_ho_CCCD),
    Thanhvien_CCCD VARCHAR(20) NOT NULL REFERENCES CONGDAN(CCCD),
    Quan_he VARCHAR(50) NOT NULL
);

-- 7. Bảng người khai báo
CREATE TABLE NGUOIKHAIBAO (
    CCCD VARCHAR(20) PRIMARY KEY REFERENCES CONGDAN(CCCD)
);

-- 8. Bảng phần thưởng
CREATE TABLE PHAN_THUONG (
    Ma_phan_thuong VARCHAR(50) PRIMARY KEY,
    Ten_phan_thuong VARCHAR(100) NOT NULL,
    Mo_ta TEXT,
    Tieu_chi TEXT
);

-- 9. Bảng đề nghị khen thưởng
CREATE TABLE DE_NGHI_KHEN_THUONG (
    Ma_de_nghi VARCHAR(50) PRIMARY KEY,
    CCCD VARCHAR(20) NOT NULL REFERENCES CONGDAN(CCCD),
    Ma_phan_thuong VARCHAR(50) NOT NULL REFERENCES PHAN_THUONG(Ma_phan_thuong),
    Ngay_de_nghi TIMESTAMP NOT NULL,
    Trang_thai VARCHAR(20) NOT NULL CHECK (Trang_thai IN ('cho_duyet', 'duyet', 'tu_choi')),
    Nguoi_duyet VARCHAR(100),
    Ngay_duyet TIMESTAMP,
    Ghi_chu TEXT
);

-- 10. Bảng quyết định khen thưởng
CREATE TABLE QUYET_DINH_KHEN_THUONG (
    Ma_quyet_dinh VARCHAR(50) PRIMARY KEY,
    Ma_de_nghi VARCHAR(50) NOT NULL REFERENCES DE_NGHI_KHEN_THUONG(Ma_de_nghi),
    Ngay_quyet_dinh TIMESTAMP NOT NULL,
    Ket_qua VARCHAR(20) NOT NULL CHECK (Ket_qua IN ('duyet', 'tu_choi')),
    Ghi_chu TEXT
);

-- 11. Bảng thông báo
CREATE TABLE THONG_BAO_KHEN_THUONG (
    Ma_thong_bao VARCHAR(50) PRIMARY KEY,
    CCCD VARCHAR(20) NOT NULL REFERENCES CONGDAN(CCCD),
    Noi_dung TEXT NOT NULL,
    Ngay_gui TIMESTAMP NOT NULL,
    Trang_thai VARCHAR(20) NOT NULL CHECK (Trang_thai IN ('da_gui', 'da_doc'))
);

-- 12. Bảng Users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    ho_ten VARCHAR(100),
    vai_tro VARCHAR(20) DEFAULT 'user',
    trang_thai BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cccd VARCHAR(20) UNIQUE,
    CONSTRAINT users_vai_tro_check CHECK (vai_tro IN ('admin', 'quan_ly', 'user')),
    CONSTRAINT fk_users_congdan FOREIGN KEY (cccd) REFERENCES CONGDAN(CCCD)
);

-- 13. Thêm các khóa ngoại phụ (Cha, Mẹ, Vợ chồng...)
ALTER TABLE CONGDAN 
ADD CONSTRAINT fk_congdan_cha FOREIGN KEY (Cha_CCCD) REFERENCES CONGDAN(CCCD),
ADD CONSTRAINT fk_congdan_me FOREIGN KEY (Me_CCCD) REFERENCES CONGDAN(CCCD),
ADD CONSTRAINT fk_congdan_vochong FOREIGN KEY (VoChong_CCCD) REFERENCES CONGDAN(CCCD);

-- --- PHẦN 3: DATA MẪU (Logic thêm Admin tránh lỗi con gà - quả trứng) ---

-- Tạm thời cho phép thêm công dân mà chưa cần check chủ hộ ngay
ALTER TABLE CONGDAN DROP CONSTRAINT IF EXISTS fk_congdan_chuho;

-- 1. Thêm ông Admin vào bảng Công Dân
INSERT INTO CONGDAN (
  CCCD, Ho_ten, Ngay_sinh, Gioi_tinh, Noi_dk_khaisinh, Que_quan, Dan_toc, Quoc_tich, 
  Noi_thuong_tru, Noi_o_hien_tai, Quan_he_chuho, Chu_ho_CCCD
)
VALUES (
  '000000000001', 'Admin Hệ Thống', '2005-05-05', 'Nam', 'Hà Nội', 'Hà Nội', 'Kinh', 'Việt Nam', 
  'Hà Nội', 'Hà Nội', 'Chủ hộ', '000000000001'
);

-- 2. Tạo Hộ gia đình cho ông Admin
INSERT INTO HOGIADINH (Ma_ho, Chu_ho_CCCD, Dia_chi_thuong_tru, So_thanh_vien)
VALUES ('HO_ADMIN', '000000000001', 'Hà Nội', 1);

-- 3. Tạo tài khoản đăng nhập cho Admin
INSERT INTO users (username, email, password, ho_ten, vai_tro, cccd) 
VALUES ('admin', 'admin@example.com', 'password_hash', 'Admin User', 'admin', '000000000001');

-- 4. Kích hoạt lại chế độ kiểm tra chủ hộ (Để đảm bảo dữ liệu sau này chuẩn)
ALTER TABLE CONGDAN 
ADD CONSTRAINT fk_congdan_chuho FOREIGN KEY (Chu_ho_CCCD) REFERENCES HOGIADINH(Chu_ho_CCCD);

-- --- KIỂM TRA KẾT QUẢ ---
SELECT * FROM users;