const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, default: "" },
    email: { type: String, required: true, index: true },
    password: { type: String, default: "" },
    role: { type: Array, default: "default" },
    expertWorkspace: { type: Schema.Types.ObjectId, ref: "ExpertWorkspace" },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
const User = mongoose.model("User", userSchema);

module.exports = User;
