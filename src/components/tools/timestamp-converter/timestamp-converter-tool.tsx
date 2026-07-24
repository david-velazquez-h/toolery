"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  fromUnixTimestamp,
  fromDateString,
  getCurrentTimestamp,
  type TimestampResult,
} from "@/lib/tools/timestamp-converter";

export function TimestampConverterTool() {
  const [unixInput, setUnixInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [result, setResult] = useState<TimestampResult | null>(null);

  function handleUnixChange(value: string) {
    setUnixInput(value);
    setResult(value.trim() === "" ? null : fromUnixTimestamp(value));
  }

  function handleDateChange(value: string) {
    setDateInput(value);
    setResult(value.trim() === "" ? null : fromDateString(value));
  }

  function handleNow() {
    const current = getCurrentTimestamp();
    setResult({ success: true, data: current });
    setUnixInput(String(current.unixSeconds));
    setDateInput("");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="unix-input" className="text-sm font-medium text-muted-foreground">
            Unix Timestamp
          </label>
          <Input
            id="unix-input"
            value={unixInput}
            onChange={(e) => handleUnixChange(e.target.value)}
            placeholder="1721000000"
            className="w-56 font-mono"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date-input" className="text-sm font-medium text-muted-foreground">
            Date &amp; Time
          </label>
          <Input
            id="date-input"
            type="datetime-local"
            value={dateInput}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-56"
          />
        </div>

        <Button variant="outline" onClick={handleNow}>
          Now
        </Button>
      </div>

      {result?.success === false && (
        <p className="text-sm text-destructive">{result.error}</p>
      )}

      {result?.success === true && (
        <dl className="grid gap-3 rounded-md border p-4 sm:grid-cols-2">
          <ResultRow label="Unix (seconds)" value={String(result.data.unixSeconds)} />
          <ResultRow label="Unix (milliseconds)" value={String(result.data.unixMilliseconds)} />
          <ResultRow label="ISO 8601" value={result.data.iso} />
          <ResultRow label="Local time" value={result.data.local} />
          <ResultRow label="UTC" value={result.data.utc} />
        </dl>
      )}
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-mono text-sm break-all">{value}</dd>
    </div>
  );
}