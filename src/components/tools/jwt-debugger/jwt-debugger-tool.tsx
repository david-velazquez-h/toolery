"use client";

import { useMemo, useState } from "react";
import { decodeJwt } from "@/lib/tools/jwt-debugger";
import { JwtInput } from "./jwt-input";
import { JwtDecodedView } from "./jwt-decoded-view";

export function JwtDebuggerTool() {
  const [token, setToken] = useState("");

  const result = useMemo(() => {
    if (token.trim() === "") return null;
    return decodeJwt(token);
  }, [token]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <JwtInput value={token} onChange={setToken} />
      <JwtDecodedView result={result} />
    </div>
  );
}