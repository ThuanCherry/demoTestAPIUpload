exports.uploadFace = (req, res) => {
  if (req.file) {
    return res.status(400).json({
      msg: "No file uploaded",
    });
  }
  const filename = req.file.filename;
  const url = `${req.protocol}://${req.get("host")}/uploads/${filename}`;
  //http://localhost:3000/uploads/1719241.png
  //protocol  host                filename
  res.json({
    url,
    filename,
  });
};
