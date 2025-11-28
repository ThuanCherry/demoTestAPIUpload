// models/Meme.js
const mongoose = require("mongoose");

const LayerSchema = new mongoose.Schema(
  {
    name: String,
    x: Number,
    y: Number,
    w: Number,
    h: Number,
    rotate: { type: Number, default: 0 },
  },
  { _id: false }
);

const MemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    source: {
      type: String,
      enum: ["internal", "partner", "user"], //cho phép
      default: "user",
    },
    imageUrl: { type: String, default: "" }, // URL full image
    thumbnailUrl: { type: String, default: "" }, // URL thumbnail
    layers: { type: [LayerSchema], default: [] },
    tags: { type: [String], default: [] },
    copyright: {
      owner: { type: String, default: "" },
      licensed: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meme", MemeSchema);
