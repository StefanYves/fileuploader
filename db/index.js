const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addUser(username, password) {
  try {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return reject(err);
        }
        resolve(hashedPassword);
      });
    });
    const users = await prisma.users.create({
      data: {
        username: username,
        password: hashedPassword,
        folders: {
          create: {
            name: "My Library",
          },
        },
      },
    });
    return users;
  } catch (error) {
    console.error("Error adding user", error);
    throw error;
  }
}

async function getUser(username) {
  try {
    const user = await prisma.users.findUnique({
      where: { username: username },
    });
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}

async function getUserById(userId) {
  if (!userId) {
    throw new Error("User ID must be provided");
  }
  return prisma.users.findUnique({
    where: { id: userId },
  });
}

async function getUserFolder(userId) {
  return prisma.folder.findMany({
    where: { userId },
  });
}

async function getUserFile(userId) {
  console.log("Fetching files for userId:", userId);

  const files = await prisma.file.findMany({
    where: {
      folder: {
        userId: userId,
      },
    },
  });

  console.log("Files found:", files);
  return files;
}

async function createFile(data) {
  return prisma.file.create({
    data,
  });
}

async function createFolder(userId, name) {
  return prisma.folder.create({
    data: {
      name,
      userId,
    },
  });
}

async function getFolderById(folderId) {
  return prisma.folder.findUnique({
    where: { id: folderId },
    include: { files: true },
  });
}

async function updateFolder(folderId, newName) {
  return prisma.folder.update({
    where: { id: folderId },
    data: { name: newName },
  });
}

async function deleteFolder(folderId) {
  return prisma.folder.delete({
    where: { id: folderId },
  });
}

async function getFileById(fileId) {
  return prisma.file.findUnique({
    where: { id: fileId },
  });
}

async function deleteFile(fileId) {
  console.log(fileId);
  return prisma.file.delete({
    where: { id: fileId },
  });
}

module.exports = {
  addUser,
  getUser,
  getUserById,
  getUserFolder,
  getFileById,
  getUserFile,
  createFile,
  createFolder,
  getFolderById,
  updateFolder,
  deleteFolder,
  deleteFile,
};
