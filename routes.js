const router = require("express").Router();
const sessionController = require("./controllers/sessionController");

router.post("/session", sessionController.create);

module.exports = { router };
