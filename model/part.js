const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partSchema = new Schema(
  {
    referance: { type: String },
    quantity: { type: Number, default: 1 },
    name: { type: String },
    price: { type: Number, default: 0 },
    tva: { type: Number, default: 19 },
    reduction: { type: Number, default: 0 },
    vetus: { type: Number, default: 0 },
    paintJob: { type: Number, default: 0 },
    workHours: { type: Number, default: 0 },
    state: { type: String, default: "" },
    report: { type: Schema.Types.ObjectId, ref: "Report" },
    expertWorkspace: { type: Schema.Types.ObjectId, ref: "ExpertWorkspace" },
  },
  { timestamps: true }
);

const Part = mongoose.model("Part", partSchema);

module.exports = Part;
