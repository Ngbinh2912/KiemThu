// 1. LUÔN ĐẶT DOTENV Ở DÒNG ĐẦU TIÊN
require('dotenv').config(); 

const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const path = require('path');
const moment = require('moment');

// Import cấu hình và database
const database = require("./config/database.js");
const systemConfig = require("./config/system");

// Import routes
const route = require('./routes/client/index.route.js');
const routeAdmin = require('./routes/admin/index.route.js');

const app = express();
const port = process.env.PORT || 5000;

// Kết nối database - sẽ được gọi trong hàm start()

// Cấu hình Middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

// Cấu hình Session & Flash (ĐÃ SỬA LỖI CẢNH BÁO)
app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: process.env.JWT_SECRET || 'binh2912', // Sử dụng secret từ .env
    resave: false,                                   // Fix cảnh báo resave
    saveUninitialized: true,                         // Fix cảnh báo saveUninitialized
    cookie: { maxAge: 60000 }
}));
app.use(flash());

// Cấu hình View Engine (Pug)
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Static Files
app.use(express.static(`${__dirname}/public`));

// TinyMCE (Trình soạn thảo văn bản)
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Biến toàn cục cho file Pug (App Local Variables)
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// Sử dụng Routes
route(app);
routeAdmin(app);

// Xử lý lỗi 404 (Luôn đặt sau cùng các route chính)
app.get("*", (req, res) => {
    res.render("client/page/error/404", {
        pageTitle: "404 NOT FOUND"
    });
});

// Chạy server
app.listen(port, async () => {
    await database.connect();
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;