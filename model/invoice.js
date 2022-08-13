const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema(
  {
    name: { type: String },
    uri: { type: String },
    expertWorkspace: {
      type: Schema.Types.ObjectId,
      ref: "ExpertWorkspace",
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;
