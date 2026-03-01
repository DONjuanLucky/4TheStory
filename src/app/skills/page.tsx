"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { HelpPanel, HelpTooltip } from "@/components/HelpPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Search,
  Download,
  ExternalLink,
  BookOpen,
  Code2,
  Sparkles,
  Eye,
  MoreVertical,
  FolderOpen,
  Tag,
} from "lucide-react";

const skills = [
  { name: "crm-query", description: "Natural language CRM queries via Telegram", status: "active" as const, version: "1.4.2", category: "CRM", lastUsed: "2 min ago" },
  { name: "daily-briefing", description: "Morning summary of calendar, tasks, and priorities", status: "active" as const, version: "2.1.0", category: "Productivity", lastUsed: "6h ago" },
  { name: "youtube-analysis", description: "Competitor video analysis and content strategy", status: "active" as const, version: "1.0.3", category: "Analytics", lastUsed: "3h ago" },
  { name: "email-drafter", description: "AI-assisted email drafting with CRM context", status: "active" as const, version: "1.2.0", category: "Communication", lastUsed: "1h ago" },
  { name: "meeting-processor", description: "Process Fathom recordings into CRM entries and action items", status: "active" as const, version: "1.1.1", category: "Meetings", lastUsed: "Yesterday" },
  { name: "todoist-sync", description: "Sync action items to Todoist with project mapping", status: "active" as const, version: "0.9.2", category: "Productivity", lastUsed: "4h ago" },
  { name: "web-scraper", description: "Extract structured data from web pages", status: "active" as const, version: "1.3.0", category: "Data", lastUsed: "Yesterday" },
  { name: "knowledge-base", description: "Semantic search over workspace knowledge", status: "active" as const, version: "2.0.1", category: "Memory", lastUsed: "30 min ago" },
  { name: "business-analysis", description: "Meta-analysis of business opportunities with embeddings", status: "active" as const, version: "1.0.0", category: "Analytics", lastUsed: "2 days ago" },
  { name: "calendar-manager", description: "Google Calendar event creation and management", status: "active" as const, version: "1.5.0", category: "Productivity", lastUsed: "1h ago" },
  { name: "slack-responder", description: "Auto-respond to Slack messages with context", status: "active" as const, version: "0.8.1", category: "Communication", lastUsed: "15 min ago" },
  { name: "image-analyzer", description: "Vision model analysis of images and screenshots", status: "active" as const, version: "1.0.2", category: "AI", lastUsed: "3h ago" },
];

const previewSkills = [
  { name: "voice-transcription", description: "Real-time voice transcription and note-taking", status: "pending" as const, version: "0.1.0", category: "AI" },
  { name: "github-pr-reviewer", description: "Automated PR review with codebase context", status: "pending" as const, version: "0.2.0", category: "Dev" },
];

const categories = ["All", "CRM", "Productivity", "Analytics", "Communication", "Meetings", "Data", "Memory", "AI", "Dev"];

export default function SkillsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = skills.filter((s) => {
    const matchesSearch = s.name.includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <PageHeader
        title="Skills"
        description={`${skills.length} installed · ${previewSkills.length} in preview`}
        actions={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg hover:bg-surface-50 transition-smooth">
              <ExternalLink className="w-3.5 h-3.5" />
              ClawHub
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-smooth">
              <Download className="w-3.5 h-3.5" />
              Install Skill
            </button>
          </div>
        }
      />

      <HelpPanel section="skills" />

      {/* Skill Anatomy Explainer */}
      <div className="bg-gradient-to-br from-brand-50 via-white to-accent-50 rounded-xl border border-brand-100 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-brand-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-surface-800 mb-2">How Skills Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/80 rounded-lg p-3 border border-brand-100/50">
                <div className="flex items-center gap-2 mb-1.5">
                  <Tag className="w-3.5 h-3.5 text-brand-500" />
                  <span className="text-xs font-semibold text-surface-700">Name & Description</span>
                </div>
                <p className="text-xs text-surface-500 leading-relaxed">A human-readable name and description that helps the AI match your request to the right skill automatically.</p>
              </div>
              <div className="bg-white/80 rounded-lg p-3 border border-brand-100/50">
                <div className="flex items-center gap-2 mb-1.5">
                  <Code2 className="w-3.5 h-3.5 text-brand-500" />
                  <span className="text-xs font-semibold text-surface-700">SKILL.md Content</span>
                </div>
                <p className="text-xs text-surface-500 leading-relaxed">The actual prompt template or workflow steps. Written in markdown with variables. This is what the AI executes.</p>
              </div>
              <div className="bg-white/80 rounded-lg p-3 border border-brand-100/50">
                <div className="flex items-center gap-2 mb-1.5">
                  <FolderOpen className="w-3.5 h-3.5 text-brand-500" />
                  <span className="text-xs font-semibold text-surface-700">Directory Structure</span>
                </div>
                <p className="text-xs text-surface-500 leading-relaxed">Each skill lives in <code className="px-1 py-0.5 bg-surface-100 rounded text-[10px] font-mono">skills/name/</code> with a SKILL.md file and optional package.json for dependencies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills by name or description..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-smooth ${
              activeCategory === cat
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-surface-600 border border-surface-200 hover:border-brand-300 hover:text-brand-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filtered.map((skill) => (
          <div key={skill.name} className="bg-white rounded-xl border border-surface-200 p-5 hover:shadow-lg hover:border-brand-200 transition-smooth group cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-100 to-brand-50 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brand-600" />
              </div>
              <div className="flex items-center gap-1.5">
                <StatusBadge status={skill.status} label={skill.status === "active" ? "Active" : "Preview"} />
                <button className="p-1 text-surface-400 hover:text-surface-600 rounded opacity-0 group-hover:opacity-100 transition-smooth">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-surface-800 font-mono">{skill.name}</h3>
            <p className="text-xs text-surface-500 mt-1 leading-relaxed line-clamp-2">{skill.description}</p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-100">
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-surface-400 font-mono">v{skill.version}</span>
                <span className="text-[10px] text-surface-400 bg-surface-50 px-1.5 py-0.5 rounded">{skill.category}</span>
              </div>
              <span className="text-[10px] text-surface-400">{skill.lastUsed}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Skills */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-semibold text-surface-800">Skills in Preview</h2>
          <HelpTooltip text="Skills in development. Test them here before promoting to your main skills directory." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previewSkills.map((skill) => (
            <div key={skill.name} className="bg-amber-50/50 rounded-xl border border-amber-200/60 p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-surface-800 font-mono">{skill.name}</h3>
                <StatusBadge status="warning" label="Preview" />
              </div>
              <p className="text-xs text-surface-500">{skill.description}</p>
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1.5 text-xs bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-smooth">Promote</button>
                <button className="px-3 py-1.5 text-xs bg-white text-surface-600 rounded-md border border-surface-200 hover:bg-surface-50 transition-smooth">Test</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
