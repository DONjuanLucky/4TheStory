"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { HelpPanel, HelpTooltip } from "@/components/HelpPanel";
import {
  Brain,
  Search,
  Calendar,
  FileText,
  Database,
  Cpu,
  BookOpen,
  ArrowRight,
  Layers,
  TrendingUp,
} from "lucide-react";

const dailyNotes = [
  { date: "2026-03-01", title: "Saturday Morning Briefing", entries: 12, topics: ["meetings", "follow-ups", "content"], size: "4.2 KB" },
  { date: "2026-02-28", title: "Friday Wrap-up", entries: 18, topics: ["sprint review", "CRM sync", "video analysis"], size: "6.8 KB" },
  { date: "2026-02-27", title: "Thursday Notes", entries: 9, topics: ["product roadmap", "investor call", "hiring"], size: "3.1 KB" },
  { date: "2026-02-26", title: "Wednesday Notes", entries: 15, topics: ["partnership", "marketing", "tech debt"], size: "5.4 KB" },
  { date: "2026-02-25", title: "Tuesday Notes", entries: 7, topics: ["standup", "bug fixes", "design review"], size: "2.7 KB" },
];

const stateFiles = [
  { name: "batch-scan-progress.json", description: "CRM batch scan checkpoint — resume from last position", updated: "2h ago", size: "1.2 KB" },
  { name: "youtube-cursor.json", description: "YouTube analysis sync position across monitored channels", updated: "3h ago", size: "0.4 KB" },
  { name: "email-draft-queue.json", description: "Pending email drafts awaiting approval in Telegram", updated: "1h ago", size: "2.1 KB" },
  { name: "fathom-sync-state.json", description: "Last processed Fathom meeting ID and timestamp", updated: "Yesterday", size: "0.2 KB" },
  { name: "learning-corrections.json", description: "Self-improvement corrections from .learnings/ directory", updated: "3 days ago", size: "8.7 KB" },
];

const referenceData = [
  { name: "competitors.md", description: "Competitor landscape and tracking list", entries: 24 },
  { name: "recycling-guide.md", description: "Product recycling and sustainability reference", entries: 156 },
  { name: "team-directory.md", description: "Internal team contacts and roles", entries: 18 },
];

export default function MemoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <PageHeader
        title="Memory System"
        description="Knowledge base, daily notes, and persistent context"
        actions={
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-smooth">
            <Brain className="w-3.5 h-3.5" />
            Reindex All
          </button>
        }
      />

      <HelpPanel section="memory" />

      {/* Embedding Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Embeddings", value: "2,340", icon: Cpu, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Vector Dimensions", value: "768", icon: Layers, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Daily Notes", value: "142", icon: Calendar, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Index Health", value: "100%", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-surface-200 p-4 flex items-center gap-3">
              <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <div className="text-lg font-bold text-surface-900">{stat.value}</div>
                <div className="text-[10px] text-surface-400 uppercase tracking-wide">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Semantic Search */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Search className="w-4 h-4 text-brand-200" />
          <h3 className="text-sm font-semibold">Semantic Knowledge Search</h3>
          <HelpTooltip text="Search by meaning, not just keywords. Uses 768-dim vector embeddings to find related memories across all sources." />
        </div>
        <p className="text-xs text-brand-200 mb-4">Search across daily notes, state files, CRM context, and reference data using natural language.</p>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='e.g. "What did we discuss about the Series A timeline?"'
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15"
            />
          </div>
          <button className="px-5 py-2.5 bg-white text-brand-700 text-sm font-medium rounded-lg hover:bg-brand-50 transition-smooth">
            Search
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          {["fundraising timeline", "product decisions", "competitor intel", "action items"].map((example) => (
            <button
              key={example}
              onClick={() => setSearchQuery(example)}
              className="px-2.5 py-1 text-[10px] bg-white/10 border border-white/15 rounded-full text-brand-200 hover:bg-white/20 hover:text-white transition-smooth"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Notes */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-surface-200">
          <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-500" />
              <h2 className="text-sm font-semibold text-surface-800">Daily Notes</h2>
              <HelpTooltip text="Auto-generated notes from agent activity, conversations, and system events. Each day gets its own file." />
            </div>
            <span className="text-xs text-surface-400">Showing last 5 days</span>
          </div>
          <div className="divide-y divide-surface-100">
            {dailyNotes.map((note) => (
              <div key={note.date} className="px-5 py-4 hover:bg-surface-50 transition-smooth cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-3.5 h-3.5 text-brand-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-surface-800">{note.title}</div>
                      <div className="text-xs text-surface-400 flex items-center gap-2">
                        <span>{note.date}</span>
                        <span>·</span>
                        <span>{note.entries} entries</span>
                        <span>·</span>
                        <span>{note.size}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-surface-300 group-hover:text-brand-400 transition-smooth" />
                </div>
                <div className="flex gap-1.5 ml-11">
                  {note.topics.map((topic) => (
                    <span key={topic} className="px-2 py-0.5 text-[10px] bg-surface-100 text-surface-500 rounded-full">{topic}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State Files + Reference */}
        <div className="space-y-6">
          {/* State Files */}
          <div className="bg-white rounded-xl border border-surface-200">
            <div className="px-5 py-4 border-b border-surface-100 flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-semibold text-surface-800">State Files</h2>
              <HelpTooltip text="Mutable runtime state used by scripts and cron jobs. These track sync positions, queues, and progress checkpoints." />
            </div>
            <div className="divide-y divide-surface-100">
              {stateFiles.map((file) => (
                <div key={file.name} className="px-5 py-3 hover:bg-surface-50 transition-smooth cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-surface-700 font-mono">{file.name}</span>
                    <span className="text-[10px] text-surface-400">{file.updated}</span>
                  </div>
                  <p className="text-[10px] text-surface-400 mt-0.5">{file.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reference Data */}
          <div className="bg-white rounded-xl border border-surface-200">
            <div className="px-5 py-4 border-b border-surface-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-500" />
              <h2 className="text-sm font-semibold text-surface-800">Reference Data</h2>
              <HelpTooltip text="Static datasets that agents can reference. Updated manually or via scheduled imports." />
            </div>
            <div className="divide-y divide-surface-100">
              {referenceData.map((ref) => (
                <div key={ref.name} className="px-5 py-3 hover:bg-surface-50 transition-smooth cursor-pointer">
                  <div className="text-xs font-medium text-surface-700 font-mono">{ref.name}</div>
                  <div className="text-[10px] text-surface-400 mt-0.5">{ref.description} · {ref.entries} entries</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
