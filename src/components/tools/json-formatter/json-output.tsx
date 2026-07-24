"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { JsonFormatResult } from "@/lib/tools/json-formatter";

interface JsonOutputProps {
  result: JsonFormatResult | null;
}

export function JsonOutput({ result }: JsonOutputProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!result?.success) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">Output</label>
        {result?.success && (
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </Button>
        )}
      </div>

      <div className="min-h-[320px] rounded-md border bg-muted/30 p-4 font-mono text-sm overflow-auto">
        {result === null && (
          <span className="text-muted-foreground">Formatted output will appear here.</span>
        )}
        {result?.success === false && (
          <span className="text-destructive">{result.error}</span>
        )}
        {result?.success === true && (
          <pre className="whitespace-pre-wrap break-all">{result.output}</pre>
        )}
      </div>
    </div>
  );
}