const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");
const { validationResult } = require("express-validator");

//register user
module.exports.registerUser = async (req, res, next) => {
  try {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 
    const { fullname, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.comaparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
