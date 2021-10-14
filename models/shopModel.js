const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const shopSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [true],
      lowercase: true,
      validate: [isEmail, "Please Enter the valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter an password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    discreption: {
      type: String,
    },
    role: {
      type: String,
      default: "shop",
    },
    shopNewID: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

shopSchema.pre("save", async function (next) {
  const solt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, solt);
  next();
});

shopSchema.statics.login = async function (email, password) {
  const shop = await this.findOne({ email });

  if (shop) {
    const auth = await bcrypt.compare(password, shop.password);
    if (auth) {
      return shop;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect email");
};

const ShopModel = mongoose.model("Shop", shopSchema);

module.exports = ShopModel;
