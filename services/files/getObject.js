const File = require("../../model/file");
const { getFileStream } = require("../../shared/s3");

module.exports = async function (req, res, next) {
    console.log(req.params);
    const key = req.params.key;

    const file = await File.find({
        userId: userId,
        key: key,
    });

    if (!file) return res.statuc(403).send({ error: "Can't access this Object" });

    const readStream = getFileStream(key);

    readStream.pipe(res);
};
