/**
 * The three decoded parts of a JWT.
 * We don't verify the signature here — that requires the signing secret,
 * which the user (rightfully) should never paste into a public tool.
 * This is a *decoder*, not a *verifier*.
 */
export interface DecodedJwt {
  header: unknown;
  payload: unknown;
  signature: string;
  /** True if payload has an "exp" claim and it's in the past */
  isExpired: boolean;
  /** Human-readable expiration date, if "exp" claim exists */
  expiresAt: string | null;
}

export type JwtDecodeResult =
  | { success: true; data: DecodedJwt }
  | { success: false; error: string };

export function decodeJwt(token: string): JwtDecodeResult {
  const trimmed = token.trim();

  if (trimmed === "") {
    return { success: false, error: "Input is empty." };
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return {
      success: false,
      error: `Invalid JWT: expected 3 parts separated by dots, got ${parts.length}.`,
    };
  }

  const [headerPart, payloadPart, signaturePart] = parts;

  const header = decodeBase64UrlJson(headerPart);
  if (!header.success) {
    return { success: false, error: `Invalid header: ${header.error}` };
  }

  const payload = decodeBase64UrlJson(payloadPart);
  if (!payload.success) {
    return { success: false, error: `Invalid payload: ${payload.error}` };
  }

  const { isExpired, expiresAt } = getExpiration(payload.data);

  return {
    success: true,
    data: {
      header: header.data,
      payload: payload.data,
      signature: signaturePart,
      isExpired,
      expiresAt,
    },
  };
}

/**
 * Decodes a single base64url-encoded JWT segment into parsed JSON.
 * JWTs use base64URL (RFC 4648 §5), which differs from standard base64:
 * '+' becomes '-', '/' becomes '_', and padding '=' is omitted.
 */
function decodeBase64UrlJson(
  segment: string
): { success: true; data: unknown } | { success: false; error: string } {
  try {
    const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    const decoded = atob(padded);
    const json: unknown = JSON.parse(decoded);
    return { success: true, data: json };
  } catch {
    return { success: false, error: "could not decode or parse as JSON." };
  }
}

/**
 * Reads the standard "exp" claim (Unix seconds) if present and
 * derives whether the token is expired, without throwing if it's missing
 * or malformed — expiration is optional per the JWT spec.
 */
function getExpiration(payload: unknown): {
  isExpired: boolean;
  expiresAt: string | null;
} {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "exp" in payload &&
    typeof (payload as Record<string, unknown>).exp === "number"
  ) {
    const expSeconds = (payload as Record<string, number>).exp;
    const expDate = new Date(expSeconds * 1000);
    return {
      isExpired: expDate.getTime() < Date.now(),
      expiresAt: expDate.toISOString(),
    };
  }

  return { isExpired: false, expiresAt: null };
}