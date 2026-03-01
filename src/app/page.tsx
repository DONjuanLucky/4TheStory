"use client";

import { PageHeader } from "@/components/PageHeader";
import { HelpPanel, HelpTooltip } from "@/components/HelpPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Activity,
  Users,
  Sparkles,
  Bot,
  Clock,
  ArrowRight,
  Zap,
  Shield,
} from "lucide-react";
import Link from "next/link";

const metrics = [
  { label: "Active Agents", value: "3", change: "+1 today", icon: Bot, color: "text-brand-600", bg: "bg-brand-50" },
  { label: "CRM Contacts", value: "1,174", change: "+12 this week", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Skills Installed", value: "22", change: "2 in preview", icon: Sparkles, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Cron Jobs", value: "8", change: "All healthy", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
];

const recentActivity = [
  { time: "2 min ago", action: "CRM daily sync completed", detail: "12 new contacts discovered, 3 auto-approved", type: "success" as const },
  { time: "15 min ago", action: "Antfarm workflow: feature-request", detail: "Step 4/7 — verify phase running", type: "active" as const },
  { time: "1 hour ago", action: "Fathom meeting processed", detail: "\"Product Roadmap Review\" → 4 action items created", type: "success" as const },
  { time: "2 hours ago", action: "Gmail draft proposed", detail: "Reply to mark@example.com — awaiting approval", type: "pending" as const },
  { time: "3 hours ago", action: "Weekly YouTube analysis", detail: "Competitor report generated for 5 channels", type: "success" as const },
  { time: "6 hours ago", action: "Memory indexed", detail: "348 embeddings updated in knowledge base", type: "success" as const },
];

const quickActions = [
  { label: "Query CRM", href: "/crm", icon: Users, description: "Search contacts with natural language" },
  { label: "Run Workflow", href: "/subagents", icon: Bot, description: "Start an Antfarm multi-agent task" },
  { label: "Install Skill", href: "/skills", icon: Sparkles, description: "Browse and install from ClawHub" },
  { label: "View Cron Logs", href: "/cron", icon: Clock, description: "Check scheduled job history" },
];

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="System overview and quick actions"
        actions={<StatusBadge status="active" label="Gateway Online" />}
      />

      <HelpPanel section="dashboard" />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-xl border border-surface-200 p-5 hover:shadow-md transition-smooth">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${metric.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <HelpTooltip text={`Current count of ${metric.label.toLowerCase()} in your workspace`} />
              </div>
              <div className="text-2xl font-bold text-surface-900">{metric.value}</div>
              <div className="text-xs text-surface-500 mt-1">{metric.change}</div>
              <div className="text-xs text-surface-400 mt-0.5">{metric.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-surface-200">
          <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-surface-500" />
              <h2 className="text-sm font-semibold text-surface-800">Recent Activity</h2>
              <HelpTooltip text="Shows the last 24 hours of agent actions, cron runs, and system events" />
            </div>
            <span className="text-xs text-surface-400">Last 24 hours</span>
          </div>
          <div className="divide-y divide-surface-100">
            {recentActivity.map((item, i) => (
              <div key={i} className="px-5 py-3.5 flex items-start gap-3 hover:bg-surface-50 transition-smooth">
                <StatusBadge status={item.type} label="" showDot={true} className="mt-1 px-0 py-0 border-0 bg-transparent" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-surface-800">{item.action}</div>
                  <div className="text-xs text-surface-500 mt-0.5">{item.detail}</div>
                </div>
                <span className="text-xs text-surface-400 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions + System Health */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-surface-200">
            <div className="px-5 py-4 border-b border-surface-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent-500" />
              <h2 className="text-sm font-semibold text-surface-800">Quick Actions</h2>
            </div>
            <div className="p-3 space-y-1">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.label} href={action.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-50 transition-smooth group">
                    <Icon className="w-4 h-4 text-surface-400 group-hover:text-brand-500" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-surface-700 group-hover:text-surface-900">{action.label}</div>
                      <div className="text-xs text-surface-400">{action.description}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-surface-300 group-hover:text-brand-400" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-surface-200">
            <div className="px-5 py-4 border-b border-surface-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <h2 className="text-sm font-semibold text-surface-800">System Health</h2>
              <HelpTooltip text="Real-time status of gateway, agents, and connected services" />
            </div>
            <div className="p-4 space-y-3">
              {[
                { name: "Gateway", status: "active" as const, detail: "Port 18789 · 14h uptime" },
                { name: "Primary Model", status: "active" as const, detail: "Opus 4.6 · 200K context" },
                { name: "Telegram", status: "active" as const, detail: "Connected · DM pairing" },
                { name: "Slack", status: "active" as const, detail: "Socket mode · 3 channels" },
                { name: "Memory Index", status: "active" as const, detail: "768-dim · 2,340 embeddings" },
                { name: "Antfarm", status: "active" as const, detail: "v0.5.1 · 2 workflows ready" },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-surface-700">{item.name}</div>
                    <div className="text-xs text-surface-400">{item.detail}</div>
                  </div>
                  <StatusBadge status={item.status} label="OK" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
