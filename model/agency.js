const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agencySchema = new Schema(
  {
    name: { type: String, required: true },
    insurance: { type: Schema.Types.ObjectId, ref: "Insurance" },
    //should be removed
    missions: [{ type: Schema.Types.ObjectId, ref: "Mission" }],
    //tiers: [{ type: Schema.Types.ObjectId, ref: "Tiers" }],
  },
  { timestamps: true }
);

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
