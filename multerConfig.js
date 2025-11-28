const multer = require("multer");
//dùng multer của nodejs giúp user có thể upload ảnh
const path = require("path");
const fs = require("fs"); //fs: file systems dùng đề đọc file, ghi, xóa file, có thể kiểm tra file có tồn tại không
const MAX_SIZE = 10 * 1024 * 1024;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads"; //
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      //Nếu ko có thư mục uploads để lưu ảnh thì tự thêm vào
    }
    cb(null, dir); //cb: callback(error, result)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
//kiểm loại tệp sử dụng

fileFilter = (req, file, cb) => {
  const allowedType = ["image/jpeg", "image/png"];

  if (!allowedType.includes(file.mimetype)) {
    return cb(new Error("File đó định dạng sai rồi bạn ới"), false);
  }
  cb(null, true);
};

module.exports = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter,
});
