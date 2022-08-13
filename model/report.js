const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moSchema = new Schema({
  designation: {
    type: String,
    enum: [
      "Tolerie",
      "Mecanique",
      "Electricite",
      "Tapisserie",
      "Peinture",
      "Pose Glace",
      "Electronique",
      "Géométrie",
      "Pose sur marbre",
    ],
  },
  pricePerHour: { type: Number, default: 0 },
  numberOfHours: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  reduction: { type: Number, default: 0 },
  tva: { type: Number, default: 0 },
});

const reportSchema = new Schema(
  {
    examinationLocation: {
      type: String,
      default: "",
    },

    examinationDate: {
      type: String,
      default: "",
    },
    vehiculeExpertise: {
      type: String,
      default: "police",
      enum: ["police", "tiers"],
    },
    va: {
      type: Number,
      default: 0,
    },
    vehiculeState: {
      type: String,
      default: "",
    },
    indexKm: {
      type: String,
      default: "",
    },
    immDays: {
      type: Number,
      default: 0,
    },
    circumstance: {
      avant: { type: Boolean, default: false },
      pendant: { type: Boolean, default: false },
      apres: { type: Boolean, default: false },
    },

    //type observation
    //should it be a custom/predefined description
    typeDescriptionCircumstance: {
      type: String,
      default: "Avis Libre",
      enum: [
        "Avis Libre",
        "Circonstance Conforme",
        "Circonstance Non Conforme",
      ],
    },
    //depending on typeDescriptionCircumstance observation can change according to dynamic description attached to user account
    observation: {
      type: String,
      default: "",
    },

    numberOfCopies: {
      type: Number,
      default: 0,
    },
    numberOfReceips: {
      type: Number,
      default: 0,
    },
    numberOfImages: {
      type: Number,
      default: 0,
    },
    numberOfInvoices: { type: Number, default: 0 },
    numberOfQuotes: { type: Number, default: 0 },
    laborFixPrice: {
      type: Number,
      default: 22,
    },
    laborReplacingPrice: {
      type: Number,
      default: 22,
    },
    laborElectricityPrice: {
      type: Number,
      default: 10,
    },
    laborPaintPrice: {
      type: Number,
      default: 22,
    },
    participation: {
      type: Number,
      default: 0,
    },
    recovery: {
      type: Number,
      default: 0,
    },

    creationDate: {
      type: String,
    },
    status: {
      type: String,
    },
    wrecked: {
      type: String,
      default: "N/A",
      enum: ["Economique", "Technique", "N/A"],
    },

    crashNature: {
      type: String,
    },

    crashDescription: {
      //this is more of a note then anything else
      type: String,
    },
    initial_parts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Part",
      },
    ],
    final_parts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Part",
      },
    ],
    AIDamagedParts: [
      {
        _id: false,
        name: String,
        outcome: String,
        confidence_parts: Number,
        confidence_outcome: Number,
        boundingBox: [Number],
        damage: [String],
        filename: String,
        image_url: String,
        damage_mask_url: String,
        part_mask_url: String,
        part_damage_mask_url: String,
      },
    ],
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
      },
    ],

    //depricated and should be removed
    // use parts
    invoices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Invoice",
      },
    ],
    //depricated
    // remove associated code and remove this part
    //use files
    greyCard: [{ type: String }],
    files: [
      {
        originalname: { type: String },
        name: { type: String },
        url: { type: String },
        type: { type: String },
        createdAt: { type: Date, default: new Date() },
      },
    ],
    mos: [moSchema],
    claim: {
      type: Schema.Types.ObjectId,
      ref: "Claim",
    },

    expertWorkspace: { type: Schema.Types.ObjectId, ref: "ExpertWorkspace" },

    canvas: {
      arrows: [
        {
          tension: { type: Number },
          Xpos: { type: Number },
          Ypos: { type: Number },
          Xscale: { type: Number },
          Yscale: { type: Number },
          rotation: { type: Number },
        },
      ],
      imageUsed: { type: String, default: "Layer_1" },
      finalImage: {
        type: String,
        default: `${process.env.IP}:${process.env.PORT}/Layer_1.png`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
