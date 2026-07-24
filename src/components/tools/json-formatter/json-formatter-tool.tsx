"use client";

import { useMemo, useState } from "react";
import { formatJson } from "@/lib/tools/json-formatter";
import { JsonInput } from "./json-input";
import { JsonOutput } from "./json-output";

export function JsonFormatterTool() {
  const [input, setInput] = useState("");

  // Recompute the result only when the input actually changes.
  const result = useMemo(() => {
    if (input.trim() === "") return null;
    return formatJson(input);
  }, [input]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <JsonInput value={input} onChange={setInput} />
      <JsonOutput result={result} />
    </div>
  );
}