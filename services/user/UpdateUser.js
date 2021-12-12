const User = require("../../model/user");
const { pick } = require("lodash");
const { isValidObjectId } = require("mongoose");

const bodyProps = ["firstName", "lastName", "address"];

module.exports = async function (req, res) {
    const _id = req.params.id;

    if (!isValidObjectId(_id)) return res.status(400).send({ error: "The given Id is Invalid" });

    const user = await User.findOneAndUpdate(
        { _id },
        { $set: pick(req.body, bodyProps) },
        { new: true }
    );

    if (!user) return res.status(404).send({ error: "No User Found for given ID" });

    const success = {
        message: "Updated the User",
        user: pick(user, ["email", "_id", ...bodyProps]),
    };

    res.send({ success });
};
