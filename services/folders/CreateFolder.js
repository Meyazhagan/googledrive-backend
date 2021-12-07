const { pick } = require("lodash");
const Folder = require("../../model/folder");

const bodyProps = [
    "folderName",
    "folders",
    "files",
    "parentFolder",
    "path",
    "userId",
];

module.exports = async function (req, res, next) {
    const folderData = req.body;
    const userId = req.user._id;

    folderData.userId = userId;

    const newFolder = await new Folder(pick(folderData, bodyProps));

    await newFolder.save();

    res.send({ message: "File created", folder: newFolder });
};
