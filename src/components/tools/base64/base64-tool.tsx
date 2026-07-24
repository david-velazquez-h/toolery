"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { encodeBase64, decodeBase64 } from "@/lib/tools/base64";

export function Base64Tool() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleTextChange(value: string) {
    setText(value);
    setError(null);

    if (value === "") {
      setBase64("");
      return;
    }

    const result = encodeBase64(value);
    if (result.success) {
      setBase64(result.output);
    }
  }

  function handleBase64Change(value: string) {
    setBase64(value);
    setError(null);

    if (value.trim() === "") {
      setText("");
      return;
    }

    const result = decodeBase64(value);
    if (result.success) {
      setText(result.output);
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="text-input" className="text-sm font-medium text-muted-foreground">
            Text
          </label>
          <Textarea
            id="text-input"
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Type or paste plain text..."
            className="min-h-[280px] font-mono text-sm resize-none"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="base64-input" className="text-sm font-medium text-muted-foreground">
            Base64
          </label>
          <Textarea
            id="base64-input"
            value={base64}
            onChange={(e) => handleBase64Change(e.target.value)}
            placeholder="Type or paste Base64..."
            className="min-h-[280px] font-mono text-sm resize-none"
            spellCheck={false}
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}