"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Users,
  Sparkles,
  Wrench,
  Brain,
  Clock,
  Plug,
  Bot,
  Settings,
  ArrowRight,
  Command,
} from "lucide-react";

const commands = [
  { id: "dashboard", label: "Dashboard", description: "System overview", icon: LayoutDashboard, href: "/" },
  { id: "crm", label: "CRM", description: "Contacts & relationships", icon: Users, href: "/crm" },
  { id: "crm-query", label: "Query CRM", description: "Natural language contact search", icon: Search, href: "/crm" },
  { id: "skills", label: "Skills", description: "Manage AI workflows", icon: Sparkles, href: "/skills" },
  { id: "tools", label: "Tools", description: "Utility scripts & databases", icon: Wrench, href: "/tools" },
  { id: "memory", label: "Memory", description: "Knowledge base & daily notes", icon: Brain, href: "/memory" },
  { id: "memory-search", label: "Search Memory", description: "Semantic knowledge search", icon: Search, href: "/memory" },
  { id: "cron", label: "Cron Jobs", description: "Scheduled automations", icon: Clock, href: "/cron" },
  { id: "integrations", label: "Integrations", description: "Connected services", icon: Plug, href: "/integrations" },
  { id: "subagents", label: "Subagents", description: "Antfarm multi-agent workflows", icon: Bot, href: "/subagents" },
  { id: "run-workflow", label: "Run Workflow", description: "Start an Antfarm workflow", icon: Bot, href: "/subagents" },
  { id: "settings", label: "Settings", description: "Platform configuration", icon: Settings, href: "/settings" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSelect = (href: string) => {
    router.push(href);
    setOpen(false);
    setQuery("");
  };

  const handleInternalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex].href);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-surface-900/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-surface-200 overflow-hidden help-panel-enter">
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-100">
            <Search className="w-5 h-5 text-surface-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleInternalKeyDown}
              placeholder="Search commands, pages, and actions..."
              className="flex-1 text-sm bg-transparent focus:outline-none text-surface-800 placeholder:text-surface-400"
              autoFocus
            />
            <kbd className="px-2 py-0.5 text-[10px] bg-surface-100 text-surface-400 rounded font-mono">ESC</kbd>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto py-2">
            {filtered.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-surface-400">No results found</div>
            ) : (
              filtered.map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => handleSelect(cmd.href)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-smooth ${
                      i === selectedIndex ? "bg-brand-50" : "hover:bg-surface-50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      i === selectedIndex ? "bg-brand-100" : "bg-surface-100"
                    }`}>
                      <Icon className={`w-4 h-4 ${i === selectedIndex ? "text-brand-600" : "text-surface-500"}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${i === selectedIndex ? "text-brand-700" : "text-surface-700"}`}>
                        {cmd.label}
                      </div>
                      <div className="text-xs text-surface-400">{cmd.description}</div>
                    </div>
                    {i === selectedIndex && <ArrowRight className="w-4 h-4 text-brand-400" />}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-2.5 border-t border-surface-100 bg-surface-50 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] text-surface-400">
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-surface-200 rounded text-[9px] font-mono">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-surface-200 rounded text-[9px] font-mono">↵</kbd> Select</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-surface-200 rounded text-[9px] font-mono">ESC</kbd> Close</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-surface-400">
              <Command className="w-2.5 h-2.5" />
              <span>K to toggle</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
