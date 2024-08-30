const express = require("express");
const { Router } = require("express");
const fileController = require("../controllers/fileController");
const folderController = require("../controllers/folderController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const isAuth = require("./authMiddleware").isAuth;
const folderRouter = express.Router();

folderRouter.post("/", isAuth, folderController.createFolder);
folderRouter.get("/:id", folderController.getFolder);
folderRouter.put("/:id", folderController.updateFolder);
folderRouter.delete("/:id", folderController.deleteFolder);
folderRouter.post(
  "/:id/upload",
  upload.single("file"),
  fileController.uploadFileToFolder
);

folderRouter.get("/", isAuth, fileController.getFile);
folderRouter.post("/upload", upload.single("file"), fileController.uploadFile);

module.exports = folderRouter;
