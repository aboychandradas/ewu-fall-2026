import { spawnSync } from "node:child_process";
import {
  mkdir,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

process.env.NODE_ENV = "production";

const { createSerwistRoute } =
  await import("@serwist/turbopack");

const revision =
  spawnSync(
    "git",
    ["rev-parse", "HEAD"],
    {
      encoding: "utf-8",
    },
  ).stdout.trim() || "local";

const {
  generateStaticParams,
  GET,
} = createSerwistRoute({
  additionalPrecacheEntries: [
    {
      url: "/offline/",
      revision,
    },
  ],
  swSrc: "src/app/sw.ts",
  useNativeEsbuild: true,
});

const outputDir = path.join(
  process.cwd(),
  "out",
);

await mkdir(outputDir, {
  recursive: true,
});

const params =
  await generateStaticParams();

if (!Array.isArray(params)) {
  throw new Error(
    "Serwist did not return static service-worker parameters.",
  );
}

for (const item of params) {
  const rawPath = item.path;

  const filePath = Array.isArray(rawPath)
    ? rawPath.join("/")
    : rawPath;

  if (!filePath) {
    continue;
  }

  const response = await GET(
    undefined,
    {
      params: item,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to generate ${filePath}: ${response.status}`,
    );
  }

  const body = await response.text();

  const destination = path.join(
    outputDir,
    filePath,
  );

  await mkdir(
    path.dirname(destination),
    {
      recursive: true,
    },
  );

  await writeFile(
    destination,
    body,
    "utf-8",
  );

  console.log(
    `Generated ${destination}`,
  );
}