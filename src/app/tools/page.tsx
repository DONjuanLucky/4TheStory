"use client";

import { PageHeader } from "@/components/PageHeader";
import { HelpPanel, HelpTooltip } from "@/components/HelpPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Database,
  Play,
  Terminal,
  FileCode,
  BarChart3,
  Video,
  Globe,
  Layers,
} from "lucide-react";

const tools = [
  {
    name: "YouTube Analysis Pipeline",
    file: "youtube-analysis/",
    description: "Competitor video analysis, content strategy, and trend tracking across monitored channels",
    icon: Video,
    status: "active" as const,
    lastRun: "3 hours ago",
    runtime: "4m 12s",
    db: "youtube-analysis.db",
    color: "from-red-500/10 to-red-500/5",
    iconColor: "text-red-500",
  },
  {
    name: "Business Meta-Analysis",
    file: "tools/business-meta-analysis/",
    description: "Vector-embedded opportunity analysis with scoring, categorization, and trend detection",
    icon: BarChart3,
    status: "active" as const,
    lastRun: "2 days ago",
    runtime: "8m 34s",
    db: "business-meta-analysis.db",
    color: "from-brand-500/10 to-brand-500/5",
    iconColor: "text-brand-500",
  },
  {
    name: "Video Pitch Database",
    file: "data/video-pitches/",
    description: "Structured storage and search for video pitch submissions with metadata and scoring",
    icon: Database,
    status: "active" as const,
    lastRun: "1 week ago",
    runtime: "1m 03s",
    db: "video-pitches.db",
    color: "from-emerald-500/10 to-emerald-500/5",
    iconColor: "text-emerald-500",
  },
  {
    name: "Cron Log Viewer",
    file: "data/cron-log/",
    description: "Central log database for all cron job executions with exit codes, timing, and output",
    icon: Terminal,
    status: "active" as const,
    lastRun: "2 min ago",
    runtime: "0.3s",
    db: "cron-log.db",
    color: "from-amber-500/10 to-amber-500/5",
    iconColor: "text-amber-500",
  },
  {
    name: "Web Scraper Toolkit",
    file: "tools/scraper/",
    description: "Configurable web scraping with rate limiting, caching, and structured data extraction",
    icon: Globe,
    status: "inactive" as const,
    lastRun: "3 days ago",
    runtime: "2m 45s",
    db: null,
    color: "from-blue-500/10 to-blue-500/5",
    iconColor: "text-blue-500",
  },
];

const sharedModules = [
  { name: "embeddings.js", description: "Google gemini-embedding-001 (768-dim) vector generation", usage: "12 consumers" },
  { name: "telegram-notify.js", description: "Telegram notification sender with topic routing", usage: "8 consumers" },
  { name: "sqlite-helper.js", description: "SQLite connection manager with WAL mode and migrations", usage: "6 consumers" },
  { name: "gog-client.js", description: "Google Workspace API wrapper (Gmail, Calendar, Drive)", usage: "4 consumers" },
  { name: "rate-limiter.js", description: "Configurable rate limiter for API calls and batch operations", usage: "5 consumers" },
  { name: "llm-client.js", description: "Multi-provider LLM client with fallback chain support", usage: "9 consumers" },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        title="Tools & Utilities"
        description="Standalone scripts, databases, and shared modules"
        actions={
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-smooth">
            <Play className="w-3.5 h-3.5" />
            Run Tool
          </button>
        }
      />

      <HelpPanel section="tools" />

      {/* Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div key={tool.name} className="bg-white rounded-xl border border-surface-200 overflow-hidden hover:shadow-lg transition-smooth group cursor-pointer">
              <div className={`bg-gradient-to-r ${tool.color} px-5 py-4 border-b border-surface-100`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Icon className={`w-4.5 h-4.5 ${tool.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-surface-800">{tool.name}</h3>
                      <p className="text-[10px] text-surface-400 font-mono">{tool.file}</p>
                    </div>
                  </div>
                  <StatusBadge status={tool.status} label={tool.status === "active" ? "Active" : "Idle"} />
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs text-surface-500 leading-relaxed mb-4">{tool.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <span className="text-surface-400">Last run: <span className="text-surface-600 font-medium">{tool.lastRun}</span></span>
                    <span className="text-surface-400">Runtime: <span className="text-surface-600 font-medium">{tool.runtime}</span></span>
                  </div>
                  {tool.db && (
                    <span className="flex items-center gap-1 text-surface-400">
                      <Database className="w-3 h-3" />
                      <span className="font-mono text-[10px]">{tool.db}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shared Modules */}
      <div className="bg-white rounded-xl border border-surface-200">
        <div className="px-5 py-4 border-b border-surface-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-500" />
          <h2 className="text-sm font-semibold text-surface-800">Shared Modules</h2>
          <HelpTooltip text="Reusable Node.js modules in shared/ used across tools and skills for common functionality like embeddings, notifications, and API clients." />
          <span className="text-xs text-surface-400 ml-auto">{sharedModules.length} modules</span>
        </div>
        <div className="divide-y divide-surface-100">
          {sharedModules.map((mod) => (
            <div key={mod.name} className="px-5 py-3.5 flex items-center gap-4 hover:bg-surface-50 transition-smooth">
              <div className="w-8 h-8 bg-surface-100 rounded-lg flex items-center justify-center">
                <FileCode className="w-4 h-4 text-surface-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-surface-800 font-mono">{mod.name}</div>
                <div className="text-xs text-surface-500">{mod.description}</div>
              </div>
              <span className="text-xs text-surface-400 bg-surface-50 px-2 py-1 rounded-full">{mod.usage}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
