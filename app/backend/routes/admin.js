const express = require("express");
const jwt = require("jsonwebtoken");
const Attendance = require("../models/Attendance");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "my_hardcoded_super_secret_key"; // same as auth.js

// Middleware to verify JWT and admin role
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden - Admins only" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// --- Routes ---
router.get("/users", verifyAdmin, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

router.put("/user/:id", verifyAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "User details updated" });
});

router.get("/attendance", verifyAdmin, async (req, res) => {
  const { userId, date } = req.query;
  const attendance = await Attendance.find({ userId, date });
  res.json(attendance);
});

router.post("/attendance", verifyAdmin, async (req, res) => {
  const { userId, date, status } = req.body;
  const existing = await Attendance.findOne({ userId, date });

  if (existing) {
    existing.status = status;
    await existing.save();
    return res.json({ message: "Attendance updated" });
  }

  const newRecord = new Attendance({ userId, date, status });
  await newRecord.save();
  res.json({ message: "Attendance added" });
});

router.get("/attendance/all", verifyAdmin, async (req, res) => {
  const { userId } = req.query;
  const records = await Attendance.find({ userId }).sort({ date: -1 });
  res.json(records);
});

router.delete("/attendance/:id", verifyAdmin, async (req, res) => {
  await Attendance.findByIdAndDelete(req.params.id);
  res.json({ message: "Attendance deleted" });
});

router.delete("/users/:id", verifyAdmin, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  await Attendance.deleteMany({ userId });
  res.json({ message: "User and their attendance records deleted" });
});

router.put("/users/:id/role", verifyAdmin, async (req, res) => {
  const { role } = req.body;
  if (!["admin", "employee"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );
  res.json(user);
});

module.exports = router;
