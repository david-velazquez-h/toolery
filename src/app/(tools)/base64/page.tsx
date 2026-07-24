import type { Metadata } from "next";
import { Base64Tool } from "@/components/tools/base64/base64-tool";

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder — Toolery",
  description: "Encode text to Base64 or decode it back instantly, right in your browser.",
};

export default function Base64Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Base64 Encoder / Decoder</h1>
      <p className="mt-1 text-muted-foreground">
        Type in either field — the other updates instantly. Nothing leaves your browser.
      </p>

      <div className="mt-8">
        <Base64Tool />
      </div>
    </main>
  );
}