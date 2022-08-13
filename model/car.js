const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    //marque
    manufacturer: {
      type: String,
      default: "",
    },
    //modele
    model: {
      type: String,
      default: "",
    },
    //type (they use type instead of model)
    type: {
      type: String,
      default: "",
    },
    //numero serie
    serialNumber: {
      type: String,
      default: "",
    },
    //puissance
    power: {
      type: String,
      default: "",
    },
    //couleur
    color: {
      type: String,
      default: "",
    },
    vin: {
      type: Number,
      default: 0,
    },
    //valeur venale
    vv: {
      type: Number,
      default: 0,
    },
    //valeur a neuf
    vn: {
      type: Number,
      default: 0,
    },
    //valeur epave
    vEpave: {
      type: Number,
      default: 0,
    },
    //type vehicule (vehicule prive,...)
    kind: {
      type: String,
      default: "",
    },
    firstCirculationDate: {
      type: Date,
    },
    energyType: {
      type: String,
      default: "",
    },
    licencePlateNumber: {
      type: String,
      default: "",
    },
    //category
    category: {
      type: String,
      default: "Vehicule simple",
      enum: ["Vehicule simple", "Remorque", "Tracteur"],
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

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
