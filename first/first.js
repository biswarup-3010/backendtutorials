const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 5500;

mongoose
  .connect("mongodb://localhost:27017/myFirstOp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const mySchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  job_title: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("user", mySchema);

app.post("/api/users", async (req, resp) => {
  const { first_name, last_name, email, job_title, gender } = req.body;
  console.log(first_name, last_name, email, job_title, gender);
  if (!first_name || !last_name || !job_title || !gender || !email) {
    resp.status(400).send("All fields are required...");
  }
  try {
    const result = await User.create({
      first_name,
      last_name,
      email,
      gender,
      job_title,
    });
    resp.status(201).send(result);
  } catch (err) {
    if (err.code === 11000) {
      resp.send("duplicate emails are there");
    } else {
      resp.send(err);
    }
  }
});

app.get("/users", async (req, resp) => {
  const allData = await User.find({});
  resp.send(`
  <ol>
    ${allData
      .map(
        (user) =>
          `<li>${user.first_name} ${user.last_name}, Email : ${user.email} </li>`
      )
      .join("")}
  </ol>
`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
