const router = require("express").Router();

const { validateBody, type } = require("../helper/joiSchema");

const loginAuth = require("../services/auth/LoginAuth");
const resetPassword = require("../services/auth/ResetPassword");
const forgotPassword = require("../services/auth/ForgotPassword");
const resendActivation = require("../services/auth/ResendActivation");
const accountActivation = require("../services/auth/AccountActivation");

router.post("/login", validateBody(type.LOGIN), loginAuth);
router.post("/forgot-password", validateBody(type.EMAIL), forgotPassword);
router.post("/resend-activation", validateBody(type.EMAIL), resendActivation);
router.post(
    "/reset-password/:resetToken",
    validateBody(type.PASSWORD),
    resetPassword
);

router.get("/verify-activation/:activationToken", accountActivation);

module.exports = router;
