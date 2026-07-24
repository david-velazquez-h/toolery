"use client";

import { Textarea } from "@/components/ui/textarea";

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function JsonInput({ value, onChange }: JsonInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="json-input" className="text-sm font-medium text-muted-foreground">
        Input
      </label>
      <Textarea
        id="json-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Paste your JSON here, e.g. {"hello": "world"}'
        className="min-h-[320px] font-mono text-sm resize-none"
        spellCheck={false}
      />
    </div>
  );
}