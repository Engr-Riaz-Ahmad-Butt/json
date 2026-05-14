"use client";

import Link from "next/link";
import { Bell, Braces, ExternalLink, Menu, MoonStar, Search, Sparkles, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { APP_NAME } from "@/constants";
import { cn } from "@/lib/utils";

const navItems = ["Workspace", "Tools", "API", "Docs"] as const;

export function AppHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#262626] bg-[#080808]">
      <div className="flex h-16 items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#1f1f1f]">
            <Braces className="size-4.5 text-[#c07040]" />
          </div>
          <div>
            <p className="text-[17px] leading-none font-bold tracking-tight text-[#d3884e]">
              {APP_NAME}
            </p>
            <p className="mt-0.5 text-[11px] font-medium tracking-[0.08em] text-[#d6c3b5] uppercase">
              Pro Workspace
            </p>
          </div>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-between gap-8 lg:flex">
          <div className="flex min-w-[280px] max-w-[420px] flex-1 items-center gap-3 text-[#d6c3b5]">
            <Search className="size-4.5 shrink-0" />
            <input
              placeholder="Search files, actions, or data..."
              className="w-full border-0 bg-transparent text-sm text-[#f5f1ea] outline-none placeholder:text-[#5b5450]"
            />
          </div>

          <nav className="flex items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.08em]">
            {navItems.map((item, index) => (
              <button
                key={item}
                type="button"
                className={cn(
                  "border-b-2 pb-1 transition-colors",
                  index === 0
                    ? "border-[#c07040] text-[#d69463]"
                    : "border-transparent text-[#d6c3b5] hover:text-[#f5f1ea]",
                )}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="h-8 rounded-sm border-[#333333] bg-transparent px-3 text-[12px] font-semibold text-[#d6c3b5] shadow-none hover:border-[#c07040] hover:bg-[#121212] hover:text-[#f5f1ea]"
              asChild
            >
              <Link href="https://github.com" target="_blank" rel="noreferrer">
                <ExternalLink className="size-3.5" />
                GitHub
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-8 rounded-sm border-[#333333] bg-transparent px-3 text-[12px] font-semibold text-[#d6c3b5] shadow-none hover:border-[#c07040] hover:bg-[#121212] hover:text-[#f5f1ea]"
            >
              <MoonStar className="size-3.5" />
              Theme
            </Button>
            <Button className="h-8 rounded-sm bg-[#c77742] px-4 text-[12px] font-semibold text-black shadow-none hover:bg-[#d28550]">
              <Sparkles className="size-3.5" />
              Open Tool
            </Button>
            <div className="h-4 w-px bg-[#2c2c2c]" />
            <Bell className="size-4.5 text-[#d6c3b5]" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2c2c2c] bg-[#101010] text-[11px] font-bold text-[#d69463]">
              JL
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="outline"
            size="icon-sm"
            className="border-[#333333] bg-transparent text-[#d6c3b5] shadow-none hover:border-[#c07040] hover:bg-[#121212] hover:text-[#f5f1ea]"
          >
            <MoonStar />
          </Button>

          <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="border-[#333333] bg-transparent text-[#d6c3b5] shadow-none hover:border-[#c07040] hover:bg-[#121212] hover:text-[#f5f1ea]"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </DialogTrigger>
            <DialogContent
              showCloseButton={false}
              className="top-0 left-0 h-screen max-w-none translate-x-0 translate-y-0 rounded-none border-0 bg-[#080808] p-0 text-[#f5f1ea]"
            >
              <DialogTitle className="sr-only">Workspace navigation</DialogTitle>
              <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-between border-b border-[#262626] px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#1f1f1f]">
                      <Braces className="size-4.5 text-[#c07040]" />
                    </div>
                    <div>
                      <p className="text-[17px] leading-none font-bold tracking-tight text-[#d3884e]">
                        {APP_NAME}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium tracking-[0.08em] text-[#d6c3b5] uppercase">
                        Pro Workspace
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-[#d6c3b5] hover:bg-[#121212] hover:text-[#f5f1ea]"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X />
                  </Button>
                </div>

                <div className="border-b border-[#262626] px-4 py-4">
                  <div className="flex items-center gap-3 text-[#d6c3b5]">
                    <Search className="size-4.5 shrink-0" />
                    <input
                      placeholder="Search files, actions, or data..."
                      className="w-full border-0 bg-transparent text-sm text-[#f5f1ea] outline-none placeholder:text-[#5b5450]"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
                  <div className="space-y-2">
                    {navItems.map((item, index) => (
                      <button
                        key={item}
                        type="button"
                        className={cn(
                          "flex w-full items-center justify-between rounded-sm border px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.08em]",
                          index === 0
                            ? "border-[#c07040] bg-[#121212] text-[#d69463]"
                            : "border-[#262626] bg-[#101010] text-[#d6c3b5]",
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3 border-t border-[#262626] pt-6">
                    <Button
                      variant="outline"
                      className="h-10 w-full justify-start rounded-sm border-[#333333] bg-transparent px-4 text-sm font-semibold text-[#d6c3b5] shadow-none hover:border-[#c07040] hover:bg-[#121212] hover:text-[#f5f1ea]"
                      asChild
                    >
                      <Link href="https://github.com" target="_blank" rel="noreferrer">
                        <ExternalLink className="size-4" />
                        GitHub
                      </Link>
                    </Button>
                    <Button className="h-10 w-full justify-start rounded-sm bg-[#c77742] px-4 text-sm font-semibold text-black shadow-none hover:bg-[#d28550]">
                      <Sparkles className="size-4" />
                      Open JSON Tool
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
