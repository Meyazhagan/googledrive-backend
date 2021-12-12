const { pick } = require("lodash");
const User = require("../../model/user");
const sentMail = require("../../shared/email");

const bodyProps = ["firstName", "lastName", "email", "password", "address"];

const message = {
    title: process.env.APP_NAME,
    subject: "Account Activation Link",
    heading: "Click the below link to activate your account",
    footer: "This link will be expries in 48 hours",
    action: "Activate",
};

module.exports = async function (req, res) {
    const email = req.body.email;

    const user_count = await User.where("email").equals(email).count();
    if (user_count) return res.status(400).send({ error: "User is Already exists" });

    const newUser = await new User(pick(req.body, bodyProps));

    const token = newUser.genActivationToken();

    await newUser.createRoot();

    await newUser.save();
    const link = `${process.env.FRONT_END}/verify-Activation/${token}`;

    sentMail({ user: newUser, link, message });

    const success = {
        message: "User created Succefully",
        user: pick(newUser, ["firstName", "email", "rootFolder", "_id"]),
    };

    res.send({ success });
};
