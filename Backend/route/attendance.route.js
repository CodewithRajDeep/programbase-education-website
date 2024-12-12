import express from "express";
import Attendance from "../model/attendance.model.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/", async (req, res) => {
  const { name, status } = req.body;
  try {
    const newRecord = new Attendance({ name, status });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/:id", async (req, res) => {
  const { name, status } = req.body;
  try {
    const updatedRecord = await Attendance.findByIdAndUpdate(
      req.params.id,
      { name, status },
      { new: true } 
    );
    if (!updatedRecord) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await Attendance.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/bulk", async (req, res) => {
  const records = req.body;
  if (!Array.isArray(records)) {
    return res.status(400).json({ error: "Request body must be an array of records" });
  }
  try {
    const newRecords = await Attendance.insertMany(records);
    res.status(201).json(newRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/add", async (req, res) => {
  const { name, status } = req.body;

  if (!name || !status) {
    return res.status(400).json({ error: "Name and status are required fields" });
  }

  try {
    const newAttendance = new Attendance({ name, status });
    await newAttendance.save();
    res.status(201).json({ message: "Attendance record added successfully", record: newAttendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
