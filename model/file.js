const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;
const objectId = mongoose.SchemaTypes.ObjectId;

const FileSchema = new Schema({
    fileName: {
        type: String,
        maxlength: 255,
        required: true,
        trim: true,
    },
    fileLink: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    parentFolder: {
        type: objectId,
        ref: "Folder",
        required: true,
    },
});

const File = model("File", FileSchema);

module.exports = File;
