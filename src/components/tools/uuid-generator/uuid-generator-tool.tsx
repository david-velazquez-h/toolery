"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateUuids } from "@/lib/tools/uuid-generator";

export function UuidGeneratorTool() {
  const [quantity, setQuantity] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => generateUuids(5));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function handleGenerate() {
    setUuids(generateUuids(quantity));
  }

  async function handleCopy(uuid: string, index: number) {
    await navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  }

  async function handleCopyAll() {
    await navigator.clipboard.writeText(uuids.join("\n"));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="quantity" className="text-sm font-medium text-muted-foreground">
            Quantity (1–100)
          </label>
          <Input
            id="quantity"
            type="number"
            min={1}
            max={100}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-28"
          />
        </div>
        <Button onClick={handleGenerate}>Generate</Button>
        <Button variant="outline" onClick={handleCopyAll}>
          Copy all
        </Button>
      </div>

      <ul className="flex flex-col divide-y rounded-md border">
        {uuids.map((uuid, index) => (
          <li
            key={`${uuid}-${index}`}
            className="flex items-center justify-between px-4 py-2 font-mono text-sm"
          >
            {uuid}
            <button
              onClick={() => handleCopy(uuid, index)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {copiedIndex === index ? "Copied" : "Copy"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}