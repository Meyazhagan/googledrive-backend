const mongoose = require("mongoose");
const Folder = require("./folder");

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
    pathIds: {
        type: [objectId],
        ref: "Folder",
        default: [],
    },
    userId: {
        type: objectId,
        ref: "User",
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
});

FileSchema.pre("save", async function (next) {
    if (this.isModified("parentFolder")) {
        const parent = await Folder.findOne({
            userId: this.userId,
            _id: this.parentFolder,
        });

        if (parent) {
            this.pathIds = [...parent.pathIds, parent._id];
            parent.files.push(this._id);
            await parent.save();
        } else {
            throw new Error(["Invalid Parent Folder", 400]);
        }
    }

    next();
});

const File = model("File", FileSchema);

module.exports = File;
