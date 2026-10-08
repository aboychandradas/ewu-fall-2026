import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  adapterPath: require.resolve("./build/adapter.js"),
};

export default nextConfig;