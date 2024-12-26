import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Let Next.js handle CSS extraction
    const rules =
      config.module.rules
        .find((rule) => typeof rule === "object" && rule.oneOf)
        ?.oneOf?.filter(
          (rule) =>
            rule?.sideEffects === false &&
            rule.use?.loader?.includes("next-font-loader")
        ) ?? [];

    if (rules.length > 0) {
      rules.forEach((rule) => {
        if (rule.use) {
          delete rule.sideEffects;
        }
      });
    }

    return config;
  },
};

export default nextConfig;
