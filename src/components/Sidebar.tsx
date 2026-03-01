"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  Wrench,
  Brain,
  Clock,
  Plug,
  Bot,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, description: "System overview & quick actions" },
  { href: "/crm", label: "CRM", icon: Users, description: "Contacts, interactions & follow-ups" },
  { href: "/skills", label: "Skills", icon: Sparkles, description: "AI workflows & skill management" },
  { href: "/tools", label: "Tools", icon: Wrench, description: "Utility scripts & databases" },
  { href: "/memory", label: "Memory", icon: Brain, description: "Knowledge base & daily notes" },
  { href: "/cron", label: "Cron Jobs", icon: Clock, description: "Scheduled automations" },
  { href: "/integrations", label: "Integrations", icon: Plug, description: "External service connections" },
  { href: "/subagents", label: "Subagents", icon: Bot, description: "Antfarm multi-agent workflows" },
  { href: "/settings", label: "Settings", icon: Settings, description: "Platform configuration" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-brand-950 text-brand-100 flex flex-col z-50">
      {/* Logo */}
      <div className="p-5 border-b border-brand-800/50">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-900/50">
            <span className="text-accent-400 font-bold text-lg">T</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">TribeCode</h1>
            <p className="text-[10px] text-brand-400 uppercase tracking-widest">AI Platform</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <div key={item.href} className="relative">
              <Link
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-brand-700/60 text-white shadow-sm"
                    : "text-brand-300 hover:bg-brand-800/50 hover:text-white"
                )}
              >
                <Icon className={cn("w-[18px] h-[18px]", isActive ? "text-accent-400" : "")} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-accent-400 rounded-r-full" />
                )}
              </Link>
              {/* Hover tooltip with description */}
              {hoveredItem === item.href && !isActive && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-surface-800 text-surface-100 text-xs rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none">
                  {item.description}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer help link */}
      <div className="p-3 border-t border-brand-800/50">
        <div className="flex items-center gap-2 px-3 py-2 text-brand-400 text-xs">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Press <kbd className="px-1.5 py-0.5 bg-brand-800 rounded text-[10px] font-mono">?</kbd> for help anywhere</span>
        </div>
        <div className="px-3 py-1.5 text-brand-500 text-[10px]">
          v1.0.0 · Powered by OpenClaw + Antfarm
        </div>
      </div>
    </aside>
  );
}
