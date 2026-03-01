"use client";

import { PageHeader } from "@/components/PageHeader";
import { HelpPanel, HelpTooltip } from "@/components/HelpPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Settings,
  Cpu,
  Server,
  Key,
  ArrowRight,
  ChevronRight,
  RefreshCw,
  Save,
  AlertTriangle,
} from "lucide-react";

const modelProviders = [
  {
    name: "Anthropic",
    models: ["Opus 4.6 (primary)", "Sonnet 4.5", "Haiku 4.5"],
    context: "200K (1M via tier 4+)",
    pricing: "Pay-per-token",
    status: "active" as const,
    isPrimary: true,
  },
  {
    name: "Google",
    models: ["Gemini 3 Pro", "Gemini 3 Flash"],
    context: "2M / 1M",
    pricing: "Free",
    status: "active" as const,
    isPrimary: false,
  },
  {
    name: "X.AI",
    models: ["Grok Beta"],
    context: "131K",
    pricing: "$5/$15 per 1M tokens",
    status: "active" as const,
    isPrimary: false,
  },
];

const gatewayConfig = [
  { label: "Port", value: "18789", editable: true },
  { label: "Mode", value: "Local (loopback only)", editable: false },
  { label: "Auth", value: "Token-based", editable: false },
  { label: "Tailscale", value: "Off", editable: true },
  { label: "Version", value: "2026.2.15", editable: false },
];

const agentSettings = [
  { label: "Primary Model", value: "anthropic/claude-opus-4-6", help: "Main model used for conversations and complex tasks" },
  { label: "Max Concurrent Agents", value: "4", help: "Maximum parallel agent sessions" },
  { label: "Max Concurrent Subagents", value: "8", help: "Maximum parallel subagent sessions across all parent agents" },
  { label: "Subagent Model", value: "anthropic/claude-sonnet-4-5", help: "Default model for subagent sessions" },
  { label: "Context Pruning", value: "cache-ttl, 1h TTL", help: "How old context is cleaned up to manage token usage" },
  { label: "Heartbeat Interval", value: "1 hour", help: "How often the agent checks in for proactive tasks" },
  { label: "Memory Backend", value: "builtin (Gemini embeddings)", help: "Vector embedding provider for memory indexing" },
];

const envVars = [
  { name: "ANTHROPIC_API_KEY", set: true, source: "~/.openclaw/.env" },
  { name: "GOOGLE_GEMINI_API_KEY", set: true, source: "~/.openclaw/.env" },
  { name: "XAI_API_KEY", set: true, source: "~/.openclaw/.env" },
  { name: "TELEGRAM_BOT_TOKEN", set: true, source: "~/.openclaw/.env" },
  { name: "SLACK_BOT_TOKEN", set: true, source: "~/.openclaw/.env" },
  { name: "BOX_ACCESS_TOKEN", set: true, source: "~/.openclaw/.env" },
  { name: "BOX_ROOT_FOLDER_ID", set: true, source: "~/.openclaw/.env" },
  { name: "GMAIL_DRAFT_WRITES_ENABLED", set: true, source: "~/.openclaw/.env" },
  { name: "TODOIST_API_TOKEN", set: true, source: "~/.openclaw/.env" },
  { name: "FATHOM_API_KEY", set: true, source: "~/.openclaw/.env" },
];

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Platform configuration and preferences"
        actions={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg hover:bg-surface-50 transition-smooth">
              <RefreshCw className="w-3.5 h-3.5" />
              Restart Gateway
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-smooth">
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        }
      />

      <HelpPanel section="settings" />

      <div className="space-y-6">
        {/* Model Providers */}
        <div className="bg-white rounded-xl border border-surface-200">
          <div className="px-5 py-4 border-b border-surface-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-semibold text-surface-800">Model Providers</h2>
            <HelpTooltip text="AI model providers and their available models. The fallback chain determines which model is used if the primary is unavailable." />
          </div>

          {/* Fallback Chain Visual */}
          <div className="px-5 py-3 bg-surface-50 border-b border-surface-100">
            <div className="text-[10px] text-surface-400 uppercase tracking-wide mb-2">Fallback Chain</div>
            <div className="flex items-center gap-1 flex-wrap">
              {["Opus 4.6", "Sonnet 4.5", "Gemini 3 Pro", "Gemini 3 Flash", "Haiku 4.5"].map((model, i, arr) => (
                <div key={model} className="flex items-center">
                  <span className={`px-2.5 py-1 text-xs rounded-md font-medium ${
                    i === 0 ? "bg-brand-100 text-brand-700 border border-brand-200" : "bg-surface-100 text-surface-600"
                  }`}>{model}</span>
                  {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-surface-400 mx-1" />}
                </div>
              ))}
            </div>
          </div>

          <div className="divide-y divide-surface-100">
            {modelProviders.map((provider) => (
              <div key={provider.name} className="px-5 py-4 flex items-start gap-4 hover:bg-surface-50 transition-smooth">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${provider.isPrimary ? "bg-brand-100" : "bg-surface-100"}`}>
                  <Cpu className={`w-4 h-4 ${provider.isPrimary ? "text-brand-600" : "text-surface-500"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-surface-800">{provider.name}</span>
                    {provider.isPrimary && <StatusBadge status="active" label="Primary" />}
                    <StatusBadge status={provider.status} label="Connected" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {provider.models.map((model) => (
                      <span key={model} className="px-2 py-0.5 text-[10px] bg-surface-50 text-surface-500 rounded-full border border-surface-100 font-mono">{model}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-xs text-surface-400">
                    <span>Context: {provider.context}</span>
                    <span>Pricing: {provider.pricing}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-surface-300 mt-1" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agent Settings */}
          <div className="bg-white rounded-xl border border-surface-200">
            <div className="px-5 py-4 border-b border-surface-100 flex items-center gap-2">
              <Settings className="w-4 h-4 text-brand-500" />
              <h2 className="text-sm font-semibold text-surface-800">Agent Settings</h2>
            </div>
            <div className="divide-y divide-surface-100">
              {agentSettings.map((setting) => (
                <div key={setting.label} className="px-5 py-3 flex items-center justify-between hover:bg-surface-50 transition-smooth">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-surface-700">{setting.label}</span>
                    <HelpTooltip text={setting.help} />
                  </div>
                  <span className="text-sm font-mono text-surface-600 bg-surface-50 px-2.5 py-1 rounded-md">{setting.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gateway Config */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-surface-200">
              <div className="px-5 py-4 border-b border-surface-100 flex items-center gap-2">
                <Server className="w-4 h-4 text-brand-500" />
                <h2 className="text-sm font-semibold text-surface-800">Gateway</h2>
                <HelpTooltip text="Core gateway process settings. Changes require a restart to take effect." />
              </div>
              <div className="divide-y divide-surface-100">
                {gatewayConfig.map((cfg) => (
                  <div key={cfg.label} className="px-5 py-3 flex items-center justify-between">
                    <span className="text-sm text-surface-700">{cfg.label}</span>
                    <span className="text-sm font-mono text-surface-600">{cfg.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Environment Variables */}
            <div className="bg-white rounded-xl border border-surface-200">
              <div className="px-5 py-4 border-b border-surface-100 flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-semibold text-surface-800">Environment Variables</h2>
                <HelpTooltip text="API keys and tokens loaded from ~/.openclaw/.env. Never share these values." />
                <span className="text-xs text-surface-400 ml-auto">{envVars.length} configured</span>
              </div>
              <div className="divide-y divide-surface-100">
                {envVars.map((env) => (
                  <div key={env.name} className="px-5 py-2.5 flex items-center justify-between hover:bg-surface-50 transition-smooth">
                    <span className="text-xs font-mono text-surface-700">{env.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-surface-400">{env.source}</span>
                      <StatusBadge status={env.set ? "active" : "error"} label={env.set ? "Set" : "Missing"} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl border border-red-200">
          <div className="px-5 py-4 border-b border-red-100 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h2 className="text-sm font-semibold text-red-800">Danger Zone</h2>
          </div>
          <div className="px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-surface-800">Reset All Settings</div>
              <div className="text-xs text-surface-500">Restore all configuration to defaults. This cannot be undone.</div>
            </div>
            <button className="px-4 py-2 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-smooth font-medium">
              Reset Configuration
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
