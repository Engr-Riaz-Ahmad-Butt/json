"use client";

import React from "react";

import { cn } from "@/lib/utils";

export function JwtCard({
  title,
  subtitle,
  accent,
  actions,
  children,
}: {
  title: string;
  subtitle: string;
  accent: "header" | "payload" | "signature" | "claims";
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const accentClasses =
    accent === "header"
      ? { text: "text-blue-600 dark:text-[#79C0FF]", bar: "bg-blue-600 dark:bg-[#79C0FF]" }
      : accent === "payload"
      ? { text: "text-copper-accent", bar: "bg-copper-accent" }
      : accent === "signature"
      ? { text: "text-emerald-600 dark:text-[#3DD68C]", bar: "bg-emerald-600 dark:bg-[#3DD68C]" }
      : { text: "text-text-primary", bar: "bg-ui-border-hover" };

  return (
    <div className="group overflow-hidden rounded-lg border-[0.5px] border-ui-border bg-surface-elevated">
      <div className="flex items-center justify-between border-b-[0.5px] border-ui-border bg-surface-container px-4 py-3">
        <div className="flex items-center gap-3">
          <span className={cn("h-5 w-[2px] rounded-full", accentClasses.bar)} />
          <span className={cn("text-[12px] font-semibold tracking-[0.01em]", accentClasses.text)}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-normal leading-[1.6] text-text-secondary">{subtitle}</span>
          {actions}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
