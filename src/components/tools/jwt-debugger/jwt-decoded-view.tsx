"use client";

import { Badge } from "@/components/ui/badge";
import type { JwtDecodeResult } from "@/lib/tools/jwt-debugger";

interface JwtDecodedViewProps {
  result: JwtDecodeResult | null;
}

export function JwtDecodedView({ result }: JwtDecodedViewProps) {
  if (result === null) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
        Decoded header and payload will appear here.
      </div>
    );
  }

  if (!result.success) {
    return (
      <div className="min-h-[200px] rounded-md border bg-muted/30 p-4 text-sm text-destructive">
        {result.error}
      </div>
    );
  }

  const { header, payload, isExpired, expiresAt } = result.data;

  return (
    <div className="flex flex-col gap-4">
      <JsonPanel title="Header" data={header} />
      <JsonPanel
        title="Payload"
        data={payload}
        badge={
          expiresAt ? (
            <Badge variant={isExpired ? "destructive" : "secondary"}>
              {isExpired ? "Expired" : "Valid"} · {expiresAt}
            </Badge>
          ) : null
        }
      />
    </div>
  );
}

function JsonPanel({
  title,
  data,
  badge,
}: {
  title: string;
  data: unknown;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {badge}
      </div>
      <pre className="rounded-md border bg-muted/30 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap break-all">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}