const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Folder = require("./folder");
const File = require("./file");

const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new Schema({
    firstName: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 2048,
        required: true,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    rootFolder: {
        type: ObjectId,
        ref: "Folder",
    },
    storageLimit: {
        type: Number,
        default: 100 * 1024 * 1024,
    },
    activationExpire: Date,
    activationToken: String,
    resetPasswordExpire: Date,
    resetPasswordToken: String,
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    next();
});

UserSchema.methods.genActivationToken = function () {
    const twoDays = 172800000; // 2 * 24 hr * 60 min * 60 sec * 1000 ms
    const payload = { email: this.email, id: this._id, process: "activation" };
    const options = { expiresIn: "2d" };

    const activationToken = jwt.sign(payload, process.env.JWT_SECRET, options);

    this.activationToken = activationToken;
    this.activationExpire = new Date(+new Date() + twoDays);

    return activationToken;
};

UserSchema.methods.getAuthToken = function () {
    const payload = {
        email: this.email,
        id: this._id,
        process: "login",
        rootFolder: this.rootFolder,
    };
    const options = { expiresIn: "1d" };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

UserSchema.methods.genResetToken = function () {
    const tenMinutes = 10 * (60 * 1000);
    const resetToken = crypto.randomBytes(50).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + tenMinutes;
    return resetToken;
};

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.createRoot = async function () {
    const newFolder = await new Folder({
        userId: this._id,
        folderName: "root",
    });
    await newFolder.save();
    this.rootFolder = newFolder._id;
};

UserSchema.statics.verifyToken = function (token) {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch (err) {
        return null;
    }
};

const User = model("User", UserSchema);

module.exports = User;
