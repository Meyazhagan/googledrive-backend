const { pick } = require("lodash");
const File = require("../../model/file");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile } = require("../../shared/s3");
const { isValidObjectId } = require("mongoose");

const bodyProps = ["fileName", "parentFolder", "userId", "fileLink", "key", "size"];

module.exports = async function (req, res, next) {
    const fileData = {};
    const user = req.user;
    const file = req.file;
    const parentFolder = req.body.parentFolder;
    // setting properities
    fileData.fileName = file.originalname;
    fileData.size = file.size;

    fileData.userId = user._id;
    if (isValidObjectId(parentFolder)) fileData.parentFolder = parentFolder;
    else fileData.parentFolder = user.parentFolder;

    const fileUploaded = await uploadFile(file);

    fileData.key = fileUploaded.Key;
    fileData.fileLink = fileUploaded.Location;

    await unlinkFile(file.path);

    const newFile = await new File(pick(fileData, bodyProps));

    await newFile.save();

    res.send({ message: "File created", file: newFile });
};

// req.file - size
// req.file - parent Id
// {
//     fieldname: 'file_upload',
//     originalname: 'favicon.ico',
//     encoding: '7bit',
//     mimetype: 'image/x-icon',
//     destination: 'uploads/',
//     filename: '917f8cb0e68600d85f01c24dbe793a0e',
//     path: 'uploads\\917f8cb0e68600d85f01c24dbe793a0e',
//     size: 12966
//   }
//   {
//     ETag: '"9e96ddb6e219f50b04cc618d944ae80d"',
//     VersionId: 'rOmsT73Ue4SqyqaQI8MFVK0k8LAt0dh8',
//     Location: 'https://my-google-drive.s3.ap-south-1.amazonaws.com/917f8cb0e68600d85f01c24dbe793a0e',
//     key: '917f8cb0e68600d85f01c24dbe793a0e',
//     Key: '917f8cb0e68600d85f01c24dbe793a0e',
//     Bucket: 'my-google-drive'
//   }
