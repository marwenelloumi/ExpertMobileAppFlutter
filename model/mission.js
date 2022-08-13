const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const missionSchema = new Schema(
  {
    //depricated
    //using missionNumber instead
    // to be deleted
    number: {
      type: String,
      default: "",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    missionNumber: {
      number: { type: Number },
      year: { type: Number },
      key: { type: String },
    },
    description: {
      type: String,
      default: "",
    },
    missionDate: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "Expertise normale",
      enum: [
        "Expertise normale",
        "Deuxième expertise",
        "Contre expertise",
        "Arbitrage",
      ],
    },
    state: {
      type: String,
      default: "To Do",
      enum: ["To Do", "In Progress", "Done", "deleted"],
    },
    claim: { type: Schema.Types.ObjectId, ref: "Claim" },
    expertWorkspace: { type: Schema.Types.ObjectId, ref: "ExpertWorkspace" },
    insuranceAgency: { type: Schema.Types.ObjectId, ref: "Agency" },

    // should also add a referance to insurance company
  insuranceCompany: { type: Schema.Types.ObjectId, ref: "Insurance" },
    honoraire: { type: Schema.Types.ObjectId, ref: "Honoraire" },
  },
  { timestamps: true }
);

const Mission = mongoose.model("Mission", missionSchema);

module.exports = Mission;
