const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.port || 3000;
const search = require("./routes/search");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/search", search);

app.listen(port, () => {
  console.log("Server is running at " + port);
});
