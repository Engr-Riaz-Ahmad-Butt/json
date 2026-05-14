import Link from "next/link";
import { Braces } from "lucide-react";

import { APP_NAME } from "@/constants";

const footerGroups = [
  {
    title: "Tools",
    links: [
      { label: "JSON Formatter", href: "/json-formatter" },
      { label: "JSON Validator", href: "/json-validator" },
      { label: "JSON Tree Viewer", href: "/json-tree-viewer" },
      { label: "JSON Diff", href: "/json-diff" },
      { label: "JWT Decoder", href: "/jwt-decoder" },
    ],
  },
  {
    title: "Converters",
    links: [
      { label: "JSON to TypeScript", href: "/json-to-typescript" },
      { label: "JSON to Zod", href: "/json-to-zod" },
      { label: "JSON to CSV", href: "/json-to-csv" },
      { label: "JSON to YAML", href: "/json-to-yaml" },
      { label: "JSON to XML", href: "/json-to-xml" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "What is JSON?", href: "/what-is-json" },
      { label: "Common JSON Errors", href: "/common-json-errors" },
      { label: "JSONPath Guide", href: "/jsonpath-guide" },
      { label: "JSON Schema Guide", href: "/json-schema-guide" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "/contact" },
      { label: "GitHub", href: "https://github.com", external: true },
    ],
  },
] as const;

const trustBadges = [
  "Local-only processing",
  "No signup required",
  "No data stored",
  "Fast browser-based tools",
] as const;

export function AppFooter() {
  return (
    <footer className="border-t border-[#262626] bg-[#080808]">
      <div className="px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#1f1f1f]">
                <Braces className="size-5 text-[#c07040]" />
              </div>
              <div>
                <h2 className="text-[24px] leading-none font-bold tracking-tight text-[#d3884e]">
                  {APP_NAME}
                </h2>
                <p className="mt-1 text-[12px] font-medium tracking-[0.08em] text-[#d6c3b5] uppercase">
                  Pro Workspace
                </p>
              </div>
            </div>

            <p className="max-w-sm text-[15px] leading-7 text-[#f5f1ea]">
              A modern JSON workspace for developers to format, validate, explore, compare, and
              convert JSON faster.
            </p>
            <p className="max-w-sm text-[14px] leading-6 text-[#b8a69a]">
              Your JSON stays in your browser unless you choose to share it.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-sm border border-[#2b2b2b] bg-[#101010] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#d6c3b5]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h3 className="text-[12px] font-semibold tracking-[0.12em] text-[#b8a69a] uppercase">
                  {group.title}
                </h3>
                <div className="space-y-3">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="block text-sm text-[#d6c3b5] transition-colors hover:text-[#f5f1ea]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-[#262626] pt-5">
          <div className="flex flex-col gap-3 text-sm text-[#a89589]">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <span>Local-only processing</span>
              <span>No signup required</span>
              <span>Built for developers</span>
            </div>
            <p>{`© 2026 ${APP_NAME}. All rights reserved.`}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
