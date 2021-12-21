const File = require("../../model/file");
const { getFileStream } = require("../../shared/s3");

module.exports = async function (req, res, next) {
    // const userId = req.user._id;
    const key = req.params.key;
    // console.log("in Object");

    const file = await File.find({
        // userId: userId,
        key: key,
    });
    if (!file) return res.status(403).send({ error: "There is No File" });

    const readStream = getFileStream(key);

    readStream.pipe(res);
};
