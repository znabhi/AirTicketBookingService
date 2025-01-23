const express = require("express");
const v1ApiRoute = require("./v1/index");
const router = express.Router();

router.use("/v1", v1ApiRoute);

module.exports = router;
