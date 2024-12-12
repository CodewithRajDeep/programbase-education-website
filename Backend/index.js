import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import attendanceRoute from "./route/attendance.route.js"; 

const app = express();


app.use(cors());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST"]
}));

dotenv.config();

const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;


app.get("/", (req, res) => {
  res.send("Backend is running");
});


app.post("/api/messages", (req, res) => {
  const { text } = req.body;
  res.json({ text: `Bot says: ${text}`, sender: "bot" });
});

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));


app.use("/book", bookRoute); 
app.use("/user", userRoute);
app.use("/attendance", attendanceRoute); 

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
