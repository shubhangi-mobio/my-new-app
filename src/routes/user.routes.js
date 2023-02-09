const route = require("express").Router();
const UserController = require("../controllers/user.contollers");
const protect = require("../middleware/auth.middleware");

//  Handle incoming POST requests to /user

route.post("/register", UserController.SignUp);
route.get("/getall", UserController.GetAll);
route.get("/getbyid/:id", UserController.GetById);
route.delete("/delete/:id", UserController.deleteUser);
// route.put('/update/:id', protect, UserController.updateUser);


module.exports = route;


