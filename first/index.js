const express = require("express");
const users = require("../MOCK_DATA.json");
const fs = require("fs");
const Port = 5500;
const app = express();
app.use(express.json());
// app.get("/api/users/:id", (req, resp) => {
//   const userId = Number(req.params.id);
//   const UserDetails = users.find((user) => user.id === userId);
//   return resp.json(UserDetails);
// });
app.get("/api/users", (req, resp) => {
  resp.send(users);
});

app.post("/api/users", (req, resp) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      console.log("error");
    } else {
      console.log("done");
    }
  });
  resp.send(body);
  console.log(body);
});

app.listen(Port, () => {
  console.log(`Server started at port no ${Port}`);
});
