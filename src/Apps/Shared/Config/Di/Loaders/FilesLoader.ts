import { join } from "node:path";

import { glob } from "fast-glob";

const rootPath = join(__dirname, "../../../../../");

const searchPatterns = [
  `${rootPath}/Apps/**/Controllers/**/*Controller.{ts,js}`,
  `${rootPath}/Contexts/**/Application/UseCases/**/*.{ts,js}`,
  `${rootPath}/Contexts/**/Application/EventHandlers/**/*.{ts,js}`,
  `${rootPath}/Contexts/**/Infrastructure/**/*.{ts,js}`,
];

/**
 * Is necessary to load all files before register the dependencies
 * because the decorators are executed when the file is imported
 */
export const filesLoader = async (): Promise<void> => {
  try {
    const files = await glob(searchPatterns, { onlyFiles: true });

    await Promise.all(files.map((file) => import(file)));
  } catch (error) {
    console.error("Error loading files:", error);
    throw error;
  }
};
