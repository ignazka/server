const User = require('./user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const isValidationError = error =>
  error instanceof mongoose.Error.ValidationError;

const isMongoError = error => error === 11000;

const isObjectID = id => mongoose.Types.ObjectId.isValid(id);
async function signup(req, res) {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res
        .status(400)
        .json({ message: 'password and email are required' })
        .end();
    }
    const isUser = await User.findOne({ email }).lean();

    if (isUser) {
      return res.status(400).json({ message: 'email already in use' }).end();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword });

    const sessionUser = { email: user.email, _id: user._id };
    req.session.user = sessionUser;

    return res.status(200).json(sessionUser).end();
  } catch (error) {
    if (isValidationError(error)) {
      return res.status(400).json({ message: 'validation error' }).end();
    }
    if (isMongoError(error)) {
      return res.status(400).json({ message: 'database error' }).end();
    }
    res.status(500).json({ message: error.message }).end();
  }
}

async function login(req, res) {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res
        .status(400)
        .json({ message: 'password and email are required' })
        .end();
    }
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Email not found. Please Signup.' })
        .end();
    }

    const isValidUser = await bcrypt.compare(password, user.password);
    const sessionUser = { email: user.email, _id: user._id };
    if (isValidUser) {
      return res.status(200).json(sessionUser).end();
    }

    return res.status(400).json({ message: 'wrong password' }).end();
  } catch (error) {
    if (isValidationError(error)) {
      return res.status(400).json({ message: 'validation error' }).end();
    }
    if (isMongoError(error)) {
      return res.status(400).json({ message: 'database error' }).end();
    }
    res.status(500).json({ message: error.message }).end();
  }
}

async function logout(req, res) {
  try {
    await req.session.destroy();
    return res.status(200).json({ message: 'successfully logged out!' }).end();
  } catch (error) {
    return res.status(500).json({ message: error.message }).end();
  }
}

async function isLoggedIn(req, res) {
  try {
    const user = req.session.user;
    if (user) {
      return res.status(200).json(user).end();
    }
    return res.status(400).json(null).end();
  } catch (error) {
    return res.status(500).json({ message: error.message }).end();
  }
}

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find().lean();
    return res.status(200).json(allUsers).end();
  } catch (error) {
    return res.status(500).json({ message: error.message }).end();
  }
}

async function deleteUser(req, res) {
  try {
    const { userID } = req.params;
    if (!isObjectID) {
      return res.status(400).json({ message: 'User ID is not valid' }).end();
    }
    const user = await User.findByIdAndDelete(userID).lean();
    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(500).json({ message: error.message }).end();
  }
}

module.exports = {
  signup,
  login,
  logout,
  isLoggedIn,
  getAllUsers,
  deleteUser,
};
