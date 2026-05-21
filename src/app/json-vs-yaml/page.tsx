import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "JSON vs YAML: When to Use Each Format | Payloada",
  description:
    "Compare JSON and YAML for APIs, configuration, readability, and developer workflows.",
};

export default function JsonVsYamlPage() {
  return (
    <ContentPage
      eyebrow="Format comparison"
      title="JSON vs YAML"
      intro="JSON and YAML both represent structured data, but they serve different strengths. JSON is stricter and more predictable for machines, while YAML is often preferred for human-written configuration."
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Where JSON wins
        </h2>
        <p>
          JSON is ideal for APIs, browser applications, payload debugging, and language-neutral data
          exchange. It is strict, portable, and easy to parse across nearly every major platform.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Where YAML wins
        </h2>
        <p>
          YAML can be more comfortable for configuration files because it supports comments and a
          more relaxed layout. That can make it easier to hand-edit deployment configs or tool
          settings. The tradeoff is that YAML is often harder to parse consistently and easier to
          mis-indent.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Practical rule of thumb
        </h2>
        <p>
          Use JSON when data moves between systems. Use YAML when humans need to author or maintain
          configuration by hand. For most API debugging and developer tooling workflows, JSON is the
          better default.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Related tools
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link href="/json-formatter" className="text-copper-accent hover:underline">
              JSON Formatter
            </Link>{" "}
            to clean raw payloads before comparing or exporting them
          </li>
          <li>
            <Link href="/json-validator" className="text-copper-accent hover:underline">
              JSON Validator
            </Link>{" "}
            to catch syntax errors before conversion
          </li>
        </ul>
      </section>
    </ContentPage>
  );
}
