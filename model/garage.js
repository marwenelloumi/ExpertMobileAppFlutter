const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const garageSchema = new Schema(
  {
    name: { type: String },
    location: { type: String },
    //should be removed
    tel: { type: String },
    expertWorkspace: { type: Schema.Types.ObjectId, ref: "ExpertWorkspace" },
  },
  { timestamps: true }
);

const Garage = mongoose.model("Garage", garageSchema);

module.exports = Garage;
