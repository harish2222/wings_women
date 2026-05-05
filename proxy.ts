import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 100;

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

setInterval(cleanupRateLimitStore, 5 * 60 * 1000);

function getRateLimitKey(request: NextRequest): string {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
    || request.headers.get("x-real-ip") 
    || "unknown";
  return `rate:${ip}`;
}

function checkRateLimit(request: NextRequest): boolean {
  const key = getRateLimitKey(request);
  const now = Date.now();
  
  const entry = rateLimitStore.get(key);
  
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  entry.count++;
  return true;
}

function detectMaliciousInput(input: string): string | null {
  const patterns: Record<string, RegExp> = {
    sql: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b|--|\/\*|\*\/|';|'--|";|"--)/i,
    xss: /<script[^>]*>|javascript:|on\w+\s*=|<iframe|<object|<embed|eval\(|innerHTML|document\./i,
    command: /(;|\||`|\$\(|&&|\|\|)/,
    template: /\{\{.*\}\}|<%.*%>|\$\{.*\}/,
  };
  
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(input)) {
      return type;
    }
  }
  
  return null;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-()]{10,15}$/;
  return phoneRegex.test(phone);
}

export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function isValidDoctorId(id: string): boolean {
  return /^doc-\d+$/.test(id);
}

export function isValidServiceSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug) && slug.length <= 100;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith("/api/")) {
    if (!checkRateLimit(request)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }
    
    if (request.method === "POST" || request.method === "PUT" || request.method === "PATCH") {
      try {
        const contentType = request.headers.get("content-type");
        if (contentType && !contentType.includes("application/json")) {
          return NextResponse.json(
            { error: "Unsupported Media Type. JSON required." },
            { status: 415 }
          );
        }
        
        const contentLength = request.headers.get("content-length");
        if (contentLength && parseInt(contentLength, 10) > 1_000_000) {
          return NextResponse.json(
            { error: "Payload too large. Maximum 1MB allowed." },
            { status: 413 }
          );
        }
        
        if (request.method === "POST") {
          const body = await request.clone().text();
          if (body) {
            const malicious = detectMaliciousInput(body);
            if (malicious) {
              console.warn(`[SECURITY] Malicious input detected: ${malicious} from ${request.headers.get("x-forwarded-for")}`);
              return NextResponse.json(
                { error: "Invalid input detected." },
                { status: 400 }
              );
            }
          }
        }
      } catch {
        return NextResponse.json(
          { error: "Invalid request body." },
          { status: 400 }
        );
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
  ],
};