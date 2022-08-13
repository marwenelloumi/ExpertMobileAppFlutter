const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    originalname: { type: String },
    name: { type: String },
    url: { type: String },
    state: { type: String, enum: ["Avant", "Apres", "Pendant"] },
    expertWorkspace: {
      type: Schema.Types.ObjectId,
      ref: "ExpertWorkspace",
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
