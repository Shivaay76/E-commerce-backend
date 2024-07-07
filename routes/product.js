const express = require("express");

// create a router
const router = express.Router();

// import controllers
const { getAllProducts, addProduct, updateProduct, removeProduct, getProduct } = require("../controllers/product");
const { auth , isAdmin  } = require("../middlewares/auth");


// *********************** Product Routes ****************************
router.get("/", getAllProducts);

router.get("/:id", getProduct)

router.post("/add",auth,isAdmin, addProduct);

router.put("/update/:id",auth, isAdmin, updateProduct)

router.delete("/:id",auth, isAdmin, removeProduct)

// -----------------------------------------------------------------------------------------------------

module.exports = router;