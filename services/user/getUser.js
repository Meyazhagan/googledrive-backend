const { isValidObjectId } = require("mongoose");
const User = require("../../model/user");

const userProps = "firstName lastName email address rootFolder storageLimit isActivated";

module.exports = async function (req, res, next) {
    const id = req.params.id;

    if (!isValidObjectId(id)) return res.status(400).send({ error: "The given Id is Invalid" });

    const user = await User.findOne({ _id: id }).select(userProps);

    if (!user) return res.status(404).send({ error: "No user Found for given ID" });

    const success = { user: user.toObject({ virtuals: true }) };

    res.send({ success });
};
