import { access, constants, stat } from "node:fs/promises";

export async function isReadableDir(path: string): Promise<boolean> {
  try {
    const [stats] = await Promise.all([
      stat(path),
      access(path, constants.R_OK)
    ]);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

export async function isReadableFile(path: string): Promise<boolean> {
  try {
    const [stats] = await Promise.all([
      stat(path),
      access(path, constants.R_OK)
    ]);
    return stats.isFile();
  } catch {
    return false;
  }
}
