const express = require("express");

const router = express.Router();

const { CheckOut } = require("../controller/checkout");
const { WEb_Hook } = require("../controller/Webhook");

router.post("/", CheckOut);

router.post("/WebHook", express.raw({ type: "application/json" }), WEb_Hook);

module.exports = router;
