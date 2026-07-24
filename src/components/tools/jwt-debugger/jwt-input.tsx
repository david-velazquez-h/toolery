"use client";

import { Textarea } from "@/components/ui/textarea";

interface JwtInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function JwtInput({ value, onChange }: JwtInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="jwt-input" className="text-sm font-medium text-muted-foreground">
        Encoded Token
      </label>
      <Textarea
        id="jwt-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your JWT here, e.g. eyJhbGciOiJIUzI1NiIs..."
        className="min-h-[200px] font-mono text-sm resize-none break-all"
        spellCheck={false}
      />
      <p className="text-xs text-muted-foreground">
        This only decodes the token locally — the signature is not verified,
        and nothing is sent to a server.
      </p>
    </div>
  );
}