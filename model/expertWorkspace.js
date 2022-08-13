const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expertWorkspaceSchema = new Schema(
  {
    name: { type: String, default: "" },
    email: { type: String },
    address: { type: String, default: "" },
    matFiscal: { type: String, default: "" },
    region: { type: String, default: "" },
    tel: { type: String, default: "" },
    fax: { type: String, default: "" },
    signature: { type: String, default: "" },

    customDescriptions: {
      epaveEconomique: { type: String, default: "" },
      circonstanceConforme: { type: String, default: "" },
      circonstanceNonConforme: { type: String, default: "" },
    },

    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    cars: [{ type: Schema.Types.ObjectId, ref: "Car" }],

    missions: [{ type: Schema.Types.ObjectId, ref: "Mission" }],
  },
  { timestamps: true }
);

const ExpertWorkspace = mongoose.model(
  "ExpertWorkspace",
  expertWorkspaceSchema
);

module.exports = ExpertWorkspace;
