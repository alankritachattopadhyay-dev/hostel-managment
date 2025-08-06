import { useEffect, useState } from "react";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", room_no: "", contact: "" });
  const [editId, setEditId] = useState(null);

  // Fetch Students
  const fetchStudents = async () => {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add or Update Student
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch(`/api/students/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: "", room_no: "", contact: "" });
    setEditId(null);
    fetchStudents();
  };

  // Delete Student
  const handleDelete = async (id) => {
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    fetchStudents();
  };

  // Edit Student
  const handleEdit = (student) => {
    setForm({ name: student.name, room_no: student.room_no, contact: student.contact });
    setEditId(student.id);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Hostel Management System</h1>
      
      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Room No"
          value={form.room_no}
          onChange={(e) => setForm({ ...form, room_no: e.target.value })}
          required
        />
        <input
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"} Student</button>
      </form>

      {/* Display Table */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Room No</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.room_no}</td>
              <td>{s.contact}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
