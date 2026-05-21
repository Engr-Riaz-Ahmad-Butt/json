import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Common JSON Errors and How to Fix Them | Payloada",
  description:
    "See the most common JSON syntax errors developers run into and how to fix them quickly.",
};

export default function CommonJsonErrorsPage() {
  return (
    <ContentPage
      eyebrow="Troubleshooting"
      title="Common JSON errors"
      intro="Most JSON failures come from a small set of syntax mistakes. Once you know the patterns, it becomes much easier to spot and fix broken payloads from logs, APIs, and copied examples."
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          The errors developers hit most often
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Trailing commas after the last item in an object or array</li>
          <li>Single quotes instead of double quotes</li>
          <li>Unquoted object keys</li>
          <li>Broken escaping inside strings</li>
          <li>Missing closing braces or brackets</li>
          <li>Mixing JavaScript object syntax with real JSON syntax</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Example: trailing comma
        </h2>
        <code className="block rounded-md border-[0.5px] border-ui-border bg-obsidian-base px-4 py-3 font-mono text-[12px] leading-7 text-copper-accent">
          {`{\n  "name": "Ava",\n  "roles": ["admin",],\n}`}
        </code>
        <p>
          This is valid in some JavaScript contexts, but not valid JSON. Removing the trailing
          comma is enough to make the payload parse correctly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Example: broken string quotes
        </h2>
        <code className="block rounded-md border-[0.5px] border-ui-border bg-obsidian-base px-4 py-3 font-mono text-[12px] leading-7 text-copper-accent">
          {`{"message":"User "signed in""}`}
        </code>
        <p>
          JSON strings need correct escaping. If a quote appears inside a quoted string without
          being escaped, the document becomes invalid immediately.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Fastest fix workflow
        </h2>
        <p>
          Use a validator that shows the exact line and column, then repair the payload before
          formatting or converting it. That is much faster than visually scanning a large minified
          response.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link href="/json-validator" className="text-copper-accent hover:underline">
              Validate JSON
            </Link>{" "}
            to find the exact parser error
          </li>
          <li>
            <Link href="/json-formatter" className="text-copper-accent hover:underline">
              Format JSON
            </Link>{" "}
            once the payload is valid
          </li>
          <li>
            <Link href="/how-to-validate-json" className="text-copper-accent hover:underline">
              Read the validation guide
            </Link>{" "}
            for a practical debugging workflow
          </li>
        </ul>
      </section>
    </ContentPage>
  );
}
