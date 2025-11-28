// src/routes/uploadFace.routes.js
const express = require("express");
const router = express.Router();
const { uploadFace } = require("../controllers/upload.controller.js"); //xử lý logic
const upload = require("../utils/multerConfig"); //cấu hình user load nhiều ảnh

router.post("/upload-face", upload.arrays("imgs"), uploadFace);

module.exports = router;
