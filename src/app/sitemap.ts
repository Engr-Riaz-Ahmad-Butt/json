import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://payloada.dev";
  const toolPages = [
    "json-formatter",
    "json-validator",
    "jwt-decoder",
    "json-diff",
    "json-to-typescript",
    "zod-schema-generator",
    "json-graph-visualizer",
    "json-to-csv",
    "json-schema-generator",
    "mock-json-generator",
  ];

  const standardPages = ["contact", "privacy", "terms"];
  const contentPages = [
    "what-is-json",
    "common-json-errors",
    "how-to-validate-json",
    "json-vs-yaml",
    "jwt-decoding-guide",
    "how-jsonpath-works",
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/workspace`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...toolPages.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...standardPages.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...contentPages.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
