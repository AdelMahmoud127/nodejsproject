/*
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ✅ تسجيل مستخدم جديد
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ status: "error", message: "يرجى إدخال جميع البيانات" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ status: "error", message: "البريد الإلكتروني مسجل مسبقًا" });
    }

    const user = await User.create({ name, email, password, role });
    
    res.status(201).json({
      status: "success",
      message: "تم التسجيل بنجاح",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "حدث خطأ أثناء التسجيل" });
  }
};

// ✅ تسجيل الدخول
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "error", message: "المستخدم غير موجود" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: "error", message: "كلمة المرور غير صحيحة" });
    }

    res.status(200).json({
      status: "success",
      message: "تم تسجيل الدخول بنجاح",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "حدث خطأ أثناء تسجيل الدخول" });
  }
};

*/

import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ✅ تسجيل مستخدم جديد
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ status: "error", message: "يرجى إدخال جميع البيانات" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ status: "error", message: "البريد الإلكتروني مسجل مسبقًا" });
    }

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id);

    res.status(201).json({
      status: "success",
      message: "تم التسجيل بنجاح",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

// ✅ تسجيل الدخول
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "error", message: "المستخدم غير موجود" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: "error", message: "كلمة المرور غير صحيحة" });
    }

    res.status(200).json({
      status: "success",
      message: "تم تسجيل الدخول بنجاح",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "حدث خطأ أثناء تسجيل الدخول" });
  }
};

// ✅ تحديث بيانات المستخدم
export const forgotPassword = asyncHandler(async (req, res, next) => {
    //! 1] Get user by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new appError(`There no user with this email: ${req.body.email}`, 404));
    }

    //! 2] Generate hash code (6 digits) and save in database
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

    //* Saved into database
    user.hashedCode = hashedCode;
    user.hashedCodeExpires = Date.now() + 10 * 60 * 1000;
    user.hashedCodeVerified = false;

    await user.save();

    //! Send the code via email
    const options = {
        email: user.email,
        subject: 'Password Reset Request',
        text: `You requested a password reset.`,
        message: `
            <p>You requested a password reset.</p>
            <p>this is your code:</p>
            <h1>${code}</h1>
            <p>If you didn't request a password reset, please ignore this email.</p>
            <p>Thanks!</p>
        `
    }
    try {
        await sendEmail(options);
    } catch (err) {
        user.hashedCode = undefined;
        user.hashedCodeExpires = undefined;
        user.hashedCodeVerified = undefined;

        await user.save();
        console.log(err.message);
        return next(new appError('There is an error in sending email', 500));
    }

    res.status(200).json({ status: 'success', message: 'reset code sent to e-mail' });
});

// ✅ Verify reset code
export const verifyResetCodePassword = asyncHandler(async (req, res, next) => {
    //! 1] Get user based on reset code
    const hashedCode = crypto.createHash('sha256').update(req.body.code).digest('hex');

    const user = await User.findOne({ 
        hashedCode,
        hashedCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
        return next(new appError('Reset Code invalid or expired', 500));
    }

    //! 2] Reset code valid
    user.hashedCodeVerified = true;
    await user.save();

    res.status(200).json({ status: 'OK' });
});

// ✅ Reset password
export const resetPassword = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return next(new appError('There is no user with email', 404));
    }

    if (!user.hashedCodeVerified) {
        return next(new appError('Reset code not verified', 400));
    }

    user.password = password;
    user.hashedCode = undefined;
    user.hashedCodeExpires = undefined;
    user.hashedCodeVerified = undefined;
    
    await user.save();

    //! if Ok generate token
    const token = generateToken(user._id);

    res.status(200).json({
        status: 'OK',
        message: 'Your password has been updated successfully',
        token,
    });
});