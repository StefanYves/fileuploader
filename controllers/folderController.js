const db = require("../db/index");

exports.createFolder = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const folder = await db.createFolder(userId, name);
    res.redirect(`/folders/${folder.id}`);
  } catch (err) {
    console.error("Error creating folder:", err);
    res.status(500).send("Error creating folder");
  }
};

exports.getFolder = async (req, res) => {
  const folderId = req.params.id;

  try {
    const folders = await db.getFolderById(folderId);
    res.render("folder", { folders });
  } catch (err) {
    console.error("Error fetching folder:", err);
    res.status(500).send("Error fetching folder");
  }
};

exports.updateFolder = async (req, res) => {
  const folderId = req.params.id;
  const { name } = req.body;

  try {
    await db.updateFolder(folderId, name);
    res.redirect(`/folders/${folderId}`);
  } catch (err) {
    console.error("Error updating folder:", err);
    res.status(500).send("Error updating folder");
  }
};

exports.deleteFolder = async (req, res) => {
  const folderId = req.params.id;

  try {
    await db.deleteFolder(folderId);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting folder:", err);
    res.status(500).send("Error deleting folder");
  }
};
