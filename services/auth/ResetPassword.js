const User = require("../../model/user");

module.exports = async function (req, res, next) {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
    });

    if (!user) return res.status(404).send({ error: "Invalid Token" });

    user.password = req.body.password;

    await user.save();

    res.send({ message: "Successfully reset the password" });
};
