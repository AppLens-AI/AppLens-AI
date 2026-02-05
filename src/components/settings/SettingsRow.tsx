import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

interface SettingsRowProps {
  label: string;
  description?: string;
  children: ReactNode;
  isPro?: boolean;
  className?: string;
}

export function SettingsRow({ label, description, children, isPro, className }: SettingsRowProps) {
  return (
    <div className={cn("flex items-center justify-between py-4 border-b border-border last:border-0", className)}>
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {isPro && (
            <span className="pro-badge">
              <Crown className="h-3 w-3" />
              Pro
            </span>
          )}
        </div>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
