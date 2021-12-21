const router = require("express").Router();

const getFile = require("../services/files/getFile");
const createFile = require("../services/files/CreateFile");
const updateFile = require("../services/files/UpdateFile");
const deleteFile = require("../services/files/DeleteFile");
const getAllFiles = require("../services/files/GetAllFiles");
const getAllFilesInFolder = require("../services/files/GetFilesInFolder");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", getAllFiles);
router.get("/subfile/:folderId", getAllFilesInFolder);

router.get("/:id", getFile);

router.post("/", upload.single("file_upload"), createFile);

router.patch("/:id", updateFile);
router.delete("/:id", deleteFile);

module.exports = router;
