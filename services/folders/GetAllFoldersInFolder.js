const { isValidObjectId } = require("mongoose");
const Folder = require("../../model/folder");

module.exports = async function (req, res, next) {
    const userId = req.user._id;
    const folderId = req.params.folderId;

    if (!isValidObjectId(folderId)) return res.status(400).send({ error: "Invalid folder Id" });

    const current = await Folder.findOne({
        userId: userId,
        _id: folderId,
    }).populate("folders", "folderName");

    res.send({ folders: current.folders });
};
