const ShopModel = require("../models/shopModel");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/defalut.json");

// post shop
module.exports.shop_post = async (req, res) => {
  try {
    const user = await ShopModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

//get all users
module.exports.shops_get = async (req, res) => {
  await ShopModel.find(
    {},
    null,
    { sort: { date: "asc" }, limit: 10 },
    function (error, users) {
      if (error) {
        res.status(404).json("Users not found");
      } else {
        res.status(200).json(users);
      }
    }
  );
};

//get user base on ID
module.exports.shops_get_byID = async (req, res) => {
  await ShopModel.find({ shopNewID: req.params.id }, function (error, shop) {
    if (error) {
      res.status(404).json("Shop not found");
    } else {
      res.status(200).json(shop);
    }
  });
};

//login
module.exports.authenticate_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const shop = await ShopModel.login(email, password);

    const token = createToken(shop._id);
    console.log(token);

    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({
      token: token,
      data: shop,
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

//create Jwt
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, SECRET, {
    expiresIn: maxAge,
  });
};

const handleErrors = (error) => {
  const errors = { email: "", password: "" };

  //dublicate email error handle
  if (error.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }
  //validation errors
  if (error.message.includes("user validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  //incorrect email
  if (error.message === "Incorrect email") {
    errors.email = "that email not regitered";
  }

  //incorrect password
  if (error.message === "Incorrect Password") {
    errors.password = "that password incorrect ";
  }

  return errors;
};
