import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Mailgun from "mailgun-js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      ispromember: user.ispromember,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const verificationLink = asyncHandler(async (req, res) => {
  let { name, email, password, phone } = req.body;
  // console.log(req.body)
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email is already registered");
  }
  const validatename = name.length;
  // console.log(validatename)
  const validatepassword = password.length;
  // console.log(validatepassword)

  if (validatename < 3) {
    res.status(400);
    throw new Error("Name must be of 3 characters  or more length ");
  }
  if (validatepassword < 6) {
    res.status(400);
    throw new Error("Password length must be greater than 5");
  }

  const tokengenerate = jwt.sign(
    { name, email, password, phone },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );
  //send email to regitering user
  var mailgun = new Mailgun({
    apiKey: process.env.MailGunAPI,
    domain: process.env.MailGunDomain,
  });
  var data = {
    from: "Creative Duo Shopping <creativeduo2020@gmail.com>",
    to: email,
    subject: "Account activation link",

    html: `
    <img src="https://i.ibb.co/0DCPbRR/Artboard-1.jpg" alt="header" width="100%">
    <br><br/>
    Verification Link: ${process.env.CLIENT_URL}/verify/${tokengenerate}
    <br><br/>
    <hr />
    <p>This email may contain sensetive information</p>
    <b><p>Domain:</p></b>
    <p>${process.env.CLIENT_URL}</p>

    <br><br/><br><br/><br><br/>

    This email is sent from the website ${process.env.CLIENT_URL} and all information is secure.

    `,
  };

  

  mailgun.messages().send(data, function (error, info) {
    if (error) {
      res.status(400);
      throw new Error(error);
    } else {
      // console.log('Email sent: ' + info.response)
      res.status(201).json({
        response:
          "A verification email has been sent with a link to finish registration and verification. If you do not see the email in your inbox, it may be in the spam folder.",
      });
    }
  });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET),
      function (err, decoded) {
        if (err) {
          // console.log('JWT verify error')
          return res.status(401).json({
            error: "Expired Link. Signup Again",
          });
        }
      };

    const { name, email, password, phone } = jwt.decode(token);

    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        ispromember: user.ispromember,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      ispromember: user.ispromember,
    };

    if (user.googleId) {
      response.googleId = user.googleId;
    }
    res.json(response);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    const response = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      ispromember: updateUser.ispromember,
      phone: updatedUser.phone,
      token: generateToken(updatedUser._id),
    };

    if (updatedUser.googleId) {
      response.googleId = updatedUser.googleId;
    }

    res.json(response);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort([["createdAt", -1]]);
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  const admins = await User.find({ isAdmin: true });
  if (admins.length === 0) {
    throw Error("admin user can't be deleted");
  }

  if (user) {
    await user.remove();
    res.json({ message: "User has been removed from the database" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.ispromember = req.body.ispromember;
    user.phone = req.body.phone || user.phone;

    const updatedUser = await user.save();

    const response = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      ispromember: updatedUser.ispromember,
    };

    if (updatedUser.googleId) {
      response.googleId = updatedUser.googleId;
    }

    res.json(response);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  verificationLink,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
