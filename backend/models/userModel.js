import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
    },
    profileBackground: {
      type: String,
    },
    phone: {
      type: Number,
      default: null,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    ispromember: {
      type: Boolean,
      default: false,
    },
    isMilitary: {
      type: Boolean,
      default: false,
    },
    isgoldmember: {
      type: Boolean,
      default: false,
    },
    isWishlist: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
    resetLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
