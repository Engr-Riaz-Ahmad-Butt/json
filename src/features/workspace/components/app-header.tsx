"use client";

import Link from "next/link";
import { ExternalLink, Menu, MoonStar, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/constants";
import { cn } from "@/lib/utils";

type NavSection = {
  title: string;
  items: string[];
};

type NavGroup = {
  id: string;
  label: string;
  href?: string;
  sections?: NavSection[];
};

const navGroups: NavGroup[] = [
  {
    id: "tools",
    label: "Tools",
    sections: [
      {
        title: "View & Fix",
        items: [
          "JSON Formatter",
          "JSON Validator",
          "JSON Tree Viewer",
          "JSON Minifier",
          "JSON Repair",
        ],
      },
      {
        title: "Debug",
        items: ["JSON Diff", "JSONPath Finder", "JWT Decoder", "Sensitive Data Scanner"],
      },
    ],
  },
  {
    id: "converters",
    label: "Converters",
    sections: [
      {
        title: "Code Generators",
        items: ["JSON to TypeScript", "JSON to Zod", "JSON to Mongoose", "JSON to Prisma"],
      },
      {
        title: "Data Formats",
        items: ["JSON to CSV", "JSON to YAML", "JSON to XML"],
      },
    ],
  },
  {
    id: "examples",
    label: "Examples",
    sections: [
      {
        title: "Sample JSON",
        items: [
          "User API Response",
          "Product List",
          "Order Object",
          "Stripe Webhook",
          "JWT Payload",
          "MongoDB Document",
        ],
      },
    ],
  },
  {
    id: "docs",
    label: "Docs",
    sections: [
      {
        title: "Learn",
        items: [
          "What is JSON?",
          "Common JSON Errors",
          "JSON vs JavaScript Object",
          "JSONPath Guide",
          "JSON Schema Guide",
        ],
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "#pricing",
  },
];

const activeGroupId = "tools";

export function AppHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const openGroup = useMemo(
    () => navGroups.find((group) => group.id === openMenu && group.sections),
    [openMenu],
  );
  const openSections = openGroup?.sections ?? [];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    function handlePointerDown(event: MouseEvent) {
      if (openMenu && !navRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [openMenu]);

  const handleGroupToggle = (group: NavGroup) => {
    if (!group.sections) return;
    setOpenMenu((current) => (current === group.id ? null : group.id));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[rgba(255,255,255,0.82)] backdrop-blur-[16px] dark:bg-[rgba(2,6,23,0.82)]">
      <div className="flex h-14 w-full items-center justify-between gap-4 sm:h-16 lg:h-[72px]">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center rounded-[var(--radius-card)] bg-[image:var(--primary-gradient)] text-white shadow-[var(--shadow-floating)]">
            <span className="font-mono text-sm font-semibold tracking-tight">{`{}`}</span>
            <span className="absolute -right-0.5 top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--brand-cyan)]" />
          </div>
          <span className="text-[20px] leading-none font-semibold tracking-tight text-foreground">
            {APP_NAME}
          </span>
        </Link>

        <div
          ref={navRef}
          className="relative hidden h-full items-center gap-8 lg:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          <nav className="flex h-full items-center gap-1">
            {navGroups.map((group) => {
              const isActive = group.id === activeGroupId;
              const isOpen = group.id === openMenu;

              if (!group.sections) {
                return (
                  <Link
                    key={group.id}
                    href={group.href ?? "#"}
                    className={cn(
                      "relative inline-flex h-full items-center px-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-primary",
                      isActive && "text-foreground",
                    )}
                  >
                    {group.label}
                    {isActive ? (
                      <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[image:var(--primary-gradient)]" />
                    ) : null}
                  </Link>
                );
              }

              return (
                <button
                  key={group.id}
                  type="button"
                  className={cn(
                    "relative inline-flex h-full items-center px-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive && "text-foreground",
                  )}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  onMouseEnter={() => setOpenMenu(group.id)}
                  onClick={() => handleGroupToggle(group)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleGroupToggle(group);
                    }
                    if (event.key === "Escape") {
                      setOpenMenu(null);
                    }
                  }}
                >
                  {group.label}
                  {(isActive || isOpen) && (
                    <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[image:var(--primary-gradient)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {openGroup ? (
            <div
              className="absolute left-0 top-[calc(100%-10px)] w-[620px] rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-floating)] transition-all duration-200"
              role="menu"
            >
              <div className={cn("grid gap-6", openSections.length > 1 && "md:grid-cols-2")}>
                {openSections.map((section) => (
                  <div key={section.title} className="space-y-3">
                    <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {section.title}
                    </p>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <button
                          key={item}
                          type="button"
                          className="flex w-full items-center rounded-[var(--radius-card)] px-3 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          role="menuitem"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              <ExternalLink />
              GitHub
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <MoonStar />
            Theme
          </Button>
          <Button
            size="sm"
            className="h-10 rounded-[var(--radius-input)] border-0 bg-[image:var(--primary-gradient)] px-4 text-white shadow-[var(--shadow-floating)] hover:opacity-95"
          >
            <Sparkles />
            Try JSONLens
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="outline" size="icon-sm" aria-label="Toggle theme">
            <MoonStar />
          </Button>

          <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon-sm" aria-label="Open menu">
                <Menu />
              </Button>
            </DialogTrigger>
            <DialogContent
              showCloseButton={false}
              className="top-0 left-0 h-screen max-w-none translate-x-0 translate-y-0 rounded-none border-0 bg-background p-0 ring-0"
            >
              <DialogTitle className="sr-only">Navigation menu</DialogTitle>
              <div className="flex h-full flex-col">
                <div className="flex h-14 items-center justify-between border-b border-border px-4 sm:h-16">
                  <div className="flex items-center gap-3">
                    <div className="relative flex size-10 items-center justify-center rounded-[var(--radius-card)] bg-[image:var(--primary-gradient)] text-white shadow-[var(--shadow-floating)]">
                      <span className="font-mono text-sm font-semibold tracking-tight">{`{}`}</span>
                      <span className="absolute -right-0.5 top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--brand-cyan)]" />
                    </div>
                    <span className="text-[20px] font-semibold tracking-tight">{APP_NAME}</span>
                  </div>
                  <Button variant="ghost" size="icon-sm" onClick={() => setMobileOpen(false)}>
                    <X />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6">
                  <div className="space-y-6">
                    {navGroups.map((group) => (
                      <div key={group.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-base font-semibold text-foreground">{group.label}</p>
                        </div>
                        {group.sections ? (
                          <div className="space-y-4">
                            {group.sections.map((section) => (
                              <div key={section.title} className="space-y-2">
                                <p className="text-[13px] uppercase tracking-[0.18em] text-muted-foreground">
                                  {section.title}
                                </p>
                                <div className="space-y-1">
                                  {section.items.map((item) => (
                                    <button
                                      key={item}
                                      type="button"
                                      className="flex w-full rounded-[var(--radius-card)] px-3 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-secondary hover:text-primary"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {item}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Link
                            href={group.href ?? "#"}
                            className="block rounded-[var(--radius-card)] px-3 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-secondary hover:text-primary"
                            onClick={() => setMobileOpen(false)}
                          >
                            Visit {group.label}
                          </Link>
                        )}
                        <Separator />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border p-4">
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" asChild>
                      <Link href="https://github.com" target="_blank" rel="noreferrer">
                        <ExternalLink />
                        GitHub
                      </Link>
                    </Button>
                    <Button
                      className="h-10 rounded-[var(--radius-input)] border-0 bg-[image:var(--primary-gradient)] text-white shadow-[var(--shadow-floating)] hover:opacity-95"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Sparkles />
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
