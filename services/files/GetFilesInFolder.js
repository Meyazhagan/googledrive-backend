const { isValidObjectId } = require("mongoose");
const File = require("../../model/file");
const Folder = require("../../model/folder");

module.exports = async function (req, res, next) {
    const userId = req.user._id;
    const folderId = req.params.folderId;

    if (!isValidObjectId(folderId)) return res.status(400).send({ error: "Invalid folder Id" });

    const folder = await Folder.findOne({
        userId: userId,
        _id: folderId,
    }).populate("files", fileName);

    if (!folder) return res.status(400).send({ error: "Invalid folder Id" });

    res.send({ files: folder.files });
};
