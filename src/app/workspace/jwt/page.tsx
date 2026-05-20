import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "JWT Decoder — JSONova Workspace",
  description:
    "Decode, inspect, and verify JSON Web Tokens instantly in the JSONova terminal-inspired workspace.",
};

export default function JwtDecoderPage() {
  redirect("/workspace");
}
