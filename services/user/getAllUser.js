const User = require("../../model/user");

const userProps = "firstName lastName email address rootFolder storageLimit isActivated";

module.exports = async function (req, res, next) {
    const allUser = await User.find().select(userProps);

    const success = { users: allUser };

    res.send({ success });
};
