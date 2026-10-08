const fs = require("node:fs");
const path = require("node:path");

/** @type {import("next").NextAdapter} */
const adapter = {
  name: "fix-next16-static-export-windows-rsc",

  async onBuildComplete({ outputs }) {
    for (const file of outputs.staticFiles) {
      const sourcePath = file.filePath;
      const targetPath = fixupPath(sourcePath);

      if (!targetPath) {
        continue;
      }

      await fs.promises.mkdir(
        path.dirname(targetPath),
        {
          recursive: true,
        },
      );

      await fs.promises.rename(
        sourcePath,
        targetPath,
      );

      console.log(
        `Fixed Next.js static RSC path: ${sourcePath} -> ${targetPath}`,
      );
    }
  },
};

function fixupPath(filePath) {
  const components = filePath.split(path.sep);

  const index = components.findIndex(
    (component) =>
      component.startsWith("__next.") ||
      component === "__next",
  );

  if (
    index < 0 ||
    index >= components.length - 1
  ) {
    return null;
  }

  const prefix = components.slice(
    0,
    index,
  );

  const flattened = components
    .slice(index)
    .join(".");

  return path.join(
    ...prefix,
    flattened,
  );
}

module.exports = adapter;