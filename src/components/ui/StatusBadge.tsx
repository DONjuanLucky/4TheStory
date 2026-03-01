import { cn } from "@/lib/utils";

type StatusType = "active" | "inactive" | "warning" | "error" | "pending" | "success";

const statusStyles: Record<StatusType, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-surface-100 text-surface-500 border-surface-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  error: "bg-red-50 text-red-700 border-red-200",
  pending: "bg-blue-50 text-blue-700 border-blue-200",
};

const dotStyles: Record<StatusType, string> = {
  active: "bg-emerald-500",
  success: "bg-emerald-500",
  inactive: "bg-surface-400",
  warning: "bg-amber-500",
  error: "bg-red-500",
  pending: "bg-blue-500",
};

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({ status, label, className, showDot = true }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        statusStyles[status],
        className
      )}
    >
      {showDot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", dotStyles[status])} />
      )}
      {label}
    </span>
  );
}
