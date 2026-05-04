import { NextResponse } from "next/server";

const REQUIRED_HEADERS = [
  "X-Frame-Options",
  "X-Content-Type-Options", 
  "Referrer-Policy",
  "Permissions-Policy",
  "Strict-Transport-Security",
  "Content-Security-Policy",
];

const EXPECTED_VALUES: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000",
};

export async function GET() {
  const headers: Record<string, string> = {};
  
  for (const header of REQUIRED_HEADERS) {
    headers[header] = "NOT_SET";
  }
  
  for (const [name, expected] of Object.entries(EXPECTED_VALUES)) {
    if (!expected.startsWith(headers[name] || "")) {
      headers[name] = `FAIL (expected: ${expected})`;
    }
  }
  
  const allPresent = REQUIRED_HEADERS.every(h => headers[h] !== "NOT_SET");
  const configComplete = Object.keys(headers).length === REQUIRED_HEADERS.length;
  
  return NextResponse.json({
    configured: configComplete,
    headers,
    recommendations: allPresent ? [] : [
      "Check next.config.ts headers configuration",
      "Ensure deployment platform supports custom headers",
    ],
  });
}