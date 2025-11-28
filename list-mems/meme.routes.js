const express = require("express");
const router = express.Router();

const { listMemes } = require("../controllers/meme.controller.js");

router.get("/list-memes", listMemes);
module.exports = router;
