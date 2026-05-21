import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "JWT Decoding Guide for Developers | Payloada",
  description:
    "Understand JWT headers, payloads, expiry claims, and signature verification in a practical developer guide.",
};

export default function JwtDecodingGuidePage() {
  return (
    <ContentPage
      eyebrow="JWT guide"
      title="JWT decoding guide"
      intro="JWT decoding is most useful when you understand what each part of the token means. A token is not just a long string. It contains a header, payload, and signature, and each part answers a different debugging question."
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Header, payload, signature
        </h2>
        <p>
          The header explains the token algorithm and type. The payload contains claims like subject
          (`sub`), issuer (`iss`), issued at (`iat`), and expiry (`exp`). The signature proves
          whether the token was signed by someone with the right secret or key.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          What developers usually check first
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Is the token expired?</li>
          <li>Is the issuer what I expect?</li>
          <li>Is the audience claim correct?</li>
          <li>Can the signature be verified?</li>
          <li>Are the custom claims shaped the way the app expects?</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Decode versus verify
        </h2>
        <p>
          Decoding a JWT only reveals its contents. It does not prove the token is trustworthy.
          Verification is the step that checks whether the signature matches the expected secret or
          key.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text-primary">
          Best next step
        </h2>
        <p>
          Use a decoder that shows header, payload, expiry, and signature state clearly instead of
          burying trust signals in small status chips.
        </p>
        <p>
          <Link href="/jwt-decoder" className="text-copper-accent hover:underline">
            Open the JWT Decoder
          </Link>{" "}
          to inspect tokens locally inside Payloada.
        </p>
      </section>
    </ContentPage>
  );
}
