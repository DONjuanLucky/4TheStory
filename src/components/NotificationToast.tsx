"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Info, X, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "agent";
  title: string;
  message: string;
  timestamp: number;
}

const icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  agent: Bot,
};

const styles = {
  success: "border-emerald-200 bg-emerald-50",
  warning: "border-amber-200 bg-amber-50",
  info: "border-blue-200 bg-blue-50",
  agent: "border-brand-200 bg-brand-50",
};

const iconStyles = {
  success: "text-emerald-500",
  warning: "text-amber-500",
  info: "text-blue-500",
  agent: "text-brand-500",
};

// Demo notifications that appear on load
const demoNotifications: Omit<Notification, "id" | "timestamp">[] = [
  { type: "agent", title: "Antfarm", message: "Workflow 'feature-request' verify step completed" },
  { type: "success", title: "CRM Sync", message: "Daily sync finished — 12 contacts updated" },
];

export function NotificationToast() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Show demo notifications after a delay
    const timers = demoNotifications.map((notif, i) =>
      setTimeout(() => {
        setNotifications((prev) => [
          ...prev,
          { ...notif, id: `demo-${i}`, timestamp: Date.now() },
        ]);
      }, 3000 + i * 4000)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-dismiss after 6 seconds
  useEffect(() => {
    if (notifications.length === 0) return;
    const timer = setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 6000);
    return () => clearTimeout(timer);
  }, [notifications]);

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[90] space-y-2 w-80">
      {notifications.map((notif) => {
        const Icon = icons[notif.type];
        return (
          <div
            key={notif.id}
            className={cn(
              "flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg help-panel-enter",
              styles[notif.type]
            )}
          >
            <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", iconStyles[notif.type])} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-surface-800">{notif.title}</div>
              <div className="text-xs text-surface-600 mt-0.5">{notif.message}</div>
            </div>
            <button
              onClick={() => dismiss(notif.id)}
              className="p-0.5 text-surface-400 hover:text-surface-600 flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
