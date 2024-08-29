const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fileController = require("../controllers/fileController");

const indexRouter = express.Router();

indexRouter.get("/", fileController.getFile);

indexRouter.post("/upload", upload.single("file"), fileController.uploadFile);
indexRouter.delete("/files/:id", fileController.deleteFile);
indexRouter.get("/download/:id", fileController.downloadFile);

module.exports = indexRouter;
