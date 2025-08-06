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
  const { id } = req.query;
  const db = await connectDB();

  if (req.method === "PUT") {
    const { name, room_no, contact } = req.body;
    await db.execute(
      "UPDATE students SET name=?, room_no=?, contact=? WHERE id=?",
      [name, room_no, contact, id]
    );
    res.status(200).json({ message: "Student updated successfully" });
  }

  if (req.method === "DELETE") {
    await db.execute("DELETE FROM students WHERE id=?", [id]);
    res.status(200).json({ message: "Student deleted successfully" });
  }
}
