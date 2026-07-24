import type { Metadata } from "next";
import { JsonFormatterTool } from "@/components/tools/json-formatter/json-formatter-tool";

export const metadata: Metadata = {
  title: "JSON Formatter — Toolery",
  description: "Format, validate and minify JSON instantly, right in your browser.",
};

export default function JsonFormatterPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">JSON Formatter</h1>
      <p className="mt-1 text-muted-foreground">
        Format, validate and minify JSON instantly. Nothing leaves your browser.
      </p>

      <div className="mt-8">
        <JsonFormatterTool />
      </div>
    </main>
  );
}