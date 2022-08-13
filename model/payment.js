const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    date: {
      type: String,
      default: "",
    },
    insurance: {
      type: Schema.Types.ObjectId,
      ref: "Insurance",
    },
    number: {
      type: String,
      default: "",
    },
    banque: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      default: 0,
    },
    rs: {
      type: Number,
      default: 15,
    },
    cgc: {
      type: Number,
      default: 0,
    },

    type: {
      type: String,
      default: "Cheque",
      enum: ["Cheque", "Virement", "Especes"],
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

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
