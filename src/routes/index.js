const express = require("express");
const router = express.Router();

const v1ApiRoute = require("./v1/index"); // auth + district routes
const v1PattaHolderRoute = require("./v1/pattaHolder"); // patta holder CRUD

router.use('/v1/auth', v1ApiRoute);
router.use('/v1/patta-holder', v1PattaHolderRoute);

module.exports = router;
