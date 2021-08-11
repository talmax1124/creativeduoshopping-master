import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Mailgun from "mailgun-js";
import bcrypt from "bcryptjs";

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
      isMilitary: user.isMilitary,
      profileImage: user.profileImage,
      profileBackground: user.profileBackground,
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

  if (validatename < 2) {
    res.status(400);
    throw new Error("Name must be of 2 characters  or more length ");
  }
  if (validatepassword < 6) {
    res.status(400);
    throw new Error("Password length must be greater than 5");
  }

  const tokengenerate = jwt.sign(
    { name, email, password, phone },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
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
 
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=">
  <title></title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

    body {
      margin: 0;
      padding: 0;
      padding-top: 20px;
      padding-bottom: 20px;
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      box-sizing: border-box;
      background-color: #f2f2f2;
    }

    img {
      width: 100%;
      border: 0;
      outline: none;
    }

    h2 {
      padding: 50px 0 0 0;
      margin: 0;
      font-weight: 700;
      font-size: 25.31px;
      line-height: 29.8734177px;
    }

    p.text-main {
      margin: 0;
      padding-top: 16.7088608px;
      font-size: 15.1898734px;
    }

    .wrapper {
      max-width: 470px;
      margin: 0 auto;
      height: 100%;
    }

    .container {
      background-color: #FAFAF9;
      height: inherit;
      -webkit-box-shadow: inset 0px 0px 0px 0.8px #E4E4E4;
      -moz-box-shadow: inset 0px 0px 0px 0.8px #E4E4E4;
      box-shadow: inset 0px 0px 0px 0.8px #E4E4E4;
      border-radius: 2px;
    }

    .header {
      position: relative;
      background: #201F2F;
      /*height: 80px;*/
      text-align: center;
      color: #FAFAF9;
      font-weight: 700;
      font-size: 17.72px;
      /*line-height: 80px;*/
      padding: 31px 11% 31px 11%;
      border-radius: 2px 2px 0 0;
    }

    .main-content {
      padding: 28px 11% 20px 11%;
      text-align: center;
      color: #201F2F;
    }

    .button {
      text-decoration: none;
      border-radius: 3px;
      font-size: 15.1898734px;
      font-weight: 700;
      color: #FAFAF9;
      outline: 0;
      outline-offset: 0;
      border: 0;
      background-color: #6484BC;
      padding-top: 15px;
      padding-bottom: 15px;
      padding-left: 40px;
      padding-right: 40px;
      display: inline-block;
      margin-top: 30.8860759px;
    }

    .footer {
      height: 90px;
      padding-top: 15.6962025px;
      padding-left: 11%;
      padding-right: 11%;
      font-size: 12.6582278px;
      line-height: 14.6835443px;
      text-align: center;
    }

    .footer p,
    .footer a {
      font-size: 10.6582278px;
      line-height: 12.6835443px;
      margin: 0;
      padding: 0;
      padding-bottom: 5.56962025px;
      color: #a9a9a9;
    }

    p.sub-text {
      margin: 0;
      padding-top: 100px;
      font-size: 15.1898734px;
      color: #62626d;
    }

    p.long-link {
      font-size: 10.1265823px;
      text-align: justify;
      overflow-wrap: anywhere;
      color: #62626d;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
      Creative Duo
      </div>
      <div class="main-content">
        <img src="https://i.ibb.co/1J6y513/undraw-festivities-tvvj-transparent.png" alt="undraw-festivities-tvvj-transparent" border="0">
        <h2>You're nearly there!</h2>
        <p class="text-main">We just need to verify your email address to complete setting up your account.</p>
        <a href="${process.env.CLIENT_URL}/verify/${tokengenerate}" class="button">Verify Email</a>
        <p class="sub-text">Or paste this link into your browser:</p>
        <p class="long-link">${process.env.CLIENT_URL}/verify/${tokengenerate}</p>
      </div>
    </div>
    <div class="footer">
      <p>If you have not signed up at Creative Duo, please ignore this email.</p>
      <p>Sent by Creative Duo &#8226; <a href="https://creativeduo.net">creativeduo.net</a> </p>
    </div>
  </div>
</body>

</html>
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
          "A verification email has been sent with a link to finish registration and verification. If you do not see the email in your inbox, it may be in the spam folder. This email may take about a minute to arrive",
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

    const { name, email, password, phone, profileImage } = jwt.decode(token);

    const user = await User.create({
      name,
      email,
      password,
      phone,
      profileImage,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        ispromember: user.ispromember,
        isMilitary: user.isMilitary,
        phone: user.phone,
        profileImage: user.profileImage,
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
      isMilitary: user.isMilitary,
      profileImage: user.profileImage,
      profileBackground: user.profileBackground,
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
    user.profileImage = req.body.profileImage || user.profileImage;
    user.profileBackground =
      req.body.profileBackground || user.profileBackground;
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
      isMilitary: updateUser.isMilitary,
      phone: updatedUser.phone,
      profileImage: updatedUser.profileImage,
      profileBackground: updatedUser.profileBackground,
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

const forgotPassword = (req, res) => {
  const { email } = req.body;
  var mg = new Mailgun({
    apiKey: process.env.MailGunAPI,
    domain: process.env.MailGunDomain,
  });

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist" });
    }

    const token = generateToken(user._id);
    const data = {
      from: "Creative Duo Shopping <creativeduo2020@gmail.com>",
      to: email,
      subject: "Reset Your Password",
      html: `
      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                          <a href="https://creativeduo.net" title="logo" target="_blank">
                            <img width="60" src="https://i.ibb.co/mFJm6yt/Creative-Duo-New-Logo.png" title="logo" alt="logo">
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href="${process.env.CLIENT_URL}/reset-password/${token}"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>creativeduo.net</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <br></br>
    <p style="color: red;">If by any chance you clicked the submit button button, please wait until a new email arrives. If you only clicked it once, please continue by clicking button above</p>
</body>

      `,
    };

    return user.updateOne({ resetLink: token }, function (err, success) {
      if (err) {
        return res.status(400).json({ error: "Reset password link error" });
      } else {
        mg.messages().send(data, function (error, body) {
          if (error) {
            return res.json({ error: error.message });
          }
          return res.json({
            message:
              "Email Has Been Sent To Email You Have Inputted Below. If this email exists, you should recieve an email in about 30 seconds. If you haven't recieved an email, please visit the spam folder or wait a couple minutes more. If this still doesn't work, please click the submit button once again.",
          });
        });
      }
    });
  });
};

//@desc Allows user to update password using the resetLink received in email
//@route PUT /api/users/reset-password
//@access Public

const resetPassword = (req, res) => {
  const { resetLink, newPass } = req.body;
  if (resetLink) {
    jwt.verify(
      resetLink,
      process.env.JWT_SECRET,
      function (error, decodedData) {
        if (error) {
          return res
            .status(401)
            .json({ message: "Token incorrect or expired" });
        }
        User.findOne({ resetLink }, function (err, user) {
          if (err || !user) {
            return res
              .status(400)
              .json({ message: "Token incorrect or expired" });
          }
          const obj = {
            password: newPass,
            resetLink: "",
          };

          user = Object.assign(user, obj);

          user.save((err, result) => {
            if (err) {
              return res
                .status(401)
                .json({ error: "Token incorrect or expired" });
            } else {
              res
                .status(200)
                .json({ message: "Your password has been changed" });
            }
          });
        });
      }
    );
  } else {
    return res.status(401).json({ error: "Authentication Error" });
  }
};

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
    (user.isMilitary = req.body.isMilitary),
      (user.phone = req.body.phone || user.phone);
    user.profileImage = req.body.profileImage || user.profileImage;
    user.profileBackground =
      req.body.profileBackground || user.profileBackground;

    const updatedUser = await user.save();

    const response = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      ispromember: updatedUser.ispromember,
      isMilitary: updatedUser.isMilitary,
      profileImage: updatedUser.profileImage,
      profileBackground: updatedUser.profileBackground,
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
  forgotPassword,
  resetPassword,
};
