"use client";

import type { JsonStats } from "@/types/json";
import { cn } from "@/lib/utils";
import { formatBytes } from "./utils";

export function StatsGrid({ stats }: { stats: JsonStats }) {
  const items: Array<{ 
    label: string; 
    value: string; 
    tone: "copper" | "blue" | "violet" 
  }> = [
    { label: "Size", value: formatBytes(stats.bytes), tone: "copper" },
    { label: "Max Depth", value: String(stats.maxDepth), tone: "copper" },
    { label: "Objects", value: String(stats.objects), tone: "blue" },
    { label: "Arrays", value: String(stats.arrays), tone: "violet" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {items.map((item) => (
        <StatTile 
          key={item.label} 
          label={item.label} 
          value={item.value} 
          tone={item.tone} 
        />
      ))}
    </div>
  );
}

export function StatTile({
  label,
  value,
  tone = "copper",
}: {
  label: string;
  value: string;
  tone?: "copper" | "blue" | "violet";
}) {
  const toneColor = 
    tone === "copper" 
      ? "text-[#C07040]" 
      : tone === "blue" 
      ? "text-[#79C0FF]" 
      : "text-[#B392F0]";

  return (
    <div className="rounded-[8px] border-[0.5px] border-ui-border bg-[#0B0F14]/60 px-4.5 py-4 text-left transition-colors hover:border-ui-border-hover">
      {/* Metric Value on Top */}
      <p className={cn("text-[20px] font-bold tracking-tight leading-none", toneColor)}>
        {value}
      </p>
      
      {/* Label on the Bottom */}
      <p className="mt-2 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-text-secondary/60">
        {label}
      </p>
    </div>
  );
}
