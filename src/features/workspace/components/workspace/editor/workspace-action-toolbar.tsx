"use client";

import { ArrowUpDown, ChevronDown, ClipboardPaste, Link2, Play, Plus, Sparkles, Upload, Zap } from "lucide-react";

import { ToolbarButton } from "../shared";

export function WorkspaceActionToolbar({
  fileInputRef,
  onPaste,
  onUploadClick,
  onLoadUrlToggle,
  onTrySample,
  onUpload,
  onFormat,
  onMinify,
  onRepair,
  onSort,
  onOpenConverters,
  onJsonPath,
}: {
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  onPaste: () => void;
  onUploadClick: () => void;
  onLoadUrlToggle: () => void;
  onTrySample: () => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFormat: () => void;
  onMinify: () => void;
  onRepair: () => void;
  onSort: () => void;
  onOpenConverters: () => void;
  onJsonPath: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-b-[0.5px] border-ui-border bg-obsidian-base px-4 py-3 sm:px-5 xl:flex-row xl:items-center xl:justify-between xl:gap-4">
      <div className="flex flex-wrap gap-3 xl:shrink-0">
        <ToolbarButton
          icon={<ClipboardPaste className="size-4" />}
          label="Paste"
          onClick={onPaste}
        />
        <ToolbarButton
          icon={<Upload className="size-4" />}
          label="Upload File"
          onClick={onUploadClick}
        />
        <ToolbarButton
          icon={<Link2 className="size-4" />}
          label="Load URL"
          onClick={onLoadUrlToggle}
        />
        <ToolbarButton
          icon={<Sparkles className="size-4" />}
          label="Try Sample"
          onClick={onTrySample}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={onUpload}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5 text-[12px] xl:shrink-0">
        {/* General Mode Dropdown */}
        <div className="relative inline-flex items-center gap-1 rounded-[6px] border-[0.5px] border-ui-border bg-surface-elevated/40 px-3 py-1.5 font-medium text-text-secondary transition-all hover:border-ui-border-hover">
          <span className="text-[11.5px] font-semibold text-text-secondary">General mode</span>
          <ChevronDown className="size-3.5 text-text-tertiary" />
        </div>

        {/* Action Button: Parse */}
        <button 
          onClick={onFormat} // In general mode parse acts as formatting/verifying
          className="inline-flex items-center gap-1.5 rounded-[6px] border-[0.5px] border-ui-border bg-surface-elevated/40 px-3 py-1.5 font-semibold text-text-secondary transition-all hover:border-ui-border-hover hover:text-text-primary active:scale-95"
        >
          <Play className="size-3 text-[#3DD68C] fill-[#3DD68C]/20" />
          <span>Parse</span>
        </button>

        {/* Action Button: Format (Glowing Copper Active) */}
        <button 
          onClick={onFormat}
          className="inline-flex items-center gap-1.5 rounded-[6px] border-[0.5px] border-[#C07040]/30 bg-[#C07040]/10 px-3 py-1.5 font-semibold text-[#C07040] transition-all hover:border-[#C07040]/60 active:scale-95 shadow-[0_0_12px_rgba(192,112,64,0.06)]"
        >
          <Sparkles className="size-3 text-[#C07040]" />
          <span>Format</span>
        </button>

        {/* Action Button: Minify */}
        <button 
          onClick={onMinify}
          className="inline-flex items-center gap-1.5 rounded-[6px] border-[0.5px] border-ui-border bg-surface-elevated/40 px-3 py-1.5 font-semibold text-text-secondary transition-all hover:border-ui-border-hover hover:text-text-primary active:scale-95"
        >
          <span className="flex h-3 w-3 items-center justify-center rounded-full border-[1.5px] border-text-tertiary group-hover:border-text-secondary" />
          <span>Minify</span>
        </button>

        {/* Action Button: Repair */}
        <button 
          onClick={onRepair}
          className="inline-flex items-center gap-1.5 rounded-[6px] border-[0.5px] border-ui-border bg-surface-elevated/40 px-3 py-1.5 font-semibold text-text-secondary transition-all hover:border-ui-border-hover hover:text-text-primary active:scale-95"
        >
          <Zap className="size-3 text-[#F5A623] fill-[#F5A623]/10" />
          <span>Repair</span>
        </button>

        {/* Action Button: Sort */}
        <button 
          onClick={onSort}
          className="inline-flex items-center gap-1.5 rounded-[6px] border-[0.5px] border-ui-border bg-surface-elevated/40 px-3 py-1.5 font-semibold text-text-secondary transition-all hover:border-ui-border-hover hover:text-text-primary active:scale-95"
        >
          <ArrowUpDown className="size-3 text-text-tertiary" />
          <span>Sort</span>
        </button>

        {/* Convert To Dropdown */}
        <button 
          onClick={onOpenConverters}
          className="inline-flex items-center gap-1.5 rounded-[6px] border-[0.5px] border-ui-border bg-surface-elevated/40 px-3 py-1.5 font-semibold text-text-secondary transition-all hover:border-ui-border-hover hover:text-text-primary active:scale-95"
        >
          <span>Convert to</span>
          <ChevronDown className="size-3.5 text-text-tertiary" />
        </button>

        {/* Action Button: JSONPath */}
        <button 
          onClick={onJsonPath}
          className="inline-flex items-center gap-1.5 rounded-[6px] border-[0.5px] border-ui-border bg-surface-elevated/40 px-3 py-1.5 font-semibold text-text-secondary transition-all hover:border-ui-border-hover hover:text-text-primary active:scale-95"
        >
          <Plus className="size-3 text-text-tertiary" />
          <span>JSONPath</span>
        </button>
      </div>
    </div>
  );
}
