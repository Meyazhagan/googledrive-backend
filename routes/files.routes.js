const router = require("express").Router();

const createFile = require("../services/files/CreateFile");
const updateFile = require("../services/files/UpdateFile");
const deleteFile = require("../services/files/DeleteFile");
const getAllFiles = require("../services/files/GetAllFiles");
const getAllFilesInFolder = require("../services/files/GetFilesInFolder");

router.get("/", getAllFiles);
router.get("/:folderId", getAllFilesInFolder);

router.post("/", createFile);
router.patch("/:id", updateFile);
router.delete("/:id", deleteFile);

module.exports = router;
