// controllers/meme.controller.js
const Meme = require("../models/Meme");
exports.listMemes = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit || "20", 10))
    );
    const skip = (page - 1) * limit;
    //dụng param query
    const filters = {};
    if (req.query.tag) filters.tags = req.query.tag; //?tag=love => {tag" : "love"}
    if (req.query.source) filters.source = req.query.source;
    if (req.query.q) filters.name = new RegExp(req.query.q, "i");

    // count + find in parallel
    const [total, items] = await Promise.all([
      Meme.countDocuments(filters),
      Meme.find(filters)
        .sort({ createdAt: -1 }) //mới nhất lên trước
        .skip(skip)
        .limit(limit)
        .select("name slug imageUrl thumbnailUrl tags source createdAt")
        .lean(),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    res.json({
      ok: true,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
      data: items,
    });
  } catch (err) {
    console.error("listMemes error", err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};
