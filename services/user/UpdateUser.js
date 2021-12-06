const User = require("../../model/user");
const { pick } = require("lodash");

const bodyProps = ["firstName", "lastName", "address"];

module.exports = async function (req, res) {
    const id = req.params.id;
    const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: pick(req.body, bodyProps) },
        { new: true }
    );
    console.log(user);
    if (!user)
        return res.status(404).send({ error: "No User Found for given ID" });

    res.send({
        message: "Updated the User",
        user: pick(user, ["email", "_id", ...bodyProps]),
    });
};
