const router = require("express").Router();
const googleController = require("../../controllers/googleController");

router.route("/api/google").get(googleController.findAll);

module.exports = router;