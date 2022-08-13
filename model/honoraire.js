const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const honoraireSchema = new Schema(
  {
    openFees: { type: Number, default: 25 },
    imageFees: { type: Number, default: 0 },
    investigationFees: { type: Number, default: 0 },
    otherFees: { type: Number, default: 0 },
    remunerationFees: { type: Number, default: 0 },
    travelFees: { type: Number, default: 0 },
    //damageCosts: { type: Number, default: 0 },
    //honoraire: { type: Number, default: 0 },
    //total: { type: Number, default: 0 },
    //totalTTC: { type: Number, default: 0 },
    //tva: { type: Number, default: 0 },
    usedTVAPercentage: { type: Number, default: 13 },
    mission: { type: Schema.Types.ObjectId, ref: "Mission" },
    payments: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
    expertWorkspace: {
      type: Schema.Types.ObjectId,
      ref: "ExpertWorkspace",
    },
  },
  { timestamps: true }
);

const Honoraire = mongoose.model("Honoraire", honoraireSchema);

module.exports = Honoraire;
