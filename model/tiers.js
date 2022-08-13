const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tiersSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    contrat: {
      type: String,
      default: "",
    },
    immatriculation: {
      type: String,
      default: "",
    },
    doss: {
      type: String,
      default: "",
    },
    address: { type: String, default: "" },
    insuranceCompanyName: String,
    agencyName: String,
    type: {
      type: String,
      default: "Aucun",
      enum: ["Aucun", "Assurance", "Connexe", "Autres"],
    },
    category: {
      type: String,
      default: "Vehicule simple",
      enum: ["Vehicule simple", "Remorque", "Tracteur"],
    },
    insuranceAgency: {
      type: Schema.Types.ObjectId,
      ref: "Insurance",
    },
    claim: {
      type: Schema.Types.ObjectId,
      ref: "Claim",
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

const Tiers = mongoose.model("Tiers", tiersSchema);

module.exports = Tiers;
