const { ConnectDB } = require("./controller/ConnectDataBase");
const express = require("express");
const Port = 5500;
// ConnectDB();

const app = express();

app.listen(Port, (err, data) => {
  if (err) {
    console.error(`Error : ${err}`);
  } else {
    console.log(`server started at port no. : ${Port}`);
  }
});
