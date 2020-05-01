const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.port || 3000;
const search = require("./routes/search");
const meals = require("./routes/meals");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/search", search);
app.use("/", meals);

app.listen(port, () => {
  console.log("Server is running at " + port);
});
