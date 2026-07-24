import Link from "next/link";
import { Braces, KeyRound, Fingerprint, Binary, Clock, type LucideIcon } from "lucide-react";
import type { Tool } from "@/types/tool";

/**
 * Maps the icon name stored in tools.config.ts to the actual Lucide component.
 * We store icons as strings in the config (not JSX) so that config file
 * stays plain data — no React imports needed there.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  Braces,
  KeyRound,
  Fingerprint,
  Binary,
  Clock,
};

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = ICON_MAP[tool.icon];
  const isComingSoon = tool.status === "coming-soon";

  const cardContent = (
    <div className="group relative flex flex-col gap-3 rounded-lg border bg-card p-5 transition-colors hover:border-foreground/20">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
          {Icon && <Icon className="h-4 w-4" />}
        </div>
        {isComingSoon && (
          <span className="text-xs text-muted-foreground">Coming soon</span>
        )}
      </div>
      <div>
        <h3 className="font-medium">{tool.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
      </div>
    </div>
  );

  if (isComingSoon) {
    return <div className="opacity-60 cursor-not-allowed">{cardContent}</div>;
  }

  return (
    <Link href={`/${tool.slug}`} className="block">
      {cardContent}
    </Link>
  );
}