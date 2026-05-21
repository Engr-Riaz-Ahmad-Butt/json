import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "How to Validate JSON Properly | Payloada",
  description:
    "Learn a practical developer workflow for validating JSON, fixing syntax errors, and continuing into formatting or conversion.",
};

export default function HowToValidateJsonPage() {
  return (
    <ContentPage
      eyebrow="Workflow guide"
      title="How to validate JSON"
      intro="Validating JSON is not just about getting a yes-or-no answer. A useful workflow helps you find the exact problem, repair it quickly, and then continue into formatting, inspection, or code generation without losing context."
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Step 1: paste the raw payload as-is
        </h2>
        <p>
          Do not manually reformat broken JSON first. Paste the raw response or document into a
          validator so you can see the original failure clearly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Step 2: read the parser error
        </h2>
        <p>
          The most useful validators show line and column information. That narrows the search
          area immediately and prevents guesswork in long API payloads.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Step 3: fix syntax before doing anything else
        </h2>
        <p>
          Formatting, conversion, diffing, and code generation all depend on valid JSON. Repair the
          payload first, then continue into the rest of the workflow. Common issues include trailing
          commas, broken quotes, and unquoted keys.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Step 4: move into the next tool
        </h2>
        <p>Once the payload is valid, the next step depends on your goal:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link href="/json-formatter" className="text-copper-accent hover:underline">
              JSON Formatter
            </Link>{" "}
            for readability
          </li>
          <li>
            <Link href="/json-diff" className="text-copper-accent hover:underline">
              JSON Diff
            </Link>{" "}
            for comparing versions
          </li>
          <li>
            <Link href="/json-to-typescript" className="text-copper-accent hover:underline">
              JSON to TypeScript
            </Link>{" "}
            for interface generation
          </li>
        </ul>
      </section>
    </ContentPage>
  );
}
