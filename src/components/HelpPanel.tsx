"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Lightbulb, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { helpContent } from "@/data/help-content";

interface HelpPanelProps {
  section: string;
  className?: string;
}

export function HelpPanel({ section, className }: HelpPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const content = helpContent[section];

  if (!content || isDismissed) return null;

  return (
    <div className={cn("mb-6", className)}>
      {/* Collapsed state - summary bar */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-3 bg-brand-50 border border-brand-200 rounded-xl hover:bg-brand-100 transition-smooth group"
        >
          <HelpCircle className="w-4 h-4 text-brand-500 flex-shrink-0" />
          <span className="text-sm text-brand-700 font-medium">{content.summary}</span>
          <ChevronDown className="w-4 h-4 text-brand-400 ml-auto flex-shrink-0 group-hover:text-brand-600" />
        </button>
      )}

      {/* Expanded state - full help panel */}
      {isOpen && (
        <div className="bg-brand-50 border border-brand-200 rounded-xl overflow-hidden help-panel-enter">
          <div className="px-5 py-4 border-b border-brand-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-500" />
              <h3 className="text-sm font-semibold text-brand-800">
                About {content.title}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-brand-400 hover:text-brand-600 rounded"
                title="Collapse"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsDismissed(true)}
                className="p-1 text-brand-400 hover:text-brand-600 rounded"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-5 py-4 space-y-4">
            <p className="text-sm text-surface-600 leading-relaxed">
              {content.details}
            </p>

            {/* Tips */}
            <div className="bg-white rounded-lg border border-brand-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-3.5 h-3.5 text-accent-500" />
                <span className="text-xs font-semibold text-surface-700 uppercase tracking-wide">
                  Quick Tips
                </span>
              </div>
              <ul className="space-y-2">
                {content.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-surface-600">
                    <span className="text-brand-400 mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Inline help tooltip for individual controls */
export function HelpTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="p-0.5 text-surface-400 hover:text-brand-500 transition-smooth"
        type="button"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-surface-800 text-white text-xs rounded-lg shadow-lg max-w-[240px] z-50 pointer-events-none help-panel-enter">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-800 rotate-45 -mt-1" />
        </div>
      )}
    </span>
  );
}
