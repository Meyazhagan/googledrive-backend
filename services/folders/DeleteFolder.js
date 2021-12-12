const { isValidObjectId } = require("mongoose");
const Folder = require("../../model/folder");

module.exports = async function (req, res) {
    const id = req.params.id;
    const userId = req.user._id;

    if (!isValidObjectId(id)) return res.status(400).send({ error: "Invalid folder Id" });

    const folder = await Folder.findOne({ userId: userId, _id: id });
    if (!folder) return res.status(404).send({ error: "Folder Not Found" });

    if (folder.folderName === "root")
        return res.status(400).send({ error: "Cannot delete the root folder." });

    const allSubFolders = await Folder.deleteMany({
        userId: userId,
        $or: [{ pathIds: { $in: [folder._id] } }, { _id: id }],
    });

    res.send({ allSubFolders });
};
