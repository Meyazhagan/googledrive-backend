const { pick } = require("lodash");
const User = require("../../model/user");
const sentMail = require("../../shared/email");

const bodyProps = ["firstName", "lastName", "email", "password", "address"];

const message = {
    subject: "Account Activation Link",
    heading: "Click the below link to activate your account",
    footer: "This link will be expries in 48 hours",
    action: "Activate",
};

module.exports = async function (req, res) {
    const email = req.body.email;

    const user_count = await User.where("email").equals(email).count();

    if (user_count)
        return res.status(400).send({ error: "User is Already exists" });

    const newUser = await new User(pick(req.body, bodyProps));

    newUser.createRoot();

    const token = newUser.genActivationToken();

    await newUser.save();

    sentMail({ newUser, link: token, message });

    res.send({ message: "User created Succefully" });
};
