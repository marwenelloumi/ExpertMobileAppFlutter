const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partsHistorySchema = new Schema(
  {
    name: { type: String, default: "" },
    price: { type: Number, default: 0 },
    manufacturer: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: "",
    },
    source: { type: String },
    expertWorkspace: { type: Schema.Types.ObjectId, ref: "ExpertWorkspace" },
  },
  { timestamps: true }
);

const PartsHistory = mongoose.model("PartsHistory", partsHistorySchema);

module.exports = PartsHistory;
