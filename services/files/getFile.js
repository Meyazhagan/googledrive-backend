const File = require("../../model/file");

module.exports = async function (req, res, next) {
    const userId = req.user._id;
    const fileId = req.params.id;

    const file = await File.find({
        userId: userId,
        _id: fileId,
    }).populate("pathIds", "folderName");

    res.send({ file });
};
