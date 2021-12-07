const User = require("../model/user");

module.exports = async function (req, res, next) {
    const token = req.headers.auth_token;
    if (!token) return res.status(404).send({ error: "Token Not Present" });

    const payload = User.verifyToken(token);
    if (!payload) return res.status(400).send({ error: "Token Expires" });

    if (payload.process !== "login")
        return res.status(403).send({ error: "Invalid Auth Token" });

    const user = await User.findById(payload.id);
    if (!user) return res.status(401).send({ error: "Invalid Auth Token" });

    req.user = user;

    next();
};
