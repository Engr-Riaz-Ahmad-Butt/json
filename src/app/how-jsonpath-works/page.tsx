import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "How JSONPath Works: A Simple Developer Guide | Payloada",
  description:
    "Learn the basics of JSONPath with practical examples for selecting keys, arrays, and nested values.",
};

export default function HowJsonPathWorksPage() {
  return (
    <ContentPage
      eyebrow="JSONPath guide"
      title="How JSONPath works"
      intro="JSONPath is a query syntax for selecting data inside a JSON document. It is especially useful when you need to find a nested value quickly without manually scanning a large payload."
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Common JSONPath patterns
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-copper-accent">
              $.user.name
            </code>{" "}
            selects a nested property
          </li>
          <li>
            <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-copper-accent">
              $[0]
            </code>{" "}
            selects the first array item
          </li>
          <li>
            <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-copper-accent">
              $.items[*].id
            </code>{" "}
            selects a property from every array item
          </li>
          <li>
            <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-copper-accent">
              $..email
            </code>{" "}
            searches recursively for all matching keys
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Why JSONPath matters in practice
        </h2>
        <p>
          JSONPath is useful for debugging API responses, extracting nested values, writing tests,
          and inspecting large payloads where tree scanning becomes slow. It helps developers move
          from “where is this field?” to “here is the exact path.”
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Use it together with tree view
        </h2>
        <p>
          The most practical setup is a workspace where you can format JSON, inspect it as a tree,
          then run JSONPath queries without leaving the same screen.
        </p>
        <p>
          <Link href="/workspace" className="text-copper-accent hover:underline">
            Open the workspace
          </Link>{" "}
          to use tree view and JSONPath together.
        </p>
      </section>
    </ContentPage>
  );
}
