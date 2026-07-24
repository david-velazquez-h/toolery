export type TimestampResult =
  | { success: true; data: ConvertedTimestamp }
  | { success: false; error: string };

export interface ConvertedTimestamp {
  /** Unix timestamp in seconds */
  unixSeconds: number;
  /** Unix timestamp in milliseconds */
  unixMilliseconds: number;
  /** ISO 8601 string, always UTC */
  iso: string;
  /** Human-readable string in the user's local timezone */
  local: string;
  /** Human-readable string in UTC */
  utc: string;
}

/**
 * Converts a Unix timestamp (seconds or milliseconds — auto-detected)
 * into every representation the UI needs.
 */
export function fromUnixTimestamp(rawInput: string): TimestampResult {
  const trimmed = rawInput.trim();
  if (trimmed === "") {
    return { success: false, error: "Input is empty." };
  }

  const numeric = Number(trimmed);
  if (Number.isNaN(numeric)) {
    return { success: false, error: "Not a valid number." };
  }

  // Heuristic: timestamps in milliseconds have 13 digits, seconds have 10,
  // for dates roughly between 2001 and 2286. This covers virtually every
  // real-world timestamp a developer would paste here.
  const isMilliseconds = trimmed.length >= 13;
  const milliseconds = isMilliseconds ? numeric : numeric * 1000;

  const date = new Date(milliseconds);
  if (Number.isNaN(date.getTime())) {
    return { success: false, error: "This number does not map to a valid date." };
  }

  return { success: true, data: buildResult(date) };
}

/**
 * Converts a human-entered date/time string (e.g. from a <input type="datetime-local">)
 * into every representation the UI needs.
 */
export function fromDateString(dateString: string): TimestampResult {
  if (dateString.trim() === "") {
    return { success: false, error: "Input is empty." };
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return { success: false, error: "Not a valid date." };
  }

  return { success: true, data: buildResult(date) };
}

function buildResult(date: Date): ConvertedTimestamp {
  return {
    unixSeconds: Math.floor(date.getTime() / 1000),
    unixMilliseconds: date.getTime(),
    iso: date.toISOString(),
    local: date.toLocaleString(undefined, { dateStyle: "full", timeStyle: "long" }),
    utc: date.toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "UTC",
    }),
  };
}

/** Convenience helper: current timestamp, used for the "Now" button. */
export function getCurrentTimestamp(): ConvertedTimestamp {
  return buildResult(new Date());
}