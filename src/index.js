require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/link", require("./routes/linkroutes"));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
