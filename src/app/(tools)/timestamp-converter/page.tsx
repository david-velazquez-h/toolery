import type { Metadata } from "next";
import { TimestampConverterTool } from "@/components/tools/timestamp-converter/timestamp-converter-tool";

export const metadata: Metadata = {
  title: "Timestamp Converter — Toolery",
  description: "Convert between Unix timestamps and human-readable dates, in any timezone.",
};

export default function TimestampConverterPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Timestamp Converter</h1>
      <p className="mt-1 text-muted-foreground">
        Convert between Unix timestamps and human-readable dates.
      </p>

      <div className="mt-8">
        <TimestampConverterTool />
      </div>
    </main>
  );
}