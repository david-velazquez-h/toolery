import type { Metadata } from "next";
import { UuidGeneratorTool } from "@/components/tools/uuid-generator/uuid-generator-tool";

export const metadata: Metadata = {
  title: "UUID Generator — Toolery",
  description: "Generate RFC 4122 v4 UUIDs in bulk, right in your browser.",
};

export default function UuidGeneratorPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">UUID Generator</h1>
      <p className="mt-1 text-muted-foreground">
        Generate v4 UUIDs in bulk. Nothing leaves your browser.
      </p>

      <div className="mt-8">
        <UuidGeneratorTool />
      </div>
    </main>
  );
}