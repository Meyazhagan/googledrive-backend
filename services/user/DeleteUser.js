const { isValidObjectId } = require("mongoose");
const User = require("../../model/user");

module.exports = async function (req, res) {
    const _id = req.params.id;

    if (!isValidObjectId(_id)) return res.status(400).send({ error: "The given Id is Invalid" });

    const user = await User.findOneAndDelete({ _id });

    if (!user) return res.status(404).send({ error: "No User Found for given ID" });

    const success = { message: "Deleted the User", user: {} };

    res.send({ success });
};
