import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "What Is JSON? A Practical Guide for Developers | Payloada",
  description:
    "Learn what JSON is, why developers use it, how it is structured, and where it fits in API and frontend workflows.",
};

export default function WhatIsJsonPage() {
  return (
    <ContentPage
      eyebrow="JSON basics"
      title="What is JSON?"
      intro="JSON stands for JavaScript Object Notation. It is a lightweight text format for representing structured data, and it has become the default language for APIs, frontend data exchange, configuration files, and developer tooling."
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Why JSON is everywhere
        </h2>
        <p>
          Developers use JSON because it is easy for humans to read and easy for software to
          parse. A JSON document can represent objects, arrays, strings, numbers, booleans, and
          null values, which makes it flexible enough for most application payloads.
        </p>
        <p>
          In practice, JSON shows up in REST APIs, GraphQL responses, config files, log events,
          fixtures, test data, and browser storage. That is why JSON tools matter so much:
          developers are not just formatting text, they are inspecting real application state.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Core JSON structure
        </h2>
        <p>A simple JSON object looks like this:</p>
        <code className="block rounded-md border-[0.5px] border-ui-border bg-obsidian-base px-4 py-3 font-mono text-[12px] leading-7 text-copper-accent">
          {`{\n  "user": {\n    "id": 42,\n    "email": "dev@example.com",\n    "active": true\n  }\n}`}
        </code>
        <p>
          Objects use curly braces and key-value pairs. Arrays use square brackets. Strings must be
          wrapped in double quotes. These small syntax rules are what make JSON both strict and
          reliable across systems.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          JSON vs JavaScript objects
        </h2>
        <p>
          JSON looks similar to JavaScript objects, but it is not the same thing. JSON requires
          quoted keys, only allows a limited set of value types, and does not support comments,
          functions, or trailing commas. That is why a JavaScript object literal can be valid
          JavaScript but still be invalid JSON.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Helpful next steps
        </h2>
        <p>
          If you want to work with JSON more effectively, the best practical next step is to use a
          proper formatter and validator instead of treating raw payloads as plain text.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link href="/json-formatter" className="text-copper-accent hover:underline">
              JSON Formatter
            </Link>{" "}
            for beautifying minified payloads
          </li>
          <li>
            <Link href="/json-validator" className="text-copper-accent hover:underline">
              JSON Validator
            </Link>{" "}
            for catching parse errors
          </li>
          <li>
            <Link href="/workspace" className="text-copper-accent hover:underline">
              Workspace
            </Link>{" "}
            for tree view, JSONPath, converters, and diffing
          </li>
        </ul>
      </section>
    </ContentPage>
  );
}
