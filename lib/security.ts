export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function sanitizeHtml(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function stripHtmlTags(input: string): string {
  if (typeof input !== "string") return "";
  return input.replace(/<[^>]*>/g, "");
}

export function validateEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  if (typeof phone !== "string") return false;
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^\+?\d{10,15}$/.test(cleaned);
}

export function validateUrl(url: string): boolean {
  if (typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function validateRequired(value: string | null | undefined): boolean {
  if (value === null || value === undefined) return false;
  return typeof value === "string" && value.trim().length > 0;
}

export function validateLength(value: string, min: number, max: number): boolean {
  if (typeof value !== "string") return false;
  const length = value.trim().length;
  return length >= min && length <= max;
}

export function isValidDoctorId(id: string): boolean {
  if (typeof id !== "string") return false;
  return /^doc-\d+$/.test(id);
}

export function isValidServiceSlug(slug: string): boolean {
  if (typeof slug !== "string") return false;
  return /^[a-z0-9-]+$/.test(slug) && slug.length > 0 && slug.length <= 100;
}

export function detectMaliciousInput(input: string): { detected: boolean; type: string | null } {
  if (typeof input !== "string") return { detected: false, type: null };
  
  const patterns: Record<string, RegExp> = {
    sql: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b|--|\/\*|\*\/|';|'--|";|"--)/i,
    xss: /<script[^>]*>|javascript:|on\w+\s*=|<iframe|<object|<embed|eval\(|innerHTML|document\./i,
    command: /(;|\||`|\$\(|&&|\|\|)/,
    template: /\{\{.*\}\}|<%.*%>|\$\{.*\}/,
    pathTraversal: /(\.\.[\\/])/,
  };
  
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(input)) {
      return { detected: true, type };
    }
  }
  
  return { detected: false, type: null };
}

export function normalizePhone(phone: string): string {
  if (typeof phone !== "string") return "";
  return phone.replace(/[\s\-()]/g, "").replace(/^\+/, "");
}

export function normalizeName(name: string): string {
  if (typeof name !== "string") return "";
  return name.trim().replace(/\s+/g, " ");
}

export function truncateText(text: string, maxLength: number): string {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

export function maskSensitiveData<T extends Record<string, unknown>>(data: T): T {
  const sensitiveKeys = new Set([
    "password",
    "token",
    "secret",
    "apikey",
    "authorization",
    "creditcard",
    "ssn",
    "dob",
    "dateOfBirth",
  ]);
  
  const masked = { ...data };
  
  for (const key of Object.keys(masked)) {
    if (sensitiveKeys.has(key.toLowerCase())) {
      (masked as Record<string, unknown>)[key] = "***REDACTED***";
    }
  }
  
  return masked;
}