/**
 * Result of a JSON formatting/validation attempt.
 * Modeled as a discriminated union so consumers are forced to handle
 * both the success and error case explicitly — no throwing, no try/catch
 * leaking into the UI layer.
 */
export type JsonFormatResult =
  | { success: true; output: string }
  | { success: false; error: string };

/**
 * Formats a raw JSON string with the given indentation.
 * Returns a result object instead of throwing, so calling code
 * (React components) can render either state without try/catch.
 */
export function formatJson(
  input: string,
  indentSize: number = 2
): JsonFormatResult {
  if (input.trim() === "") {
    return { success: false, error: "Input is empty." };
  }

  try {
    const parsed: unknown = JSON.parse(input);
    const output = JSON.stringify(parsed, null, indentSize);
    return { success: true, output };
  } catch (err) {
    return { success: false, error: toReadableError(err) };
  }
}

/**
 * Minifies a JSON string by removing all unnecessary whitespace.
 */
export function minifyJson(input: string): JsonFormatResult {
  if (input.trim() === "") {
    return { success: false, error: "Input is empty." };
  }

  try {
    const parsed: unknown = JSON.parse(input);
    const output = JSON.stringify(parsed);
    return { success: true, output };
  } catch (err) {
    return { success: false, error: toReadableError(err) };
  }
}

/**
 * Converts a native JSON.parse SyntaxError into a message
 * that's actually useful to someone debugging their JSON.
 */
function toReadableError(err: unknown): string {
  if (err instanceof SyntaxError) {
    return `Invalid JSON: ${err.message}`;
  }
  return "Invalid JSON: unknown parsing error.";
}