

const route = require("express").Router();
const protect = require("../middleware/auth.middleware");
const AuthController = require("../controllers/auth.controllers");

route.post("/login", AuthController.UserLogin);
route.get("/profile", AuthController.UserProfile);
// route.patch("/update/:id",protect, AuthController.UpdateProfile);
// route.delete("/logout/:id", protect, AuthController.logoutUser);


module.exports = route;