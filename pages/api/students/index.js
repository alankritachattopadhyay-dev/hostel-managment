import { connectDB } from "../../../lib/db";
import Cors from "cors";

// ✅ Add this here
const cors = Cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors); // ✅ Apply CORS here
  const db = await connectDB();

  if (req.method === "GET") {
    const [rows] = await db.execute("SELECT * FROM students");
    res.status(200).json(rows);
  }

  if (req.method === "POST") {
    const { name, room_no, contact } = req.body;
    await db.execute(
      "INSERT INTO students (name, room_no, contact) VALUES (?, ?, ?)",
      [name, room_no, contact]
    );
    res.status(201).json({ message: "Student added successfully" });
  }
}
