const express = require("express");

// create a router
const router = express.Router();

// import controllers
const { getCart, addItem, removeItem } = require("../controllers/cart");

// *********************** Cart Routes ****************************
router.get("/", getCart);

router.post("/", addItem);

router.delete("/:id", removeItem);
// -----------------------------------------------------------------------------------------------------





module.exports = router;