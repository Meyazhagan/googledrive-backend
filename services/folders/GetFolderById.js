const Folder = require("../../model/folder");

module.exports = async function (req, res, next) {
    const userId = req.user._id;
    const folderId = req.params.id;

    const folder = await Folder.findOne({
        userId: userId,
        _id: folderId,
    })
        .populate("pathIds", "folderName")
        .populate("folders", "folderName")
        .populate("files", "fileName key");

    res.status(200).send({ folder });
};
