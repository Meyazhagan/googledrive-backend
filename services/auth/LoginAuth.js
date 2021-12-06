const User = require("../../model/user");

module.exports = async function (req, res, next) {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).send({ error: "Email Not Found" });

    const isValid = await user.comparePassword(req.body.password);
    if (!isValid)
        return res.status(403).send({ error: "Invalid User and Password" });

    const authToken = user.getAuthToken();
    res.send({ message: "Logged in Successfully", token: authToken });
};
