const express = require("express");
const app = express();
const POST = 3000;
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    req.errorMessage = "File is not a valid image";
    cb(null, false);
  }
};
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  if (req.errorMessage) {
    return res.status(422).json({
      msg: req.errorMessage,
    });
  }
  return res.status(200).json({ msg: "Img upload successfull" });
});

const uploadImgs = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
      cb(null, true);
    } else {
      req.errorMessage = "Img is not a valid png";
      cb(null, false);
    }
  },
});
//multiple-file
app.post("/mutiple-img", uploadImgs.array("images"), (req, res) => {
  console.log(req.files);
  if (req.errorMessage) {
    return res.status(422).json({
      msg: req.errorMessage,
    });
  }
  return res.status(200).json({ msg: "Img upload successfull" });
});

//mở cổng
app.listen(POST, () => {
  console.log("Server đang chạy ở PORT: " + POST);
});
