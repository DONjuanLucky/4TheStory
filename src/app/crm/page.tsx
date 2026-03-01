"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { HelpPanel, HelpTooltip } from "@/components/HelpPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Search,
  UserPlus,
  RefreshCw,
  MessageSquare,
  Calendar,
  Mail,
  Star,
  ChevronRight,
  GitMerge,
  Bell,
  FileText,
} from "lucide-react";

const contacts = [
  { name: "Mark Johnson", email: "mark@venture.co", company: "Venture Capital Inc", role: "Partner", priority: "high", score: 92, lastContact: "2 days ago", interactions: 34 },
  { name: "Sarah Chen", email: "sarah@techco.io", company: "TechCo", role: "CTO", priority: "high", score: 87, lastContact: "1 week ago", interactions: 28 },
  { name: "Alex Rivera", email: "alex@startup.com", company: "Startup Labs", role: "CEO", priority: "medium", score: 73, lastContact: "3 days ago", interactions: 19 },
  { name: "Lisa Park", email: "lisa@design.co", company: "DesignCo", role: "Head of Product", priority: "medium", score: 65, lastContact: "2 weeks ago", interactions: 12 },
  { name: "David Kim", email: "david@agency.io", company: "Growth Agency", role: "Director", priority: "low", score: 48, lastContact: "1 month ago", interactions: 7 },
  { name: "Emma Watson", email: "emma@media.com", company: "Media Corp", role: "Editor", priority: "low", score: 35, lastContact: "3 weeks ago", interactions: 4 },
];

const followUps = [
  { id: 1, contact: "Mark Johnson", reason: "Follow up on funding discussion", due: "Tomorrow", status: "pending" as const },
  { id: 2, contact: "Sarah Chen", reason: "Share technical architecture doc", due: "In 3 days", status: "pending" as const },
  { id: 3, contact: "Alex Rivera", reason: "Product demo scheduling", due: "Overdue", status: "error" as const },
];

const intents = [
  { query: "Tell me about Mark", intent: "contact", description: "Look up a specific contact by name" },
  { query: "Who talked about fundraising?", intent: "topic", description: "Semantic search across all interactions" },
  { query: "Follow up with Lisa in 2 weeks", intent: "create_follow_up", description: "Schedule a reminder" },
  { query: "Who needs attention?", intent: "nudges", description: "Contacts you haven't reached out to recently" },
  { query: "Show docs for Mark", intent: "contact_documents", description: "Box documents relevant to a contact" },
  { query: "Scan for new contacts", intent: "sync", description: "Trigger contact discovery from email/calendar" },
];

export default function CRMPage() {
  const [query, setQuery] = useState("");

  return (
    <>
      <PageHeader
        title="Personal CRM"
        description="1,174 contacts · AI-powered relationship tracking"
        actions={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg hover:bg-surface-50 transition-smooth">
              <RefreshCw className="w-3.5 h-3.5" />
              Sync Now
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-smooth">
              <UserPlus className="w-3.5 h-3.5" />
              Add Contact
            </button>
          </div>
        }
      />

      <HelpPanel section="crm" />

      {/* Natural Language Query */}
      <div className="bg-white rounded-xl border border-surface-200 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-brand-500" />
          <h3 className="text-sm font-semibold text-surface-800">Natural Language Query</h3>
          <HelpTooltip text="Type questions in plain English. The AI detects your intent and searches contacts, topics, documents, and more." />
        </div>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Try: "Who have I talked to about fundraising?" or "Show my follow-ups"'
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400"
            />
          </div>
          <button className="px-4 py-2.5 bg-brand-600 text-white text-sm rounded-lg hover:bg-brand-700 transition-smooth">
            Search
          </button>
        </div>

        {/* Intent Examples */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-2">
          {intents.map((item) => (
            <button
              key={item.query}
              onClick={() => setQuery(item.query)}
              className="text-left px-3 py-2 rounded-lg bg-surface-50 hover:bg-brand-50 border border-surface-100 hover:border-brand-200 transition-smooth group"
            >
              <div className="text-xs font-medium text-surface-700 group-hover:text-brand-700">&ldquo;{item.query}&rdquo;</div>
              <div className="text-[10px] text-surface-400 mt-0.5">{item.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-surface-200">
          <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-surface-800">Recent Contacts</h2>
            <span className="text-xs text-surface-400">Sorted by relationship score</span>
          </div>
          <div className="divide-y divide-surface-100">
            {contacts.map((contact) => (
              <div key={contact.email} className="px-5 py-3.5 flex items-center gap-4 hover:bg-surface-50 transition-smooth cursor-pointer group">
                <div className="w-9 h-9 bg-brand-100 rounded-full flex items-center justify-center text-sm font-semibold text-brand-700">
                  {contact.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-surface-800">{contact.name}</span>
                    {contact.priority === "high" && <Star className="w-3 h-3 text-accent-500 fill-accent-500" />}
                  </div>
                  <div className="text-xs text-surface-500">{contact.role} at {contact.company}</div>
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-xs text-surface-500">{contact.lastContact}</div>
                  <div className="text-[10px] text-surface-400">{contact.interactions} interactions</div>
                </div>
                <div className="w-12 text-right">
                  <span className="text-sm font-semibold text-brand-600">{contact.score}</span>
                  <div className="text-[10px] text-surface-400">score</div>
                </div>
                <ChevronRight className="w-4 h-4 text-surface-300 group-hover:text-brand-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Follow-ups + Merge Suggestions */}
        <div className="space-y-6">
          {/* Follow-ups */}
          <div className="bg-white rounded-xl border border-surface-200">
            <div className="px-5 py-4 border-b border-surface-100 flex items-center gap-2">
              <Bell className="w-4 h-4 text-accent-500" />
              <h2 className="text-sm font-semibold text-surface-800">Follow-ups</h2>
              <HelpTooltip text="Scheduled reminders for contacts. Say 'Follow up with Lisa in 2 weeks' to create one." />
            </div>
            <div className="divide-y divide-surface-100">
              {followUps.map((item) => (
                <div key={item.id} className="px-5 py-3 flex items-start gap-3">
                  <StatusBadge status={item.status} label="" showDot={true} className="mt-1 px-0 py-0 border-0 bg-transparent" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-surface-700">{item.contact}</div>
                    <div className="text-xs text-surface-500">{item.reason}</div>
                    <div className="text-xs text-surface-400 mt-1">Due: {item.due}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Merge Suggestions */}
          <div className="bg-white rounded-xl border border-surface-200">
            <div className="px-5 py-4 border-b border-surface-100 flex items-center gap-2">
              <GitMerge className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-semibold text-surface-800">Merge Suggestions</h2>
              <HelpTooltip text="Duplicate contacts detected. Review and merge to keep your CRM clean." />
            </div>
            <div className="p-5">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="text-sm font-medium text-blue-800">2 potential duplicates found</div>
                <div className="text-xs text-blue-600 mt-1">John Smith ↔ J. Smith (score: 0.94)</div>
                <div className="text-xs text-blue-600 mt-0.5">Mike Lee ↔ Michael Lee (score: 0.91)</div>
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700">Review</button>
                  <button className="px-3 py-1.5 text-xs bg-white text-blue-600 rounded-md border border-blue-200 hover:bg-blue-50">Dismiss</button>
                </div>
              </div>
            </div>
          </div>

          {/* Discovery Stats */}
          <div className="bg-white rounded-xl border border-surface-200 p-5">
            <h3 className="text-sm font-semibold text-surface-800 mb-3">Discovery Stats</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-surface-500 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> From Email</span>
                <span className="font-medium text-surface-700">847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> From Calendar</span>
                <span className="font-medium text-surface-700">312</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> From Fathom</span>
                <span className="font-medium text-surface-700">15</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
