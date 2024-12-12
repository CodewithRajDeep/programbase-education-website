import mongoose from "mongoose";
import Attendance from "./model/attendance.model.js";

const URI = process.env.MongoDBURI;

async function seedAttendance() {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        const attendanceRecords = [
            { userId: "66a88b6a34fd572e5c166b56", status: "Present" },
            { userId: "66a898bb1bf2cf46f89116b3", status: "Absent" },
            { userId: "66a915571bf2cf46f891173f", status: "Late" },
        ];

        await Attendance.insertMany(attendanceRecords);
        console.log("Attendance data seeded successfully");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding data:", error);
        mongoose.connection.close();
    }
}

seedAttendance();
