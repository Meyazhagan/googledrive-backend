const router = require("express").Router();
const { type, validateBody } = require("../helper/joiSchema");

const createFolder = require("../services/folders/CreateFolder");
const updateFolder = require("../services/folders/UpdateFolder");
const deleteFolder = require("../services/folders/DeleteFolder");
const getAllFolders = require("../services/folders/GetAllFolders");
const getAllFoldersInFolder = require("../services/folders/GetAllFoldersInFolder");
const getFolderById = require("../services/folders/GetFolderById");

router.get("/", getAllFolders);
router.get("/subfolder/:folderId", getAllFoldersInFolder);
router.get("/:id", getFolderById);

router.post("/", validateBody(type.FOLDER), createFolder);
router.patch("/:id", validateBody(type.FOLDER), updateFolder);
router.delete("/:id", deleteFolder);

module.exports = router;
