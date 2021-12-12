const { isValidObjectId } = require("mongoose");
const File = require("../../model/file");

module.exports = async function (req, res, next) {
    const data = req.body;
    const userId = req.user._id;
    const fileId = req.params.id;

    if (!isValidObjectId(fileId)) return res.status(400).send({ error: "Invalid file Id" });

    const file = await File.findOne({ userId: userId, _id: fileId });
    if (!file) return res.status(404).send({ error: "file Not Found" });

    file.fileName = data.fileName;

    await file.save();

    res.send({ message: "File Updated", file: file });
};
