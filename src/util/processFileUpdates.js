const unlinkFile = require("./unlinkFile");

const processFileUpdates = (files = {}, fileFields) => {
  const updateData = {};

  for (const { key, oldPath } of fileFields) {
    if (!files[key] || !oldPath) continue;

    if (Array.isArray(oldPath)) {
      // For arrays: map new paths and unlink old files
      updateData[key] = files[key].map((file) => file.path);
      oldPath.forEach((path) => path && unlinkFile(path));
    } else {
      // For single files: use first file and unlink old file
      updateData[key] = files[key][0].path;
      unlinkFile(oldPath);
    }
  }

  return updateData;
};

module.exports = processFileUpdates;
