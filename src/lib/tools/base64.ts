export type Base64Result =
  | { success: true; output: string }
  | { success: false; error: string };

/**
 * Encodes a UTF-8 string to Base64.
 * Uses TextEncoder + a byte-by-byte conversion instead of raw btoa(input),
 * because btoa() only supports Latin1 and throws on multi-byte characters
 * like emojis or accented letters (e.g. "café", "🚀").
 */
export function encodeBase64(input: string): Base64Result {
  if (input === "") {
    return { success: false, error: "Input is empty." };
  }

  try {
    const bytes = new TextEncoder().encode(input);
    const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
    return { success: true, output: btoa(binary) };
  } catch {
    return { success: false, error: "Could not encode this input." };
  }
}

/**
 * Decodes a Base64 string back to UTF-8 text.
 * Mirrors encodeBase64: decodes bytes first, then interprets them as UTF-8,
 * so multi-byte characters round-trip correctly.
 */
export function decodeBase64(input: string): Base64Result {
  const trimmed = input.trim();

  if (trimmed === "") {
    return { success: false, error: "Input is empty." };
  }

  try {
    const binary = atob(trimmed);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return { success: true, output: new TextDecoder().decode(bytes) };
  } catch {
    return {
      success: false,
      error: "Invalid Base64: the input contains characters outside the Base64 alphabet.",
    };
  }
}