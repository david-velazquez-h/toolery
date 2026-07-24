import { tools } from "@/config/tools.config";
import { ToolCard } from "@/components/tools/tool-card";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Toolery</h1>
        <p className="mt-3 text-muted-foreground">
          Fast, focused tools for everyday developer tasks. Everything runs
          in your browser — nothing you paste here ever leaves your machine.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </main>
  );
}