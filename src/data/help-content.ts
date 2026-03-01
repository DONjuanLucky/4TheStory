export interface HelpSection {
  title: string;
  summary: string;
  details: string;
  tips: string[];
}

export const helpContent: Record<string, HelpSection> = {
  dashboard: {
    title: "Welcome to TribeCode",
    summary:
      "Your command center for managing AI agents, CRM, skills, and automations — all in one place.",
    details:
      "The dashboard gives you a real-time overview of your entire TribeCode workspace. You can see active agents, recent activity, system health, and jump to any section with quick actions. Everything here updates automatically.",
    tips: [
      "Check the System Health card to ensure your gateway is running",
      "Use Quick Actions to navigate to frequently used features",
      "The Activity Feed shows the last 24 hours of agent actions",
      "Click any metric card to drill into detailed views",
    ],
  },
  crm: {
    title: "Personal CRM",
    summary:
      "Automatically discover and manage contacts from your email and calendar with AI-powered relationship tracking.",
    details:
      "The CRM scans Gmail and Google Calendar (last 365 days) to discover contacts, tracks relationships with vector-based semantic search, integrates with Box for document relevance, and supports AI-assisted email drafting. Use natural language queries like 'Who have I talked to about fundraising?' to search your entire contact history.",
    tips: [
      "Type natural language queries — 'Tell me about Mark' or 'Who needs attention?'",
      "Follow-ups can be snoozed, completed, or rescheduled from the table",
      "The system learns from your approve/reject decisions to auto-filter contacts",
      "Merge suggestions detect duplicate contacts — review them weekly",
      "Use 'Show source #N' to inspect evidence behind any query result",
    ],
  },
  skills: {
    title: "Skills Manager",
    summary:
      "Skills are reusable AI workflows packaged as markdown files. Install, edit, and manage them here.",
    details:
      "Each skill has three parts: a name, a description, and the content (prompt or workflow steps). Skills are discovered via SKILL.md files in skill directories. You can install skills from ClawHub, the public marketplace with 5,700+ community-built skills, or create your own.",
    tips: [
      "Skills live in ~/clawd/skills/ — each skill has its own directory",
      "A SKILL.md file defines the skill name, description, and instructions",
      "Install from ClawHub using the 'Install Skill' button",
      "Preview skills in skills-preview/ before promoting to production",
      "Always review skill source code before installing (security best practice)",
    ],
  },
  tools: {
    title: "Tools & Utilities",
    summary:
      "Standalone utility scripts, databases, and automation tools that extend the platform.",
    details:
      "Tools are standalone scripts for tasks like YouTube analysis, business meta-analysis, video pitch databases, and more. They use shared modules from shared/ for common functionality. Each tool can be run manually or scheduled via cron.",
    tips: [
      "Tools use SQLite databases for persistent data",
      "Shared modules in shared/ provide embeddings, Telegram notifications, and API clients",
      "Check tool output logs for debugging",
      "Tools can be invoked by agents via the tool system",
    ],
  },
  memory: {
    title: "Memory System",
    summary:
      "Daily notes, state files, and knowledge base entries that give your agents persistent context.",
    details:
      "The memory system stores daily notes, state files, and reference data. It uses 768-dimensional vector embeddings (Google gemini-embedding-001) for semantic search across all stored knowledge. Memory is automatically indexed and searchable by agents.",
    tips: [
      "Daily notes are auto-generated and stored in memory/",
      "State files track runtime data like sync cursors and progress",
      "Reference data includes static datasets for recycling, competitors, etc.",
      "Agents can read and write memory during conversations",
      "Use semantic search to find relevant memories by topic, not just keywords",
    ],
  },
  cron: {
    title: "Cron Jobs",
    summary:
      "Scheduled automations that run on a timer — contact syncs, daily briefings, health checks, and more.",
    details:
      "All cron jobs are managed through the OpenClaw cron system and logged to a central SQLite database. Each run generates a Telegram notification. Failed jobs are retried automatically. You can enable, disable, and reconfigure schedules here.",
    tips: [
      "All cron runs are logged with timestamps, duration, and exit codes",
      "Failed crons send Telegram alerts with error details",
      "Use 'Run Now' to test a cron job manually",
      "The daily CRM sync runs at 2am PST by default",
      "Weekly summaries are generated every Monday morning",
    ],
  },
  integrations: {
    title: "Integrations",
    summary:
      "Connect to Telegram, Slack, Gmail, Calendar, Box, Todoist, Fathom, and more.",
    details:
      "Integrations connect TribeCode to external services. Telegram is the primary notification channel. Slack provides workspace chat. Gmail and Calendar power the CRM. Box enables document search. Todoist receives action items from meetings. Fathom processes meeting recordings.",
    tips: [
      "Telegram is used for DM interactions and group notifications",
      "Slack uses Socket Mode — no public URLs needed",
      "Gmail requires the gog CLI for secure OAuth access",
      "Box integration indexes documents with vector embeddings for search",
      "Fathom meeting recordings are automatically processed into CRM entries",
    ],
  },
  subagents: {
    title: "Subagents (Antfarm)",
    summary:
      "Multi-agent workflows powered by Antfarm — a team of specialized AI agents that work together.",
    details:
      "Antfarm provides a team of specialized agents: planner, developer, verifier, tester, and reviewer. They execute deterministic, repeatable workflows using YAML + SQLite + cron. Drop in a feature request and get back a tested PR. Each agent runs in a fresh session with clean context.",
    tips: [
      "Workflows follow: plan → setup → implement → verify → test → PR → review",
      "Agents poll for work independently and claim steps",
      "SQLite tracks all state — no external infrastructure needed",
      "Failures retry automatically — nothing ships without code review",
      "Use the Security Audit workflow to scan repos for vulnerabilities",
      "Monitor real-time step progress in the workflow runner",
    ],
  },
  settings: {
    title: "Settings & Configuration",
    summary:
      "Configure model providers, gateway settings, environment variables, and platform defaults.",
    details:
      "Settings control the core platform: model provider API keys, fallback chains, agent concurrency limits, channel configurations, and environment variables. Changes take effect after gateway restart.",
    tips: [
      "Model fallback: Opus → Sonnet → Gemini Pro → Gemini Flash → Haiku",
      "Max 4 concurrent agents, 8 concurrent subagents by default",
      "Gateway runs on port 18789 (loopback only)",
      "Use 'openclaw doctor' to diagnose configuration issues",
      "Environment variables are loaded from ~/.openclaw/.env",
    ],
  },
};
