const User = require("../../model/user");
const { pick } = require("lodash");

const bodyProps = ["firstName", "lastName", "email", "password", "address"];

module.exports = async function (req, res) {
    const email = req.body.email;
    const user_count = await User.where("email").equals(email).count();
    console.log(user_count);
    if (user_count)
        return res.status(400).send({ error: "User is Already exists" });

    const newUser = await new User(pick(req.body, bodyProps));

    await newUser.save();

    res.send({ message: "User created Succefully" });
};
