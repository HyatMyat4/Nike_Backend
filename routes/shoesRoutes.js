const express = require("express");

const router = express.Router();

const {
  getallshoes,
  getSingleshoe,
  addShoes,
  Updateshoe,
  deleteShoes,
} = require("../controller/shoes");

router.get("/getallShoes", getallshoes);

router.get("/getSingleshoe/:id", getSingleshoe);

router.post("/addShoes", addShoes);

router.patch("/Update/:id", Updateshoe);

router.delete("/DeleteShoes/:id", deleteShoes);

module.exports = router;
