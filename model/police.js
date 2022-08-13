const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const policeSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    contrat: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "Assurance",
      enum: ["Assurance", "Prive", "Hors convention"],
    },
    InsuredValue: { type: Number, default: 0 },

    claim: {
      type: Schema.Types.ObjectId,
      ref: "Claim",
    },
    expertWorkspace: {
      type: Schema.Types.ObjectId,
      ref: "ExpertWorkspace",
    },
    numTel: {
      type: String,
      default: "",
    },
    deleted: {
      type: Boolean,
      default: "false",
    },
  },
  {
    timestamps: true,
  }
);

const Police = mongoose.model("Police", policeSchema);

module.exports = Police;
