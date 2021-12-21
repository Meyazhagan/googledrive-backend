const Folder = require("../../model/folder");

module.exports = async function (req, res, next) {
    const folders = await Folder.find({ userId: req.user._id })
        .populate("pathIds", "folderName")
        .populate("folders", "folderName")
        .populate("files", "fileName key");
    res.send({ folders });
};
