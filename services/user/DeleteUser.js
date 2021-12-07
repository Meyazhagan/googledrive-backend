const User = require("../../model/user");

module.exports = async function (req, res) {
    const id = req.params.id;

    const user = await User.findOneAndDelete({ _id: id });

    if (!user)
        return res.status(404).send({ error: "No User Found for given ID" });

    res.send({
        message: "Deleted the User",
        user: {},
    });
};
