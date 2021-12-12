const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;
const objectId = mongoose.SchemaTypes.ObjectId;

const User = require("./user");

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
        ref: "Folder",
        default: null,
    },
    pathIds: {
        type: [objectId],
        ref: "Folder",
        default: [],
    },
    // path: {
    //     type: [String],
    //     required: true,
    //     default: [],
    // },
    userId: {
        type: objectId,
        ref: "User",
        required: true,
    },
});

FolderSchema.pre("save", async function (next) {
    if (this.isModified("parentFolder")) {
        const parent = await Folder.findOne({
            userId: this.userId,
            _id: this.parentFolder,
        });

        if (parent) {
            // this.path = [...parent.path, parent.folderName];
            this.pathIds = [...parent.pathIds, parent._id];
            parent.folders.push(this._id);
            await parent.save();
        } else {
            // setting message and status code
            throw new Error(["Invalid Parent Folder", 400]);
        }
    }

    next();
});

const Folder = model("Folder", FolderSchema);

module.exports = Folder;
