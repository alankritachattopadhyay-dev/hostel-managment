Here’s a **short version** of your README.md ✅

````markdown
# 🏨 Hostel Management System

A simple Hostel Management System with **Next.js + MySQL** backend and a **CodePen frontend**.

---

## ⚙️ Setup

### 1️⃣ Backend
```bash
npm install
npm run dev
````

Create MySQL DB:

```sql
CREATE DATABASE hostel_db;
USE hostel_db;
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  room_no VARCHAR(10),
  contact VARCHAR(15)
);
```

Update `lib/db.js` with DB credentials.

---

### 2️⃣ Network Setup

Find your IPv4:

```bash
ipconfig
```

Example: `192.168.0.133`

Allow **Node.js** in Windows Firewall (Private + Public).

---

### 3️⃣ Frontend (CodePen)

Set API URL:

```javascript
const API_URL = "http://192.168.0.133:3001/api/students";
```

---

### 4️⃣ Test

Visit:

```
http://192.168.0.133:3001/api/test
```

Should return:

```json
{ "message": "Hello from backend" }
```

---

✅ Backend must run while using CodePen frontend.

```

Do you want me to **include the test API code** in this short README so others can check connection quickly?
```
