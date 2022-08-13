const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const claimSchema = new Schema(
  {
    activeStep: {
      type: Number,
      default: 0,
    },
    claimNumber: {
      type: String,
      default: "",
    },
    claimDate: {
      type: String,
      default: "",
    },

    //depricated (same as claimDate)
    //to be removed
    accidentDate: {
      type: String,
      default: "",
    },

    mission: {
      type: Schema.Types.ObjectId,
      ref: "Mission",
    },
    police: {
      type: Schema.Types.ObjectId,
      ref: "Police",
    },
    tiers: {
      type: Schema.Types.ObjectId,
      ref: "Tiers",
    },

    report: {
      type: Schema.Types.ObjectId,
      ref: "Report",
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
    type: {
      type: String,
      default: "Accident",
      enum: [
        "Accident",
        "Vol total",
        "Vol",
        "Incendie",
        "Bris de glace",
        "Tous risque",
        "Evaluation",
      ],
    },
    kind: {
      type: String,
      defualt: "N/A",
      enum: ["RGA", "GA", "Grele", "N/A"],
    },
    expertWorkspace: {
      type: Schema.Types.ObjectId,
      ref: "ExpertWorkspace",
    },
  },
  {
    timestamps: true,
  }
);

const Claim = mongoose.model("Claim", claimSchema);

module.exports = Claim;
