const router = require("express").Router();
const search = require("./search");

router.get("/", search);

module.exports = router;
