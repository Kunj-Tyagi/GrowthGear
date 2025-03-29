const express = require("express");
const router = express.Router();
const queryController = require("../controllers/queryControllers");
const explainController = require("../controllers/explainControllers");
const validateController = require("../controllers/validateControllers");

router.get("/query", queryController.processQuery);
router.get("/explain", explainController.explainQuery);
router.get("/validate", validateController.validateQuery);

module.exports = router;
