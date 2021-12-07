const Folder = require("../../model/folder");

module.exports = async function (req, res, next) {
    const userId = req.user._id;
    const folderId = req.params.id;

    const folder = await Folder.find({
        userId: userId,
        _id: folderId,
    }).populate("pathIds", "folderName");

    res.send({ folder });
};
