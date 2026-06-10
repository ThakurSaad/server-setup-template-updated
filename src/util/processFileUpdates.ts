import unlinkFile from "./unlinkFile";

// 1. Define types for Multer file objects and the function parameters
interface ExpressFile {
  path: string;
  [key: string]: any; // Allows other standard Multer properties like filename, size, etc.
}

interface FileFieldConfig {
  key: string;
  oldPath: string | string[] | null | undefined;
}

// 2. Convert to TS with explicit parameter and return types
const processFileUpdates = (
  files: Record<string, ExpressFile[]> = {},
  fileFields: FileFieldConfig[],
): Record<string, string | string[]> => {
  const updateData: Record<string, string | string[]> = {};

  for (const { key, oldPath } of fileFields) {
    // Ensure the uploaded file array exists and we have an old path to replace
    if (!files[key] || !oldPath) continue;

    if (Array.isArray(oldPath)) {
      // For arrays: map new paths and unlink old files
      updateData[key] = files[key].map((file) => file.path);
      oldPath.forEach((path) => path && unlinkFile(path));
    } else {
      // For single files: use first file and unlink old file
      const firstFile = files[key][0];
      if (firstFile) {
        updateData[key] = firstFile.path;
        unlinkFile(oldPath);
      }
    }
  }

  return updateData;
};

export = processFileUpdates;
