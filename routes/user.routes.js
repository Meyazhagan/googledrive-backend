const router = require("express").Router();

const { validateBody, type } = require("../helper/joiSchema");

const updateUser = require("../services/user/UpdateUser");
const deleteUser = require("../services/user/DeleteUser");
const registerUser = require("../services/user/RegisterUser");

router.post("/register", validateBody(type.USER), registerUser);
router.patch("/update/:id", validateBody(type.UPDATE_USER), updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
