import { NextResponse } from "next/server";

interface SecurityHeaders {
  "csp-report": {
    "blocked-uri": string;
    "disposition": string;
    "document-uri": string;
    "effective-directive": string;
    "original-policy": string;
    "referrer": string;
    "violated-directive": string;
  };
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || "unknown";
  
  try {
    const report: SecurityHeaders = await request.json();
    const { "csp-report": csp } = report;
    
    console.error(`[CSP VIOLATION] ` +
      `Violated: ${csp["violated-directive"]}, ` +
      `Blocked: ${csp["blocked-uri"]}, ` +
      `Page: ${csp["document-uri"]}, ` +
      `IP: ${clientIp}`);
    
    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[CSP ERROR] ${message} from ${clientIp}`);
    return NextResponse.json(
      { error: "Invalid CSP report" },
      { status: 400 }
    );
  }
}