const router = require("express").Router();

const createFolder = require("../services/folders/CreateFolder");
const updateFolder = require("../services/folders/UpdateFolder");
const deleteFolder = require("../services/folders/DeleteFolder");
const getAllFolders = require("../services/folders/GetAllFolders");
const getAllFoldersInFolder = require("../services/folders/GetAllFoldersInFolder");

router.get("/", getAllFolders);
router.get("/:folderId", getAllFoldersInFolder);

router.post("/", createFolder);
router.patch("/:id", updateFolder);
router.delete("/:id", deleteFolder);

module.exports = router;
