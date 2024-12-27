const { loginController, registerController, authController } = require("../controllers/userCtrls")

const authMiddleware = require("../middlewares/authMiddleware")
const express = require("express")

//router object
const router=express.Router()

//routes

//Login||POST
router.post("/login",loginController)

//Register||POST
router.post("/register",registerController)

//Auth || POST
router.post("/getUserData", authMiddleware, authController)

// Single export at the end
module.exports = router
