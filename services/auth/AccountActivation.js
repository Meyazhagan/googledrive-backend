const User = require("../../model/user");

module.exports = async function (req, res, next) {
    const activationToken = req.params.activationToken;

    const user = await User.findOne({
        activationToken: activationToken,
    });
    if (!user)
        return res.status(404).send({ error: "Invalid Activation Token" });

    const payload = User.verifyToken(activationToken);
    if (!payload) return res.status(404).send({ error: "Token Expires" });

    user.isActivated = true;

    await user.save();

    res.send({ message: "Successfully reset the password" });
};
