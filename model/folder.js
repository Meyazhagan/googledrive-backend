const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;
const objectId = mongoose.SchemaTypes.ObjectId;

const FolderSchema = new Schema({
    folderName: {
        type: String,
        maxlength: 255,
        required: true,
        trim: true,
    },
    folders: {
        type: [objectId],
        ref: "Folder",
    },
    files: {
        type: [objectId],
        ref: "File",
    },
    parentFolder: {
        type: objectId,
        required: true,
        ref: "Folder",
    },
});

const Folder = model("Folder", FolderSchema);

module.exports = Folder;
