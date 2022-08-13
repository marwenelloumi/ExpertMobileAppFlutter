const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insuranceSchema = new Schema(
  {
    name: { type: String, uppercase: true },
    logo: { type: String },
    key: { type: String },
    agencies: [{ type: Schema.Types.ObjectId, ref: "Agency" }],
  },
  { timestamps: true }
);

const Insurance = mongoose.model("Insurance", insuranceSchema);

module.exports = Insurance;
