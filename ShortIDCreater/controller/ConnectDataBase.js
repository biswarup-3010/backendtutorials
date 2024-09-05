const mongoose = require("mongoose");
const ConnectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/Project1")
    .then(() => console.log("Mongo DB connected"))
    .catch((err) => console.log(err));
};
module.exports = { ConnectDB };
