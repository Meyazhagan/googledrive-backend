const User = require("../../model/user");
const sentMail = require("../../shared/email");

const message = {
    title: process.env.APP_NAME,
    subject: "Account Activation Link",
    heading: "Click the below link to activate your account",
    footer: "This link will be expries in 48 hours",
    action: "Activate",
};

module.exports = async function (req, res, next) {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: "Invalid Email ID" });

    if (user.isActivated) return res.status(400).send({ error: "User is already verified" });

    const token = user.genActivationToken();

    await user.save();

    sentMail({ user, link: token, message });

    const success = { message: "Email send" };

    res.send({ success });
};
