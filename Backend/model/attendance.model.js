import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

const defaultAttendanceRecords = [
  { name: "John Doe", status: "Present" },
  { name: "Jane Smith", status: "Absent" },
  { name: "Alice Johnson", status: "Present" },
  { name: "Bob Brown", status: "Late" },
  { name: "Charlie Davis", status: "Present" },
  { name: "Diana Evans", status: "Absent" },
  { name: "Ethan Foster", status: "Present" },
  { name: "Fiona Green", status: "Late" },
  { name: "George Hill", status: "Present" },
  { name: "Hannah Irving", status: "Absent" },
];


const seedDefaultRecords = async () => {
  try {
    const existingRecords = await Attendance.countDocuments();
    if (existingRecords === 0) {
      await Attendance.insertMany(defaultAttendanceRecords);
      console.log("attendance records added successfully.");
    } else {
      console.log("Attendance records already exist.");
    }
  } catch (error) {
    console.error("Error seeding default attendance records:", error.message);
  }
};

seedDefaultRecords();

export default Attendance;
