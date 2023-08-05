const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

let DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection established with DB");
  });

const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
