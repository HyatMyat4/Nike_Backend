const express = require("express");

const router = express.Router();

const {
  getOrderdata,
  DeleteOrder,
  GetUserOrder,
} = require("../controller/orderdata");

router.get("/", getOrderdata);

router.get("/GetUserOrder/:id", GetUserOrder);

router.delete("/Delete/:id", DeleteOrder);

module.exports = router;
