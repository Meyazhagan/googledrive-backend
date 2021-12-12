const User = require("../../model/user");
const sentMail = require("../../shared/email");

const message = {
    title: process.env.APP_NAME,
    subject: "Reset Password Link",
    heading: "Click the Below Link to reset the password",
    footer: "This Link will be expries in 10 minutes",
    action: "Verify",
};

module.exports = async function (req, res, next) {
    const email = req.body.email;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).send({ error: "Invalid Email ID" });

    if (!user.isActivated) return res.status(400).send({ error: "User is not verified" });

    const token = user.genResetToken();

    sentMail({ user, link: token, message });

    await user.save();

    const success = { message: "Email send" };
    res.send({ success });
};
