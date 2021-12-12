const File = require("../../model/file");

module.exports = async function (req, res, next) {
    const files = await File.find({ userId: req.user._id }).populate("pathIds", "folderName");
    res.send({ files });
};
