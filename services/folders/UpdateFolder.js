const { isValidObjectId } = require("mongoose");
const Folder = require("../../model/folder");

module.exports = async function (req, res, next) {
    const data = req.body;
    const userId = req.user._id;
    const folderId = req.params.id;

    if (!isValidObjectId(folderId)) return res.status(400).send({ error: "Invalid folder Id" });

    const folder = await Folder.findOne({ userId: userId, _id: folderId });
    if (!folder) return res.status(404).send({ error: "Folder Not Found" });

    if (folder.folderName === "root")
        return res.status(400).send({ error: "Cannot update the root folder." });

    folder.folderName = data.folderName;

    await folder.save();

    res.send({ message: "File Updated", folder: folder });
};
