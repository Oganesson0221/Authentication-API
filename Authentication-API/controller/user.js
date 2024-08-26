const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");
const User = require("../model/User");

const userCtrl = {
  //! Register

  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    //! Validations

    if (!username || !email || !password) {
      throw new Error("Please all fields are required");
    }

    //! Check if user already exists

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    //! Hash the user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //! Create the user and save it in the DB

    const userCreated = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    //! Send the response

    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated.id,
    });
  }),

  //! Login

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //! Check if user email exists

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    //! Check if user password is valid

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    //! Generate the token

    const token = jwt.sign({ id: user._id }, "anykey", { expiresIn: "30d" });
    // We can use any property of the user but make sure the property we use is unique
    //The token will expire in thirty days

    //! Send the response

    res.json({
      message: "Login successful",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),

  //! Profile

  profile: asyncHandler(async (req, res) => {
    //! Find the user

    const user = await User.findById("66cbe4a9c66561e506fb4625").select(
      "-password"
    );
    res.json({ user });
  }),
};

module.exports = userCtrl;
