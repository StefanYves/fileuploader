const db = require("../db/index");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../cloudinaryConfig");

exports.uploadFile = async (req, res) => {
  try {
    const user = await db.getUserById(req.user.id);

    if (!user) {
      return res.status(401).send(`User not found.${req.user.id}`);
    }

    const folder = await db.getUserFolder(user.id);

    const folderId = folder[0].id; // Ensure a valid folder ID is used

    if (!folder) {
      return res.status(404).send("No folder found for this user.");
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

    await db.createFile({
      name: req.file.originalname,
      path: result.url,
      size: req.file.size,
      folderId: folderId,
    });

    res.redirect("/");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send(`An error occurred while uploading the file.`);
  }
};

exports.getFile = async (req, res) => {
  const folders = await db.getUserFolder(req.user.id);
  const files = await db.getUserFile(req.user.id);

  res.render("index", { folders: folders, files: files });
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await db.getFileById(req.params.id);

    if (!file) {
      return res.status(404).send("File not found.");
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    res.redirect(file.path);
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).send("An error occurred while downloading the file.");
  }
};

exports.uploadFileToFolder = async (req, res) => {
  const folderId = req.params.id;

  const result = await cloudinary.uploader.upload(req.file.path, {
    resource_type: "auto", // Change this to the desired folder in Cloudinary
  });

  try {
    await db.createFile({
      name: req.file.originalname,
      path: result.secure_url,
      size: req.file.size,
      folderId: folderId,
    });
    res.redirect(`/folders/${folderId}`);
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).send("Error uploading file");
  }
};

exports.deleteFile = async (req, res) => {
  const fileId = req.params.id;

  try {
    await db.deleteFile(fileId);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).send("Error deleting file");
  }
};
