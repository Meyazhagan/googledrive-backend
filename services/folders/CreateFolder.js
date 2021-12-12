const { pick } = require("lodash");
const Folder = require("../../model/folder");

const bodyProps = ["folderName", "folders", "files", "parentFolder", "path", "userId"];

module.exports = async function (req, res, next) {
    const folderData = req.body;
    const user = req.user;

    folderData.userId = user._id;
    folderData.parentFolder = folderData.parentFolder || user.rootFolder;

    const newFolder = await new Folder(pick(folderData, bodyProps));

    await newFolder.save();

    res.send({ message: "Folder created", folder: newFolder });
};
