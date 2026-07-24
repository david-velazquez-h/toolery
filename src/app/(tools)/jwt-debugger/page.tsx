import type { Metadata } from "next";
import { JwtDebuggerTool } from "@/components/tools/jwt-debugger/jwt-debugger-tool";

export const metadata: Metadata = {
  title: "JWT Debugger — Toolery",
  description: "Decode and inspect JWT tokens, right in your browser.",
};

export default function JwtDebuggerPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">JWT Debugger</h1>
      <p className="mt-1 text-muted-foreground">
        Decode a JWT&apos;s header and payload. Nothing leaves your browser.
      </p>

      <div className="mt-8">
        <JwtDebuggerTool />
      </div>
    </main>
  );
}