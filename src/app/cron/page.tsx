"use client";

import { PageHeader } from "@/components/PageHeader";
import { HelpPanel, HelpTooltip } from "@/components/HelpPanel";
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Timer,
  AlertTriangle,
  Calendar,
} from "lucide-react";

const cronJobs = [
  {
    name: "CRM Daily Sync",
    schedule: "0 2 * * *",
    human: "Every day at 2:00 AM PST",
    description: "Scan Gmail & Calendar for new contacts, run batch classification, update embeddings",
    status: "active" as const,
    lastRun: "Today, 2:00 AM",
    lastResult: "success" as const,
    duration: "3m 42s",
    nextRun: "Tomorrow, 2:00 AM",
  },
  {
    name: "Morning Briefing",
    schedule: "0 7 * * 1-5",
    human: "Weekdays at 7:00 AM PST",
    description: "Generate daily briefing with calendar, tasks, follow-ups, and priorities via Telegram",
    status: "active" as const,
    lastRun: "Today, 7:00 AM",
    lastResult: "success" as const,
    duration: "1m 18s",
    nextRun: "Monday, 7:00 AM",
  },
  {
    name: "YouTube Analysis",
    schedule: "0 */6 * * *",
    human: "Every 6 hours",
    description: "Analyze new videos from monitored competitor channels, update strategy database",
    status: "active" as const,
    lastRun: "Today, 6:00 AM",
    lastResult: "success" as const,
    duration: "4m 12s",
    nextRun: "Today, 12:00 PM",
  },
  {
    name: "Follow-up Reminders",
    schedule: "0 9 * * *",
    human: "Every day at 9:00 AM PST",
    description: "Check overdue follow-ups and send Telegram reminders with snooze options",
    status: "active" as const,
    lastRun: "Today, 9:00 AM",
    lastResult: "success" as const,
    duration: "12s",
    nextRun: "Tomorrow, 9:00 AM",
  },
  {
    name: "Box Document Sync",
    schedule: "0 3 * * 0",
    human: "Sundays at 3:00 AM PST",
    description: "Re-index Box documents, extract text chunks, generate embeddings for semantic search",
    status: "active" as const,
    lastRun: "Last Sunday, 3:00 AM",
    lastResult: "success" as const,
    duration: "12m 07s",
    nextRun: "Sunday, 3:00 AM",
  },
  {
    name: "Weekly CRM Report",
    schedule: "0 8 * * 1",
    human: "Mondays at 8:00 AM PST",
    description: "Generate weekly CRM summary — new contacts, interactions, follow-up completion rate",
    status: "active" as const,
    lastRun: "Last Monday, 8:00 AM",
    lastResult: "success" as const,
    duration: "2m 34s",
    nextRun: "Monday, 8:00 AM",
  },
  {
    name: "Memory Reindex",
    schedule: "0 4 * * *",
    human: "Every day at 4:00 AM PST",
    description: "Rebuild vector index for daily notes, state files, and knowledge base entries",
    status: "active" as const,
    lastRun: "Today, 4:00 AM",
    lastResult: "success" as const,
    duration: "5m 19s",
    nextRun: "Tomorrow, 4:00 AM",
  },
  {
    name: "Urgent Email Monitor",
    schedule: "*/15 * * * *",
    human: "Every 15 minutes",
    description: "Check for urgent emails, classify using few-shot learner, send Telegram alerts",
    status: "active" as const,
    lastRun: "12 min ago",
    lastResult: "success" as const,
    duration: "8s",
    nextRun: "In 3 min",
  },
];

const recentExecutions = [
  { job: "Urgent Email Monitor", time: "9:45 AM", result: "success" as const, duration: "8s", output: "0 urgent emails detected" },
  { job: "Morning Briefing", time: "7:00 AM", result: "success" as const, duration: "1m 18s", output: "Briefing sent to Telegram" },
  { job: "YouTube Analysis", time: "6:00 AM", result: "success" as const, duration: "4m 12s", output: "3 new videos analyzed" },
  { job: "Memory Reindex", time: "4:00 AM", result: "success" as const, duration: "5m 19s", output: "2,340 embeddings indexed" },
  { job: "Box Document Sync", time: "3:00 AM", result: "warning" as const, duration: "12m 07s", output: "Completed with 2 skipped files" },
  { job: "CRM Daily Sync", time: "2:00 AM", result: "success" as const, duration: "3m 42s", output: "12 new contacts, 3 auto-approved" },
];

export default function CronPage() {
  return (
    <>
      <PageHeader
        title="Cron Jobs"
        description={`${cronJobs.length} scheduled automations`}
        actions={
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-smooth">
            <Clock className="w-3.5 h-3.5" />
            New Cron Job
          </button>
        }
      />

      <HelpPanel section="cron" />

      {/* Cron Schedule Visual */}
      <div className="bg-white rounded-xl border border-surface-200 mb-6 overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-semibold text-surface-800">Schedule Overview</h2>
            <HelpTooltip text="All active cron jobs with their schedules, last execution results, and next run times." />
          </div>
          <div className="flex items-center gap-3 text-xs text-surface-400">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> All passing</span>
          </div>
        </div>
        <div className="divide-y divide-surface-100">
          {cronJobs.map((job) => (
            <div key={job.name} className="px-5 py-4 hover:bg-surface-50 transition-smooth group">
              <div className="flex items-center gap-4">
                {/* Status dot */}
                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />

                {/* Job info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-surface-800">{job.name}</span>
                    <code className="text-[10px] text-surface-400 bg-surface-100 px-1.5 py-0.5 rounded font-mono">{job.schedule}</code>
                  </div>
                  <p className="text-xs text-surface-500 line-clamp-1">{job.description}</p>
                </div>

                {/* Schedule */}
                <div className="text-right hidden lg:block">
                  <div className="text-xs text-surface-600 font-medium">{job.human}</div>
                  <div className="text-[10px] text-surface-400 mt-0.5 flex items-center justify-end gap-1">
                    <Timer className="w-2.5 h-2.5" />
                    Last: {job.duration}
                  </div>
                </div>

                {/* Next run */}
                <div className="text-right hidden md:block w-36">
                  <div className="text-xs text-surface-500">Next: {job.nextRun}</div>
                  <div className="text-[10px] text-surface-400">Last: {job.lastRun}</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                  <button className="p-1.5 text-surface-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-smooth" title="Run Now">
                    <Play className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-surface-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-smooth" title="Pause">
                    <Pause className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Log */}
      <div className="bg-white rounded-xl border border-surface-200">
        <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-surface-500" />
            <h2 className="text-sm font-semibold text-surface-800">Execution Log</h2>
            <HelpTooltip text="All cron executions are logged with timestamps, exit codes, and output. Failed runs trigger Telegram alerts." />
          </div>
          <span className="text-xs text-surface-400">Today</span>
        </div>
        <div className="divide-y divide-surface-100">
          {recentExecutions.map((exec, i) => (
            <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-surface-50 transition-smooth">
              {exec.result === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              ) : exec.result === "warning" ? (
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-surface-700">{exec.job}</span>
                <span className="text-xs text-surface-400 ml-3">{exec.output}</span>
              </div>
              <span className="text-xs text-surface-400 font-mono">{exec.duration}</span>
              <span className="text-xs text-surface-400">{exec.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
