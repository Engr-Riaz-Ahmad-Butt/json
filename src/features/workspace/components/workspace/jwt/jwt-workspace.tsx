"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, ChevronDown, Eye, LockKeyhole, Unlock } from "lucide-react";

import { cn } from "@/lib/utils";

import { CodePreview, JwtCard, SmallAction } from "../shared";
import type { DecodedJwtData } from "../core/types";
import { verifyHs256Token } from "../shared/utils";

export function JwtWorkspace({
  jwtInput,
  setJwtInput,
  decodedJwt,
  onCopy,
}: {
  jwtInput: string;
  setJwtInput: React.Dispatch<React.SetStateAction<string>>;
  decodedJwt: DecodedJwtData;
  onCopy: (value: string, message?: string) => Promise<void>;
}) {
  const [verifyEnabled, setVerifyEnabled] = useState(true);
  const [jwtAlgorithm, setJwtAlgorithm] = useState("HS256");
  const [jwtSecret, setJwtSecret] = useState("");
  const [signatureState, setSignatureState] = useState<
    "idle" | "verified" | "invalid" | "unsupported"
  >("idle");

  useEffect(() => {
    let cancelled = false;

    async function verifySignature() {
      if (!verifyEnabled || !decodedJwt) {
        if (!cancelled) {
          setSignatureState("idle");
        }
        return;
      }

      const tokenAlgorithm = String(decodedJwt.header.alg ?? "");
      if (tokenAlgorithm !== "HS256" || jwtAlgorithm !== "HS256" || !jwtSecret.trim()) {
        if (!cancelled) {
          setSignatureState("unsupported");
        }
        return;
      }

      const verified = await verifyHs256Token(decodedJwt.tokenParts, jwtSecret);
      if (!cancelled) {
        setSignatureState(verified ? "verified" : "invalid");
      }
    }

    void verifySignature();

    return () => {
      cancelled = true;
    };
  }, [decodedJwt, jwtAlgorithm, jwtSecret, verifyEnabled]);

  const payloadClaims = decodedJwt?.payload ? Object.entries(decodedJwt.payload).slice(0, 8) : [];
  const headerJson = decodedJwt ? JSON.stringify(decodedJwt.header, null, 2) : "";
  const payloadJson = decodedJwt ? JSON.stringify(decodedJwt.payload, null, 2) : "";
  const tokenAlgorithm = String(decodedJwt?.header.alg ?? jwtAlgorithm);
  const tokenParts = decodedJwt?.tokenParts ?? ["", "", ""];
  const issuedAt = getNumericClaim(decodedJwt?.payload?.iat);
  const expiresAt = getNumericClaim(decodedJwt?.payload?.exp);
  const expiryMeta = getExpiryMeta(issuedAt, expiresAt);

  const bannerConfig =
    signatureState === "verified"
      ? {
          className: "border-emerald-500/20 dark:border-emerald-900/30 bg-emerald-500/5 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-semibold",
          icon: <CheckCircle2 className="size-4" />,
          label: "Signature verified — token is authentic",
        }
      : signatureState === "invalid"
      ? {
          className: "border-red-500/20 dark:border-red-900/30 bg-red-500/5 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-semibold",
          icon: <AlertTriangle className="size-4" />,
          label: "Signature invalid — do not trust this token",
        }
      : {
          className: "border-ui-border bg-surface-container text-text-secondary font-medium",
          icon: <Unlock className="size-4" />,
          label: "Signature not verified — enter secret below to verify",
        };

  return (
    <div className="grid h-full min-h-0 gap-[0.5px] bg-ui-border xl:grid-cols-2">
      <section className="flex min-h-0 flex-col bg-obsidian-base">
        <div className="flex items-center justify-between border-b-[0.5px] border-ui-border bg-surface/60 px-4 py-4 sm:px-5">
          <h2 className="flex items-center gap-2 text-[14px] font-semibold text-text-primary">
            <LockKeyhole className="size-4 text-[#c07040]" />
            Encoded Token
          </h2>
          <button
            type="button"
            onClick={() => setJwtInput("")}
            className="text-[11px] font-medium tracking-[0.5px] text-text-secondary transition-colors hover:text-text-primary"
          >
            Clear
          </button>
        </div>

        <div className="space-y-2 bg-obsidian-base p-4 sm:p-5">
          <textarea
            value={jwtInput}
            onChange={(event) => setJwtInput(event.target.value)}
            spellCheck={false}
            placeholder={`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\neyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Impzb25MaW5lcyBEZW1vIiwiaWF0IjoxNTE2MjM5MDIyfQ.\nSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`}
            className="max-h-[100px] min-h-[100px] w-full resize-none overflow-y-auto rounded-[8px] border-[0.5px] border-ui-border bg-surface px-3 py-3 font-mono text-[13px] font-normal leading-6 text-text-primary outline-none placeholder:text-text-secondary/50 focus-visible:border-copper-accent"
          />

          <div className="space-y-1">
            {[
              {
                label: "Header",
                className: "bg-blue-500/5 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-500/10 dark:border-blue-900/30",
                value: tokenParts[0],
              },
              {
                label: "Payload",
                className: "bg-[#C07040]/5 dark:bg-[#C07040]/20 text-[#C07040] dark:text-[#ffb68e] border-[#C07040]/10 dark:border-[#C07040]/30",
                value: tokenParts[1],
              },
              {
                label: "Signature",
                className: "bg-emerald-500/5 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/10 dark:border-emerald-900/30",
                value: tokenParts[2],
              },
            ].map((part) => (
              <div
                key={part.label}
                className={cn("flex h-11 items-center justify-between rounded-[6px] border-[0.5px] px-3", part.className)}
              >
                <span className="text-[12px] font-semibold">
                  {part.label}
                </span>
                <span className="max-w-[60%] truncate font-mono text-[12px]">
                  {truncateTokenPart(part.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t-[0.5px] border-ui-border bg-surface-elevated p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-text-primary">Verify signature</h3>
            <button
              type="button"
              role="switch"
              aria-checked={verifyEnabled}
              onClick={() => setVerifyEnabled((current) => !current)}
              className={cn(
                "relative h-5 w-9 rounded-full transition-colors",
                verifyEnabled ? "bg-copper-accent" : "bg-surface-container border border-ui-border",
              )}
            >
              <span
                className={cn(
                  "absolute top-[2px] h-4 w-4 rounded-full bg-white dark:bg-[#f5f1ea] transition-transform",
                  verifyEnabled ? "left-[18px]" : "left-[2px]",
                )}
              />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[100px_minmax(0,1fr)] md:items-center">
              <label className="text-[13px] font-medium leading-[1.6] text-text-secondary">
                Algorithm
              </label>
              <div className="relative">
                <select
                  value={jwtAlgorithm}
                  onChange={(event) => setJwtAlgorithm(event.target.value)}
                  className="h-11 w-full appearance-none rounded-sm border-[0.5px] border-ui-border bg-obsidian-base px-3 font-mono text-[13px] font-normal text-text-primary outline-none focus-visible:border-copper-accent"
                >
                  <option>HS256</option>
                  <option>RS256</option>
                  <option>ES256</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[100px_minmax(0,1fr)] md:items-start">
              <label className="pt-2 text-[13px] font-medium leading-[1.6] text-text-secondary">
                Secret
              </label>
              <div className="space-y-2">
                <textarea
                  value={jwtSecret}
                  onChange={(event) => setJwtSecret(event.target.value)}
                  className="h-24 w-full resize-none rounded-sm border-[0.5px] border-ui-border bg-obsidian-base px-3 py-2 font-mono text-[13px] font-normal text-text-primary outline-none focus-visible:border-copper-accent"
                  placeholder="your-256-bit-secret"
                />
                <div className="flex justify-end">
                  <SmallAction
                    label="Copy Secret"
                    onClick={() => onCopy(jwtSecret, "Copied JWT secret")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-0 flex-col overflow-y-auto bg-obsidian-base">
        <div className="sticky top-0 z-10 border-b-[0.5px] border-ui-border bg-surface/60 px-4 py-4 sm:px-5">
          <h2 className="flex items-center gap-2 text-[14px] font-semibold text-text-primary">
            <Eye className="size-4 text-[#ffb68e]" />
            Decoded Payload
          </h2>
        </div>

        <div className="space-y-5 p-4 sm:p-6">
          {decodedJwt ? (
            <>
              <div
                className={cn(
                  "flex w-full items-center gap-3 rounded-[8px] border-[0.5px] px-4 py-3",
                  bannerConfig.className
                )}
              >
                {bannerConfig.icon}
                <span className="text-[13px] font-medium leading-[1.4]">
                  {bannerConfig.label}
                </span>
              </div>

              <div className="rounded-[8px] border-[0.5px] border-ui-border bg-surface-container px-4 py-3">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-normal uppercase tracking-[0.06em] text-text-secondary">
                      Issued
                    </p>
                    <p className="mt-1 font-mono text-[12px] text-text-secondary">
                      {formatJwtDate(issuedAt)}
                    </p>
                  </div>

                  <div className="hidden h-8 w-px bg-ui-border md:block" />

                  <div className="min-w-0">
                    <p className="text-[10px] font-normal uppercase tracking-[0.06em] text-text-secondary">
                      Expires
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p className={cn("font-mono text-[12px]", expiryMeta.color)}>
                        {expiryMeta.label}
                      </p>
                      {expiryMeta.badge ? (
                        <span className="rounded-full border-[0.5px] border-red-500/20 dark:border-red-900/30 bg-red-500/10 dark:bg-red-950/40 px-2 py-0.5 text-[10px] font-medium text-red-600 dark:text-red-400">
                          {expiryMeta.badge}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <JwtCard
                title="Header"
                subtitle="Algorithm and token type"
                accent="header"
                actions={
                  <SmallAction
                    label="Copy Header"
                    onClick={() => onCopy(headerJson, "Copied JWT header")}
                  />
                }
              >
                <CodePreview value={headerJson} className="border-0 bg-transparent p-0" />
              </JwtCard>

              <JwtCard
                title="Payload"
                subtitle="Data"
                accent="payload"
                actions={
                  <SmallAction
                    label="Copy Payload"
                    onClick={() => onCopy(payloadJson, "Copied JWT payload")}
                  />
                }
              >
                <CodePreview value={payloadJson} className="border-0 bg-transparent p-0" />
              </JwtCard>

              <JwtCard title="Signature" subtitle="Verification" accent="signature">
                <div className="space-y-2 font-mono text-xs leading-6 text-text-primary">
                  <p className="flex gap-2">
                    <span className="w-24 text-copper-accent dark:text-[#ffb68e]">Algorithm:</span>
                    <span className="text-text-primary">{tokenAlgorithm || "Unknown"}</span>
                  </p>
                  <p className="flex gap-2">
                    <span className="w-24 text-copper-accent dark:text-[#ffb68e]">Data:</span>
                    <span className="truncate text-text-primary/75">
                      {decodedJwt.tokenParts[0]}.{decodedJwt.tokenParts[1]}
                    </span>
                  </p>
                  <p className="flex gap-2">
                    <span className="w-24 text-copper-accent dark:text-[#ffb68e]">Secret:</span>
                    <span className="truncate text-text-primary/75">
                      {jwtSecret || "No secret provided"}
                    </span>
                  </p>
                  <p className="flex gap-2">
                    <span className="w-24 text-copper-accent dark:text-[#ffb68e]">Signature:</span>
                    <span className="truncate text-text-primary/75">{decodedJwt.signature}</span>
                  </p>
                </div>
              </JwtCard>

              <JwtCard
                title="Claims"
                subtitle="Quick scan"
                accent="claims"
                actions={
                  <SmallAction
                    label="Copy Full JWT"
                    onClick={() =>
                      onCopy(
                        JSON.stringify(
                          {
                            header: decodedJwt.header,
                            payload: decodedJwt.payload,
                            signature: decodedJwt.signature,
                          },
                          null,
                          2,
                        ),
                        "Copied full decoded JWT",
                      )
                    }
                  />
                }
              >
                <div className="grid gap-2">
                  {payloadClaims.map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-4 rounded-[6px] border-[0.5px] border-ui-border bg-surface-elevated px-3 py-2 transition-colors hover:bg-surface-container"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className={cn(
                            "text-[12px] font-medium",
                            isStandardJwtClaim(key) ? "text-copper-accent" : "text-text-secondary"
                          )}
                        >
                          {key}
                        </span>
                        {isStandardJwtClaim(key) ? (
                          <span className="rounded-[4px] bg-copper-accent/10 px-1.5 py-0.5 text-[9px] font-medium leading-none text-copper-accent">
                            std
                          </span>
                        ) : null}
                      </div>
                      <span className="max-w-[70%] truncate text-right font-mono text-[12px] text-text-primary">
                        {typeof value === "string" ? value : JSON.stringify(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </JwtCard>
            </>
          ) : (
            <div className="rounded-sm border-[0.5px] border-ui-border bg-surface-elevated p-6">
              <p className="text-[14px] font-medium text-text-primary">Paste a valid JWT token</p>
              <p className="mt-2 text-[13px] font-normal leading-[1.6] text-text-secondary">
                Header, payload, and signature details will appear here as soon as the token can be
                decoded.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function truncateTokenPart(value: string) {
  if (!value) {
    return "Not available";
  }

  return value.length > 12 ? `${value.slice(0, 12)}...` : value;
}

function getNumericClaim(value: unknown) {
  return typeof value === "number" ? value : null;
}

function isStandardJwtClaim(key: string) {
  return ["sub", "iat", "exp", "iss", "aud", "nbf", "jti"].includes(key);
}

function formatJwtDate(value: number | null) {
  if (value === null) {
    return "Not set";
  }

  try {
    return new Date(value * 1000).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    // Fallback for out-of-range timestamps (e.g. year > 275760)
    return new Date(value * 1000).toISOString().slice(0, 16).replace("T", " ");
  }
}

function getExpiryMeta(issuedAt: number | null, expiresAt: number | null) {
  if (expiresAt === null) {
    return {
      label: "No expiry set",
      color: "text-text-secondary",
      badge: null as string | null,
      issuedLabel: formatJwtDate(issuedAt),
    };
  }

  const now = Date.now();
  const expiresAtMs = expiresAt * 1000;
  const deltaMs = expiresAtMs - now;

  if (deltaMs <= 0) {
    return {
      label: `Expired ${formatElapsedTime(Math.abs(deltaMs))} ago`,
      color: "text-red-600 dark:text-red-400",
      badge: "Expired",
      issuedLabel: formatJwtDate(issuedAt),
    };
  }

  return {
    label: `in ${formatRemainingTime(deltaMs)} (${formatShortDate(expiresAtMs)})`,
    color: "text-emerald-600 dark:text-emerald-400",
    badge: null as string | null,
    issuedLabel: formatJwtDate(issuedAt),
  };
}

function formatElapsedTime(deltaMs: number) {
  const totalHours = Math.floor(deltaMs / (1000 * 60 * 60));
  const totalDays = Math.floor(totalHours / 24);

  if (totalDays >= 1) {
    return `${totalDays} day${totalDays === 1 ? "" : "s"}`;
  }

  if (totalHours >= 1) {
    return `${totalHours} hour${totalHours === 1 ? "" : "s"}`;
  }

  const totalMinutes = Math.max(1, Math.floor(deltaMs / (1000 * 60)));
  return `${totalMinutes} minute${totalMinutes === 1 ? "" : "s"}`;
}

function formatRemainingTime(deltaMs: number) {
  const totalMinutes = Math.max(1, Math.floor(deltaMs / (1000 * 60)));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }

  if (hours >= 1) {
    return `${hours}h ${minutes}m`;
  }

  return `${totalMinutes}m`;
}

function formatShortDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
