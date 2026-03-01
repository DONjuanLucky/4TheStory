"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { HelpPanel, HelpTooltip } from "@/components/HelpPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Play,
  ArrowRight,
  CheckCircle2,
  Circle,
  Loader2,
  Users,
  GitBranch,
  Shield,
  Code2,
  Eye,
  FileSearch,
  Zap,
  Terminal,
} from "lucide-react";

const workflows = [
  {
    id: "feature-request",
    name: "Feature Request → Tested PR",
    description: "Drop in a feature request, get back a tested PR with code review",
    steps: ["plan", "setup", "implement", "verify", "test", "PR", "review"],
    status: "active" as const,
    runs: 14,
    lastRun: "15 min ago",
  },
  {
    id: "security-audit",
    name: "Security Audit → Fix PR",
    description: "Scan repo for vulnerabilities, rank by severity, patch and re-audit",
    steps: ["scan", "prioritize", "setup", "fix", "verify", "test", "PR"],
    status: "active" as const,
    runs: 3,
    lastRun: "2 days ago",
  },
];

const agentTeam = [
  { role: "Planner", model: "Opus 4.6", description: "Decomposes tasks into atomic user stories", icon: GitBranch, color: "bg-brand-100 text-brand-600" },
  { role: "Developer", model: "Sonnet 4.5", description: "Implements each story in isolation", icon: Code2, color: "bg-blue-100 text-blue-600" },
  { role: "Verifier", model: "Sonnet 4.5", description: "Validates implementation against spec", icon: Eye, color: "bg-amber-100 text-amber-600" },
  { role: "Tester", model: "Sonnet 4.5", description: "Writes and runs test suites", icon: Shield, color: "bg-emerald-100 text-emerald-600" },
  { role: "Reviewer", model: "Opus 4.6", description: "Final code review before merge", icon: FileSearch, color: "bg-purple-100 text-purple-600" },
];

const activeRun = {
  workflow: "Feature Request → Tested PR",
  input: "Add dark mode toggle to settings page with system preference detection",
  startedAt: "15 min ago",
  currentStep: 3,
  steps: [
    { name: "plan", status: "done" as const, agent: "Planner", duration: "2m 14s", output: "3 user stories created" },
    { name: "setup", status: "done" as const, agent: "Developer", duration: "45s", output: "Branch created: feat/dark-mode" },
    { name: "implement", status: "done" as const, agent: "Developer", duration: "4m 32s", output: "Story 1/3 implemented" },
    { name: "verify", status: "running" as const, agent: "Verifier", duration: "1m 08s...", output: "Checking implementation..." },
    { name: "test", status: "pending" as const, agent: "Tester", duration: "—", output: "—" },
    { name: "PR", status: "pending" as const, agent: "Developer", duration: "—", output: "—" },
    { name: "review", status: "pending" as const, agent: "Reviewer", duration: "—", output: "—" },
  ],
};

function StepIcon({ status }: { status: string }) {
  if (status === "done") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
  if (status === "running") return <Loader2 className="w-5 h-5 text-brand-500 animate-spin" />;
  return <Circle className="w-5 h-5 text-surface-300" />;
}

export default function SubagentsPage() {
  const [taskInput, setTaskInput] = useState("");

  return (
    <>
      <PageHeader
        title="Subagents"
        description="Antfarm multi-agent workflows · v0.5.1"
        actions={
          <StatusBadge status="active" label="Antfarm Connected" />
        }
      />

      <HelpPanel section="subagents" />

      {/* New Task Input */}
      <div className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-accent-400" />
          <h3 className="text-sm font-semibold">Launch a Workflow</h3>
        </div>
        <p className="text-xs text-brand-300 mb-4">Describe what you want built. The agent team will plan, implement, test, and PR it automatically.</p>
        <div className="flex gap-3">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder='e.g. "Add export to CSV button on the contacts page"'
            className="flex-1 px-4 py-3 text-sm bg-white/10 border border-white/15 rounded-lg text-white placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-accent-400/40 focus:bg-white/15"
          />
          <button className="px-5 py-3 bg-accent-500 text-brand-950 text-sm font-semibold rounded-lg hover:bg-accent-400 transition-smooth flex items-center gap-2">
            <Play className="w-4 h-4" />
            Start Workflow
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          {["Feature Request", "Security Audit", "Bug Fix", "Refactor"].map((type) => (
            <button key={type} className="px-3 py-1 text-[10px] font-medium bg-white/10 border border-white/15 rounded-full text-brand-300 hover:bg-white/20 hover:text-white transition-smooth">
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Active Run - Pipeline View */}
      <div className="bg-white rounded-xl border border-surface-200 mb-6 overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-brand-500 animate-spin" />
            <h2 className="text-sm font-semibold text-surface-800">Active Run</h2>
            <StatusBadge status="active" label="Running" />
          </div>
          <span className="text-xs text-surface-400">Started {activeRun.startedAt}</span>
        </div>

        {/* Task description */}
        <div className="px-5 py-3 bg-surface-50 border-b border-surface-100">
          <div className="text-xs text-surface-400 mb-0.5">Task</div>
          <div className="text-sm text-surface-800 font-medium">{activeRun.input}</div>
        </div>

        {/* Pipeline Steps */}
        <div className="px-5 py-5">
          {/* Visual pipeline bar */}
          <div className="flex items-center gap-0 mb-6 overflow-x-auto pb-2">
            {activeRun.steps.map((step, i) => (
              <div key={step.name} className="flex items-center">
                <div className={`flex flex-col items-center min-w-[80px] ${step.status === "running" ? "scale-110" : ""} transition-smooth`}>
                  <StepIcon status={step.status} />
                  <span className={`text-[10px] font-semibold mt-1.5 uppercase tracking-wider ${
                    step.status === "done" ? "text-emerald-600" :
                    step.status === "running" ? "text-brand-600" :
                    "text-surface-400"
                  }`}>
                    {step.name}
                  </span>
                  <span className={`text-[9px] mt-0.5 ${
                    step.status === "done" ? "text-surface-400" :
                    step.status === "running" ? "text-brand-400" :
                    "text-surface-300"
                  }`}>
                    {step.agent}
                  </span>
                </div>
                {i < activeRun.steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 rounded-full ${
                    step.status === "done" ? "bg-emerald-300" :
                    step.status === "running" ? "bg-brand-300" :
                    "bg-surface-200"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step detail log */}
          <div className="space-y-2">
            {activeRun.steps.map((step) => (
              <div key={step.name} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs ${
                step.status === "running" ? "bg-brand-50 border border-brand-200" :
                step.status === "done" ? "bg-surface-50" :
                ""
              }`}>
                <StepIcon status={step.status} />
                <span className="font-semibold text-surface-700 uppercase w-20">{step.name}</span>
                <span className="text-surface-500 flex-1">{step.output}</span>
                <span className="text-surface-400 font-mono">{step.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Workflows */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-surface-200">
          <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-brand-500" />
              <h2 className="text-sm font-semibold text-surface-800">Available Workflows</h2>
              <HelpTooltip text="Pre-configured Antfarm workflows. Each defines a team of agents and the steps they execute." />
            </div>
          </div>
          <div className="divide-y divide-surface-100">
            {workflows.map((wf) => (
              <div key={wf.id} className="px-5 py-4 hover:bg-surface-50 transition-smooth group">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-surface-800">{wf.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-surface-400">{wf.runs} runs</span>
                    <button className="px-3 py-1 text-xs bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-smooth opacity-0 group-hover:opacity-100">
                      Run
                    </button>
                  </div>
                </div>
                <p className="text-xs text-surface-500 mb-3">{wf.description}</p>
                <div className="flex items-center gap-1.5">
                  {wf.steps.map((step, i) => (
                    <div key={step} className="flex items-center">
                      <span className="px-2 py-0.5 text-[10px] bg-surface-100 text-surface-500 rounded font-mono">{step}</span>
                      {i < wf.steps.length - 1 && <ArrowRight className="w-3 h-3 text-surface-300 mx-0.5" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Team */}
        <div className="bg-white rounded-xl border border-surface-200">
          <div className="px-5 py-4 border-b border-surface-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-semibold text-surface-800">Agent Team</h2>
            <HelpTooltip text="Each agent runs in a fresh session with clean context. They poll for work, claim steps, and pass context to the next agent." />
          </div>
          <div className="divide-y divide-surface-100">
            {agentTeam.map((agent) => {
              const Icon = agent.icon;
              return (
                <div key={agent.role} className="px-5 py-3.5 flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${agent.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-surface-800">{agent.role}</div>
                    <div className="text-xs text-surface-500 mt-0.5">{agent.description}</div>
                    <div className="text-[10px] text-surface-400 mt-0.5 font-mono">{agent.model}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Architecture note */}
          <div className="px-5 py-4 border-t border-surface-100 bg-surface-50">
            <div className="text-[10px] text-surface-500 space-y-1">
              <div className="flex items-center gap-1.5"><span className="w-1 h-1 bg-brand-400 rounded-full" /> YAML + SQLite + Cron architecture</div>
              <div className="flex items-center gap-1.5"><span className="w-1 h-1 bg-brand-400 rounded-full" /> Zero external infrastructure</div>
              <div className="flex items-center gap-1.5"><span className="w-1 h-1 bg-brand-400 rounded-full" /> Fresh session per agent (no hallucination drift)</div>
              <div className="flex items-center gap-1.5"><span className="w-1 h-1 bg-brand-400 rounded-full" /> Agents verify each other&apos;s work</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
