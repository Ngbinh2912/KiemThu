const mongoose = require('mongoose');

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Chỉ chờ tối đa 5 giây
            family: 4                       // Ép dùng IPv4
        });
        console.log("--- KẾT NỐI DATABASE THÀNH CÔNG ---");
    } catch (error) {
        console.log("--- LỖI KẾT NỐI DATABASE ---");
        console.log(error);
    }
}