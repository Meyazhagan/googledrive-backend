const User = require("../../model/user");
const crypto = require("crypto");

module.exports = async function (req, res, next) {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

    const user = await User.findOne({ resetPasswordToken });

    if (!user) return res.status(404).send({ error: "Invalid Token" });

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    const success = { message: "Successfully reset the password" };

    res.send({ success });
};
