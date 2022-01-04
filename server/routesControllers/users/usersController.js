const bcrypt = require("bcrypt");
const UsersModel = require("../../models/users/UsersModel");
const authHelper = require("../../helpers/users/authHelper");

//! User register --------------------------------
exports.register = async (req, res) => {
  const { name, username, email, sex, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userContent = {
      name,
      username,
      email,
      sex,
      hash: hashedPassword,
    };

    const user = await UsersModel.create(userContent);
    return res.status(200).json({ message: "You are registed." });
  } catch (err) {
    return res.status(404).send(err.message);
  }
};

//! Login --------------------------------------------
exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await UsersModel.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user)
      return res.status(404).json({
        message: "User is not found. Please check username or email.",
      });

    const checkedPassword = await bcrypt.compare(password, user.hash);

    if (checkedPassword) {
      const token = await authHelper.generateToken(user);
      const cookieOption = {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      };

      return res.status(200).cookie("jwt", token, cookieOption).json({
        message: "Login successful",
        name: user.name,
      });
    } else {
      return res.status(400).json({ message: "Password is incorrect." });
    }
  } catch (err) {
    return res.status(404).send(err.message);
  }
};

//! Logout ----------------------------------
exports.logout = async (req, res) => {
  res
    .clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json({ message: "You are logged out." });
};

//! Profile ----------------------------------
exports.profile = async (req, res) => {
  try {
    const user = await UsersModel.findById(req.user._id).select(
      "name username email sex account"
    );
    if (!user) return res.status(404).send("User is not found.");

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

//!update Profile Username--------------
exports.updateUsername = async (req, res) => {
  try {
    const { username, newUsername } = req.body;

    const changeContent = {
      username: newUsername,
    };

    const userProfile = await UsersModel.findOneAndUpdate(
      { username },
      changeContent,
      { new: true }
    );

    if (!userProfile) {
      return res.status(404).send("User is not found.");
    }
    userProfile.username = newUsername;

    return res.status(200).send("Username is updated.");
  } catch (err) {
    return res.status(404).send(err.message);
  }
};

//!update Profile Email--------------
exports.updateEmail = async (req, res) => {
  try {
    const { email, newEmail } = req.body;

    const changeContent = {
      email: newEmail,
    };

    const userProfile = await UsersModel.findOneAndUpdate(
      { email },
      changeContent,
      { new: true }
    );

    if (!userProfile) {
      return res.status(404).send("User is not found.");
    }
    userProfile.email = newEmail;

    return res.status(200).send("Email is updated.");
  } catch (err) {
    return res.status(404).send(err.message);
  }
};
