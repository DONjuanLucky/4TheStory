"use client";

import { PageHeader } from "@/components/PageHeader";
import { HelpPanel } from "@/components/HelpPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Plug,
  MessageCircle,
  Hash,
  Mail,
  Calendar,
  FolderOpen,
  CheckSquare,
  Video,
  Settings,
  Wifi,
} from "lucide-react";

const integrations = [
  {
    name: "Telegram",
    description: "Primary notification and interaction channel. DM pairing, group allowlist, partial stream mode.",
    icon: MessageCircle,
    status: "active" as const,
    color: "from-sky-500 to-blue-600",
    config: [
      { label: "DM Policy", value: "Pairing" },
      { label: "Stream Mode", value: "Partial" },
      { label: "Topic ID", value: "709" },
    ],
    features: ["DM conversations", "Group notifications", "Approval workflows", "CRM queries"],
  },
  {
    name: "Slack",
    description: "Workspace chat integration using Socket Mode. No public URLs needed.",
    icon: Hash,
    status: "active" as const,
    color: "from-purple-500 to-purple-600",
    config: [
      { label: "Mode", value: "Socket" },
      { label: "Policy", value: "Allowlist" },
      { label: "History", value: "50 messages" },
    ],
    features: ["Socket mode (no URLs)", "Channel allowlist", "Thread responses", "Message history"],
  },
  {
    name: "Gmail",
    description: "AI-assisted email drafting with CRM context. Draft-only — no send operations.",
    icon: Mail,
    status: "active" as const,
    color: "from-red-500 to-red-600",
    config: [
      { label: "Draft Writes", value: "Enabled" },
      { label: "Access", value: "gog CLI" },
      { label: "Safety", value: "Draft only" },
    ],
    features: ["AI draft generation", "CRM context injection", "Two-phase approval", "Urgent email alerts"],
  },
  {
    name: "Google Calendar",
    description: "Contact discovery from calendar events. Used by CRM sync and morning briefings.",
    icon: Calendar,
    status: "active" as const,
    color: "from-blue-500 to-blue-600",
    config: [
      { label: "Scan Range", value: "365 days" },
      { label: "Access", value: "gog CLI" },
      { label: "Filter", value: "<10 attendees" },
    ],
    features: ["Contact discovery", "Meeting scheduling", "Daily briefing data", "Event management"],
  },
  {
    name: "Box",
    description: "Document storage with semantic search. Text chunks extracted and embedded for vector search.",
    icon: FolderOpen,
    status: "active" as const,
    color: "from-blue-400 to-blue-500",
    config: [
      { label: "Root Folder", value: "Configured" },
      { label: "Cache", value: "box-cache/" },
      { label: "Embeddings", value: "768-dim" },
    ],
    features: ["Document indexing", "Semantic search", "Contact-doc linking", "Collaborator tracking"],
  },
  {
    name: "Todoist",
    description: "Action item sync from meetings. Creates tasks with project mapping and due dates.",
    icon: CheckSquare,
    status: "active" as const,
    color: "from-red-400 to-red-500",
    config: [
      { label: "Sync", value: "Bidirectional" },
      { label: "Project", value: "Auto-mapped" },
      { label: "Due Dates", value: "From meetings" },
    ],
    features: ["Action item creation", "Project mapping", "Due date sync", "Status tracking"],
  },
  {
    name: "Fathom",
    description: "Meeting recording processing. Auto-extracts contacts, interactions, context, and action items.",
    icon: Video,
    status: "active" as const,
    color: "from-emerald-500 to-emerald-600",
    config: [
      { label: "Processing", value: "Automatic" },
      { label: "Approval", value: "Required" },
      { label: "CRM Sync", value: "Enabled" },
    ],
    features: ["Transcript extraction", "CRM contact creation", "Action item detection", "Summary generation"],
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        title="Integrations"
        description={`${integrations.filter(i => i.status === "active").length} connected services`}
        actions={
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-smooth">
            <Plug className="w-3.5 h-3.5" />
            Add Integration
          </button>
        }
      />

      <HelpPanel section="integrations" />

      {/* Connection Status Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200 p-4 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <Wifi className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-emerald-800">All integrations connected</div>
          <div className="text-xs text-emerald-600">7 services active · Last health check: 2 minutes ago</div>
        </div>
        <button className="px-3 py-1.5 text-xs bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-smooth">
          Run Health Check
        </button>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <div key={integration.name} className="bg-white rounded-xl border border-surface-200 overflow-hidden hover:shadow-lg transition-smooth group">
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${integration.color} px-5 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{integration.name}</h3>
                    <StatusBadge status={integration.status} label="Connected" className="bg-white/20 text-white border-white/30 mt-0.5" />
                  </div>
                </div>
                <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-smooth opacity-0 group-hover:opacity-100">
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                <p className="text-xs text-surface-500 leading-relaxed mb-4">{integration.description}</p>

                {/* Config details */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                  {integration.config.map((cfg) => (
                    <div key={cfg.label} className="text-xs">
                      <span className="text-surface-400">{cfg.label}: </span>
                      <span className="text-surface-700 font-medium">{cfg.value}</span>
                    </div>
                  ))}
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-1.5">
                  {integration.features.map((feature) => (
                    <span key={feature} className="px-2 py-0.5 text-[10px] bg-surface-50 text-surface-500 rounded-full border border-surface-100">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
