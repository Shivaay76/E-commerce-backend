const express = require("express");

// create a router
const router = express.Router();

// import controllers
const { signup, login  } = require("../controllers/auth");


// ****************** Authentication Routes ********************************
router.post("/signup", signup );

router.post("/login", login )

// ---------------------------------------------------------------------------



module.exports = router;